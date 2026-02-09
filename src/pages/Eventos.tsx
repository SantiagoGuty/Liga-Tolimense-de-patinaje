// src/pages/Eventos.tsx
import '../styles/banner.css';
import '../styles/home.css';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

import eventosBanner from '../assets/img/competencia_pista_roja.jpeg'; // or any strong eventos image

// assets
import eventosVideo from '../assets/video/eventos-febrero-2026.mp4';
import posterRanking from '../assets/img/poster-ranking-2026.png';
import posterFestival from '../assets/img/poster-festival-2026.png';

import { Link } from 'react-router-dom';

export default function Eventos() {
  return (
    <div className="page-wrapper page-with-banner eventos-page">
      <Menu_bar />

      {/* Banner (same system as Carreras) */}
      <section className="page-banner eventos-banner">
        <img
          src={eventosBanner}
          alt="Eventos Liga Tolimense de Patinaje"
          className="banner-img"
        />
        <h1 className="banner-title">Eventos</h1>
      </section>
      {/* Próximos Eventos Oficiales */}
      <section className="upcoming-events">
        <h2 className="section-title">Próximos Eventos Oficiales</h2>

        <div className="events-grid">

          {/* Poster — Ranking */}
          <Link to="/resoluciones?id=24+Ene+2026" className="event-card poster-link">
            <img
              src={posterRanking}
              alt="IV Ranking Departamental 2026"
            />
          </Link>

          {/* Video */}
          <div className="event-card video-card">
            <video
              src={eventosVideo}
              controls
              preload="metadata"
              playsInline
              className="events-video"
            />
          </div>

          {/* Poster — Festival */}
          <Link to="/resoluciones?id=23+Ene+2026" className="event-card poster-link">
            <img
              src={posterFestival}
              alt="Festival de Escuelas y Novatos 2026"
            />
          </Link>

        </div>
      </section>

      <FooterTol />
    </div>
  );
}
