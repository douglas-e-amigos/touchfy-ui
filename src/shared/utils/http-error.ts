import axios from "axios";

export function getHttpErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === "string" && responseData.trim().length > 0) {
      return responseData;
    }

    if (responseData && typeof responseData === "object") {
      const maybeError = Reflect.get(responseData, "error");
      const maybeMessage = Reflect.get(responseData, "message");

      if (typeof maybeError === "string" && maybeError.trim().length > 0) {
        return maybeError;
      }

      if (typeof maybeMessage === "string" && maybeMessage.trim().length > 0) {
        return maybeMessage;
      }
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
}