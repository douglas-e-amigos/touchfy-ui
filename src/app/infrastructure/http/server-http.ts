import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { cookies } from "next/headers";
import { RefreshTokenRequest, TokenResponse } from "../../features/usuario/models/dto.model";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:8080";
const shouldUseSecureCookies = process.env.NODE_ENV === "production";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

interface AuthState {
  accessToken?: string;
  refreshToken?: string;
}

function getAuthState(cookieStore: CookieStore): AuthState {
  return {
    accessToken: cookieStore.get("access_token")?.value,
    refreshToken: cookieStore.get("refresh_token")?.value,
  };
}

function logAuthState(config: AxiosRequestConfig, authState: AuthState) {
  console.info("serverApiRequest auth state", {
    method: config.method,
    url: config.url,
    hasAccessToken: Boolean(authState.accessToken),
    hasRefreshToken: Boolean(authState.refreshToken),
  });
}

function setAuthCookies(
  cookieStore: CookieStore,
  accessToken: string,
  refreshToken: string,
) {
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: shouldUseSecureCookies,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 5,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: shouldUseSecureCookies,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

function clearAuthCookies(cookieStore: CookieStore) {
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

function buildRequestConfig(
  config: AxiosRequestConfig,
  accessToken?: string,
): AxiosRequestConfig {
  return {
    ...config,
    baseURL: API_URL,
    headers: {
      ...config.headers,
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  };
}

async function refreshTokens(refreshToken: string): Promise<TokenResponse> {
  const refreshResponse = await axios.post<
    TokenResponse,
    AxiosResponse<TokenResponse>,
    RefreshTokenRequest
  >(`${API_URL}/usuarios/auth/refresh`, { refreshToken });

  return refreshResponse.data;
}

async function tryPreflightRefresh(
  cookieStore: CookieStore,
  config: AxiosRequestConfig,
  authState: AuthState,
): Promise<string | undefined> {
  if (authState.accessToken || !authState.refreshToken) {
    return authState.accessToken;
  }

  try {
    console.info("serverApiRequest attempting preflight token refresh", {
      method: config.method,
      url: config.url,
    });

    const refreshedTokens = await refreshTokens(authState.refreshToken);
    setAuthCookies(
      cookieStore,
      refreshedTokens.accessToken,
      refreshedTokens.refreshToken,
    );

    return refreshedTokens.accessToken;
  } catch {
    console.warn("serverApiRequest preflight refresh failed", {
      method: config.method,
      url: config.url,
    });

    clearAuthCookies(cookieStore);
    return undefined;
  }
}

async function retryAfterUnauthorized<T>(
  cookieStore: CookieStore,
  config: AxiosRequestConfig,
  refreshToken: string,
): Promise<AxiosResponse<T>> {
  console.info("serverApiRequest attempting token refresh", {
    method: config.method,
    url: config.url,
  });

  const refreshedTokens = await refreshTokens(refreshToken);
  setAuthCookies(
    cookieStore,
    refreshedTokens.accessToken,
    refreshedTokens.refreshToken,
  );

  return axios(buildRequestConfig(config, refreshedTokens.accessToken));
}

/**
 * Realiza uma requisição para a API do backend, automaticamente lidando com tokens de acesso e refresh.
 * 
 * @example serverApiRequest({ method: "POST", url: "/usuarios", data: { nome: "João", ... } })
 */
export async function serverApiRequest<T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  const cookieStore = await cookies();

  const authState = getAuthState(cookieStore);
  logAuthState(config, authState);

  const accessToken = await tryPreflightRefresh(cookieStore, config, authState);

  try {
    return await axios(buildRequestConfig(config, accessToken));
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status !== 401) {
      throw error;
    }

    if (!authState.refreshToken) {
      console.warn("serverApiRequest missing refresh token after 401", {
        method: config.method,
        url: config.url,
      });
      throw error;
    }

    try {
      return await retryAfterUnauthorized<T>(
        cookieStore,
        config,
        authState.refreshToken,
      );
    } catch {
      console.warn("serverApiRequest refresh failed; clearing auth cookies", {
        method: config.method,
        url: config.url,
      });

      clearAuthCookies(cookieStore);

      throw error;
    }
  }
}
