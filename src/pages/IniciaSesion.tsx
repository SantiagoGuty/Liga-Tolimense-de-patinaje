/*import { useState } from 'react'
import type { FormEvent } from 'react'
import { login } from '../services/userService'
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

import { useNavigate } from 'react-router-dom'

export default function IniciaSesion() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    try {
      await login(correo, contrasena)
      nav('/perfil')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <>

    <Menu_bar/>
    <form onSubmit={handleLogin}>
      {error && <p style={{color:'red'}}>{error}</p>}
      <input placeholder="Correo"     onChange={e=>setCorreo(e.target.value)} />
      <input placeholder="Contraseña" type="password"
             onChange={e=>setContrasena(e.target.value)} />
      <button type="submit">Iniciar sesión</button>
    </form>

    <FooterTol/>
    </>
  )
}
*/
// File: src/pages/IniciaSesion.tsx (visual-only)
// =============================================
// File: src/pages/IniciaSesion.tsx  (visual-only)
// =============================================
import '../styles/iniciasesion.css';      // 👈 new, page-specific styles

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import accion_4 from '../assets/img/accion4.jpg';

export default function IniciaSesion() {
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

          {/* Right: login card (visuals only) */}
          <section className="auth-card">
            <h2 id="auth-title">Inicia sesión</h2>

            {/* Visual-only form: disabled controls, no submit */}
            <form className="auth-form" onSubmit={(e) => e.preventDefault()} noValidate>
              <label className="auth-field">
                <span>Correo</span>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  disabled
                  aria-disabled="true"
                />
              </label>

              <label className="auth-field">
                <span>Contraseña</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  disabled
                  aria-disabled="true"
                />
              </label>

              <button type="button" className="auth-btn" disabled aria-disabled="true">
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

            {/* Visual SSO button */}
            <div className="auth-sso">
              <button type="button" className="sso-btn" disabled aria-disabled="true">
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