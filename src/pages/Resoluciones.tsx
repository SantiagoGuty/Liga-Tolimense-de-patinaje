import '../styles/banner.css';
import '../styles/resoluciones.css';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

// usa la imagen que prefieras como banner (puedes cambiarla después)
import bannerImg from '../assets/img/patinaje-carreras.jpg';

export default function Resoluciones() {
  return (
    <div className="page-wrapper page-with-banner resoluciones-page" id="resoluciones">
      <Menu_bar />

      {/* Banner */}
      <section className="page-banner resoluciones-banner">
        <img src={bannerImg} alt="Banner Resoluciones" className="banner-img" />
        <h1 className="banner-title">Resoluciones</h1>
      </section>

      {/* Contenido */}
      <section className="resoluciones-content">
        <h2>Resoluciones vigentes</h2>
        <p className="intro">
          Consulta las resoluciones, circulares y lineamientos oficiales de la Liga Tolimense de Patinaje.
          Pronto publicaremos aquí los documentos más recientes.
        </p>

        {/* Lista / cards (deja la estructura; podrás mapear tus datos cuando los tengas) */}
        <div className="doc-list">
          {/* Ejemplo de tarjeta vacía de placeholder */}
          <article className="doc-card empty">
            <div className="doc-info">
              <h3>Muy pronto</h3>
              <p>Estamos preparando la publicación de nuevas resoluciones.</p>
            </div>
          </article>
        </div>
      </section>

      <FooterTol />
    </div>
  );
}
