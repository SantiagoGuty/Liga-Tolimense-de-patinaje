// src/services/authService.ts
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  signInWithRedirect,
  getCurrentUser,
  fetchAuthSession,
} from 'aws-amplify/auth';

// Email/password
export async function signupEmailPassword(params: {
  email: string;
  password: string;
  given_name?: string;
  family_name?: string;
}) {
  const { email, password, ...attrs } = params;
  return signUp({
    username: email,
    password,
    options: { userAttributes: { email, ...attrs } },
  });
}

export async function confirmSignupEmail(email: string, code: string) {
  return confirmSignUp({ username: email, confirmationCode: code });
}

export async function signinEmailPassword(email: string, password: string) {
  return signIn({ username: email, password });
}

export async function logout() {
  await signOut();
}

// *** GOOGLE SSO ***
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
    const { getCurrentUser } = await import('aws-amplify/auth');
    return await getCurrentUser();
  } catch {
    return null;
  }
}