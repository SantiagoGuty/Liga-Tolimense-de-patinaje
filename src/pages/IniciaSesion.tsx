// src/pages/IniciaSesion.tsx
import { useState, type FormEvent } from 'react';
import '../styles/iniciasesion.css';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import accion_4 from '../assets/img/accion4.jpg';

// Auth + profile services
import { signinEmailPassword, signinWithGoogle } from '../services/authService';
import { getCurrentUserProfile } from '../services/userProfile';
import { useNavigate } from 'react-router-dom';

export default function IniciaSesion() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await signinEmailPassword(correo, contrasena);

      // After successful sign-in, decide where to go
      const profile = await getCurrentUserProfile().catch(() => null);
      nav(profile ? '/perfil' : '/crear-perfil');
    } catch (err: any) {
      setError(err?.message || 'No se pudo iniciar sesión');
    }
  }

  async function handleGoogle() {
    setError('');
    try {
      // Redirects to Cognito Hosted UI (Google). After callback, user is signed in.
      await signinWithGoogle();
      // On return from Hosted UI, your app will re-mount. ProtectedRoute will handle redirects.
    } catch (err: any) {
      setError(err?.message || 'No se pudo iniciar con Google');
    }
  }

  return (
    <div className="page-wrapper" id="inicia-sesion">
      <Menu_bar />

      <div className="main-content">
        <main className="auth-wrapper" role="main" aria-labelledby="auth-title">
          {/* Left: brand image */}
          <aside className="auth-hero" aria-hidden="true">
            <img src={accion_4} alt="Patinadores en acción" />
            <div className="auth-hero-overlay" />
            <h1 className="auth-hero-title">Liga Tolimense de Patinaje</h1>
          </aside>

          {/* Right: login card (same visuals) */}
          <section className="auth-card">
            <h2 id="auth-title">Inicia sesión</h2>

            {/* Functional form (same layout) */}
            <form className="auth-form" onSubmit={handleLogin} noValidate>
              {error && (
                <p style={{ color: 'crimson', marginTop: 0, marginBottom: '0.75rem' }}>
                  {error}
                </p>
              )}

              <label className="auth-field">
                <span>Correo</span>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </label>

              <label className="auth-field">
                <span>Contraseña</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="auth-btn">
                Entrar
              </button>
            </form>

            <div className="auth-links" aria-label="Acciones alternativas">
              <a href="/registrate" className="auth-link">Crear cuenta</a>
              <a href="/recuperar" className="auth-link">¿Olvidaste tu contraseña?</a>
            </div>

            <div className="auth-divider" role="separator" aria-hidden="true">
              <span />
              <em>o</em>
              <span />
            </div>

            {/* Google SSO (same button, now functional) */}
            <div className="auth-sso">
              <button type="button" className="sso-btn" onClick={handleGoogle}>
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
