// src/services/authService.ts
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  signInWithRedirect,
  getCurrentUser,
} from 'aws-amplify/auth';

export async function signupEmailPassword(params: {
  email: string;
  password: string;
  given_name?: string;
  family_name?: string;
  phone_number?: string; // E.164 format if you use it later: +573001234567
}) {
  return signUp({
    username: params.email,
    password: params.password,
    options: {
      userAttributes: {
        email: params.email,
        ...(params.given_name ? { given_name: params.given_name } : {}),
        ...(params.family_name ? { family_name: params.family_name } : {}),
        ...(params.phone_number ? { phone_number: params.phone_number } : {}),
      },
      autoSignIn: false,
    },
  });
}

export async function confirmSignupEmail(email: string, code: string) {
  return confirmSignUp({ username: email, confirmationCode: code });
}

export async function signinEmailPassword(email: string, password: string) {
  return signIn({ username: email, password });
}

export async function signinWithGoogle() {
  // requires Google provider configured in Cognito Hosted UI
  return signInWithRedirect({ provider: 'Google' });
}

export async function logout() {
  return signOut();
}

export async function currentUser() {
  try {
    return await getCurrentUser();
  } catch {
    return null;
  }
}
