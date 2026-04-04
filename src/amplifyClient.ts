import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

const domain = import.meta.env.VITE_COGNITO_DOMAIN;
const redirectSignIn = import.meta.env.VITE_REDIRECT_SIGN_IN ?? 'http://localhost:5173/';
const redirectSignOut = import.meta.env.VITE_REDIRECT_SIGN_OUT ?? 'http://localhost:5173/';

Amplify.configure({
  ...awsExports,
  // Inject OAuth config from env vars so Google sign-in works.
  // aws-exports.js ships with oauth:{} (empty); these env vars fill it in.
  ...(domain
    ? {
        oauth: {
          domain,
          scope: ['openid', 'email', 'profile'],
          redirectSignIn,
          redirectSignOut,
          responseType: 'code',
        },
      }
    : {}),
});
