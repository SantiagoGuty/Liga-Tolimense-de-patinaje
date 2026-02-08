/*roles.ts*/
import { fetchAuthSession } from "aws-amplify/auth";

export async function getGroups(): Promise<string[]> {
  const session = await fetchAuthSession({ forceRefresh: true });
  const payload =
    session.tokens?.accessToken?.payload ??
    session.tokens?.idToken?.payload;

  const groups = (payload?.["cognito:groups"] as string[] | undefined) ?? [];
  return groups;
}

export async function isAdmin(): Promise<boolean> {
  const groups = await getGroups();
  return groups.includes("Admins");
}

export async function isCoach(): Promise<boolean> {
  const groups = await getGroups();
  return groups.includes("Entrenadores") || groups.includes("Admins");
}

