export function getAccessToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
}

export function setAccessToken(token: string) {
  document.cookie = `access_token=${token}; path=/`;
}

export function removeAccessToken() {
  document.cookie = "access_token=; Max-Age=0; path=/";
}
