import '../styles/banner.css';
import '../styles/guias.css';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

// usa la imagen que prefieras como banner (puedes cambiarla después)
import bannerImg from '../assets/img/patinaje-artistico.jpg';

export default function Guias() {
  return (
    
    <div className="page-wrapper page-with-banner guias-page" id="guias">
      <Menu_bar />

      {/* Banner */}
      <section className="page-banner guias-banner">
        <img src={bannerImg} alt="Banner Guías" className="banner-img" />
        <h1 className="banner-title">Guías</h1>
      </section>

      {/* Contenido */}
      <section className="guias-content">
        <h2>Material de apoyo y guías</h2>
        <p className="intro">
          Aquí encontrarás instructivos, buenas prácticas y documentos de referencia para deportistas,
          padres y entrenadores. Este repositorio crecerá constantemente.
        </p>

        {/* Lista / cards (estructura lista para mapear tus datos) */}
        <div className="guide-list">
          <article className="guide-card empty">
            <div className="guide-info">
              <h3>Muy pronto</h3>
              <p>Publicaremos guías descargables y recursos útiles.</p>
            </div>
          </article>
        </div>

        
        <div className="mobile-guides">
          <div className="guide-row">
            <span>Guía de Competencias 2026.pdf</span>

            <div className="guide-actions">
              <a href="/docs/guia-competencias-2026.pdf" target="_blank">Abrir</a>
              <a href="/docs/guia-competencias-2026.pdf" download>Descargar</a>
            </div>
          </div>
        </div>

      </section>

      <FooterTol />
    </div>
  );
}
