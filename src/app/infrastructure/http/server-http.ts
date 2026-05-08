import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { cookies } from "next/headers";

const API_URL = process.env.BACKEND_API_URL || "http://localhost:8080";

export async function serverApiRequest<T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;

  try {
    return await axios({
      ...config,

      baseURL: API_URL,

      headers: {
        ...config.headers,

        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    });
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status !== 401) {
      throw error;
    }

    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      throw error;
    }

    try {
      const refreshResponse = await axios.post(
        `${API_URL}/usuarios/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      const newAccessToken = refreshResponse.data.accessToken;

      cookieStore.set("access_token", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      return axios({
        ...config,
        baseURL: API_URL,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    } catch {
      cookieStore.delete("access_token");
      cookieStore.delete("refresh_token");

      throw error;
    }
  }
}
