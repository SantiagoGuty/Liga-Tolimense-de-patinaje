// File: src/pages/Novato.tsx
import '../styles/banner.css';   // shared banner layout
import '../styles/novato.css';   // page-specific tweaks

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import novatoBanner from '../assets/img/novatos-patinaje.jpg';

export default function Novato() {
  return (
    <div className="page-wrapper novato-page page-with-banner" id="novato">
      <Menu_bar />

      {/* Banner */}
      <section className="page-banner novato-banner">
        <img src={novatoBanner} alt="Banner Novato" className="banner-img" />
        <h1 className="banner-title">Novatos</h1>
      </section>

      {/* About */}
      <section className="novato-about">
        <h2>¿Cómo es el curso para Novatos?</h2>
        <p>
          El curso para Novatos está diseñado para quienes toman sus primeras patinadas.
          Construirás una base sólida desarrollando equilibrio, postura y control del patín.
        </p>
        <p>
          Aprenderás a desplazarte con seguridad, mantener tu centro de gravedad y realizar
          tus primeros giros con confianza.
        </p>
        <p>
          Ideal para niños y adultos sin experiencia previa. ¡Ven y descubre lo divertido
          que es empezar a patinar con instructores expertos y compañeros entusiastas!
        </p>

      </section>


      <div className="guide-list">
          <article className="guide-card empty">
            <div className="guide-info">
              <h3>Muy pronto</h3>
              <p>Publicaremos guías descargables y recursos útiles.</p>
            </div>
          </article>
      </div>

      <FooterTol />
    </div>
  );
} 