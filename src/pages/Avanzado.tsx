// File: src/pages/Avanzado.tsx
import '../styles/banner.css';     // shared banner layout
import '../styles/avanzado.css';   // page-specific tweaks

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import avanzadoBanner from '../assets/img/avanzado-patinaje.jpg';

export default function Avanzado() {
  return (
    <div className="page-wrapper avanzado-page page-with-banner" id="avanzado">
      <Menu_bar />

      {/* Banner */}
      <section className="page-banner avanzado-banner">
        <img src={avanzadoBanner} alt="Banner Avanzado" className="banner-img" />
        <h1 className="banner-title">Avanzado</h1>
      </section>

      {/* About */}
      <section className="avanzado-about">
        <h2>¿Cómo es el curso para Avanzados?</h2>
        <p>
          Dirigido a quienes dominan las bases y quieren llevar su patinaje al siguiente nivel:
          giros, frenados de precisión y maniobras complejas.
        </p>
        <p>
          Trabajaremos control de velocidad, posturas dinámicas, transiciones fluidas y ejercicios
          de agilidad y resistencia.
        </p>
        <p>
          Finalizarás listo(a) para competencias y entrenamientos de alto rendimiento, con proyección
          a selección Tolima.
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
