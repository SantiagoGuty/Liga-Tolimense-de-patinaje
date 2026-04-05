import { useEffect } from 'react';
import '../styles/iniciasesion.css';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import accion_4 from '../assets/img/accion4.jpg';

import { signinWithGoogle, ensureSessionLoaded, isSignedIn } from '../services/authService';
import { getCurrentUserProfile } from '../services/userProfile';
import { useNavigate } from 'react-router-dom';

export default function IniciaSesion() {
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      await ensureSessionLoaded();
      if (await isSignedIn()) {
        const profile = await getCurrentUserProfile().catch(() => null);
        const isComplete = profile && profile.correo?.includes('@') && !!profile.cedula;
        nav(isComplete ? '/perfil' : '/registrate', { replace: true });
      }
    })();
  }, [nav]);

  return (
    <div className="page-wrapper" id="inicia-sesion">
      <Menu_bar />
      <div className="main-content">
        <main className="auth-wrapper" role="main" aria-labelledby="auth-title">
          <aside className="auth-hero" aria-hidden="true">
            <img src={accion_4} alt="Patinadores en acción" />
            <div className="auth-hero-overlay" />
            <h1 className="auth-hero-title">Liga Tolimense de Patinaje</h1>
          </aside>

          <section className="auth-card">
            <h2 id="auth-title">Bienvenido</h2>
            <p style={{ color: '#555', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
              Inicia sesión o crea tu cuenta con Google
            </p>

            <div className="auth-sso" style={{ width: '100%' }}>
              <button
                type="button"
                className="sso-btn"
                onClick={() => signinWithGoogle()}
              >
                <svg width="20" height="20" viewBox="0 0 48 48" style={{ verticalAlign: 'middle', marginRight: 10 }}>
                  <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.49 3.08 29.56 1 24 1 14.82 1 7.02 6.7 3.6 14.73l7.08 5.5C12.36 14.2 17.73 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.42-4.74H24v8.98h12.67c-.55 2.95-2.2 5.45-4.68 7.13l7.18 5.58C43.58 37.37 46.5 31.37 46.5 24.5z"/>
                  <path fill="#FBBC05" d="M10.68 28.23A14.6 14.6 0 0 1 9.5 24c0-1.48.25-2.91.68-4.27l-7.08-5.5A23.94 23.94 0 0 0 0 24c0 3.87.92 7.53 2.55 10.77l8.13-6.54z"/>
                  <path fill="#34A853" d="M24 47c5.56 0 10.22-1.84 13.62-4.99l-7.18-5.58c-1.84 1.24-4.2 1.97-6.44 1.97-6.27 0-11.64-4.7-13.32-11.17l-8.13 6.54C7.02 41.3 14.82 47 24 47z"/>
                </svg>
                Continuar con Google
              </button>
            </div>
          </section>
        </main>
      </div>
      <FooterTol />
    </div>
  );
}
