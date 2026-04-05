// src/services/authService.ts
import {
  signOut,
  signInWithRedirect,
  getCurrentUser,
  fetchAuthSession,
} from 'aws-amplify/auth';

export async function logout() {
  await signOut();
}

export async function signinWithGoogle() {
  // This redirects to your Cognito Hosted UI (with the Google IdP)
  await signInWithRedirect({ provider: 'Google' });
}

// Optional helpers you can call on app mount / after redirect:
export async function ensureSessionLoaded() {
  // Triggers token exchange after Hosted UI returns with ?code=...
  // If already signed in, it resolves quickly.
  try {
    await fetchAuthSession();
  } catch {
    /* ignore */
  }
}

export async function getCurrentAmplifyUser() {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}

// Get ID token claims (name, email, picture, etc.) after Hosted UI redirect
export async function getIdTokenClaims():
  Promise<Record<string, any> | undefined> {
  const s = await fetchAuthSession();
  return s.tokens?.idToken?.payload as any | undefined;
}

// Quick check if someone is signed in
export async function isSignedIn(): Promise<boolean> {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
}

export async function currentUser() {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}

