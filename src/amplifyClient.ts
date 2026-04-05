import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// aws-exports.js now contains the full oauth config (domain, redirects, etc.)
// from the last `amplify pull`. Env vars can override for local dev if needed.
const redirectSignIn = import.meta.env.VITE_REDIRECT_SIGN_IN;
const redirectSignOut = import.meta.env.VITE_REDIRECT_SIGN_OUT;

Amplify.configure({
  ...awsExports,
  // Only override redirects when env vars are explicitly set (local dev single-URL fix)
  ...(redirectSignIn
    ? {
        oauth: {
          ...awsExports.oauth,
          redirectSignIn,
          redirectSignOut: redirectSignOut ?? redirectSignIn,
        },
      }
    : {}),
});
