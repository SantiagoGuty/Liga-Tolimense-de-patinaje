// src/amplifyClient.ts
import { Amplify } from 'aws-amplify';

// Read from Vite env vars. You’ll define these in .env locally and in Amplify console.
const region = import.meta.env.VITE_AWS_REGION!;
const userPoolId = import.meta.env.VITE_USER_POOL_ID!;
const userPoolClientId = import.meta.env.VITE_USER_POOL_CLIENT_ID!;
const identityPoolId = import.meta.env.VITE_IDENTITY_POOL_ID; // needed for S3 etc. (optional if you never use it)

const domain = import.meta.env.VITE_COGNITO_DOMAIN!; // e.g. tolipatin.auth.us-east-1.amazoncognito.com

// Comma-separated lists are convenient for local + prod:
const redirectSignIn = (import.meta.env.VITE_REDIRECT_SIGN_IN ?? 'http://localhost:5173/').split(',');
const redirectSignOut = (import.meta.env.VITE_REDIRECT_SIGN_OUT ?? 'http://localhost:5173/').split(',');

Amplify.configure({
  Auth: {
    Cognito: {
      region,
      userPoolId,
      userPoolClientId,
      identityPoolId,
      loginWith: {
        oauth: {
          domain,
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn,   // MUST exactly match what you configured in Cognito
          redirectSignOut,  // MUST exactly match what you configured in Cognito
          responseType: 'code',
        },
      },
    },
  },
  // If you also configure Storage/API, keep those here too.
});
