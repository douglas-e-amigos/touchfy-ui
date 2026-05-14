import { cookies } from "next/headers";

export async function getAccessTokenServer() {
  const cookieStore = await cookies();

  return cookieStore.get("access_token")?.value;
}
