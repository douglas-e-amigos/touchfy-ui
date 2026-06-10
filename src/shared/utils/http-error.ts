import axios from "axios";

function getNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function getResponseMessage(responseData: unknown): string | null {
  const textResponse = getNonEmptyString(responseData);

  if (textResponse) {
    return textResponse;
  }

  if (!responseData || typeof responseData !== "object") {
    return null;
  }

  return (
    getNonEmptyString(Reflect.get(responseData, "error")) ??
    getNonEmptyString(Reflect.get(responseData, "message"))
  );
}

export function getHttpErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return getResponseMessage(error.response?.data) ?? fallback;
  }

  return getNonEmptyString(error instanceof Error ? error.message : null) ?? fallback;
}

export function getHttpErrorStatus(error: unknown, fallback = 500): number {
  if (axios.isAxiosError(error) && typeof error.response?.status === "number") {
    return error.response.status;
  }

  return fallback;
}

export function getHttpErrorResponseData(error: unknown): unknown {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  }

  return undefined;
}
