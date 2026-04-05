import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/privacidad.css';

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <div className="cookie-banner-top">
        <span className="cookie-banner-icon">🍪</span>
        <div className="cookie-banner-text">
          <h3>Usamos cookies</h3>
          <p>
            Usamos cookies esenciales para mantener tu sesión activa y recordar tus preferencias.
            No usamos cookies de publicidad ni seguimiento de terceros.{' '}
            <Link to="/privacidad">Política de privacidad</Link>
          </p>
        </div>
      </div>
      <div className="cookie-banner-actions">
        <button className="cookie-btn-decline" onClick={decline}>Solo esenciales</button>
        <button className="cookie-btn-accept" onClick={accept}>Aceptar</button>
      </div>
    </div>
  );
}
