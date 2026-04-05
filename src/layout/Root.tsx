// src/layout/Root.tsx
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { ensureSessionLoaded, isSignedIn } from '../services/authService';
import { getCurrentUserProfile } from '../services/userProfile';

export default function Root() {
  const nav = useNavigate();

  // Handle OAuth redirect callback (Google sign-in returns to / with ?code=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('code')) return; // not an OAuth callback, skip

    (async () => {
      try {
        await ensureSessionLoaded(); // exchanges the code for tokens
        if (!(await isSignedIn())) {
          // Code was invalid or expired — send back to sign-in
          nav('/iniciasesion', { replace: true });
          return;
        }
        const profile = await getCurrentUserProfile().catch(() => null);
        // Profile is complete only if it has a real email and cedula
        const isComplete = profile && profile.correo?.includes('@') && !!profile.cedula;
        nav(isComplete ? '/perfil' : '/registrate', { replace: true });
      } catch {
        // Something went wrong during token exchange — send back to sign-in
        nav('/iniciasesion', { replace: true });
      }
    })();
  }, [nav]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
