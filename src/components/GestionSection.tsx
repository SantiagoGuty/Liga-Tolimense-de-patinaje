// src/components/GestionSection.tsx
import { useState } from 'react';
import '../styles/gestion.css';

type GestionVideo = {
  id: string;
  kicker: string;
  name: string;
};

const mainVideo: GestionVideo = {
  id: 'ZswisnUGOhE',
  kicker: 'Informe de gestión 2025',
  name: 'Presidenta Mónica Morales',
};

const interviews: GestionVideo[] = [
  { id: 'oku0YuLVFmg', kicker: 'Entrevista sobre gestión', name: 'Óscar Rodríguez' },
  { id: 'P1HOUNknT1Y', kicker: 'Entrevista sobre gestión', name: 'Yamid Díaz' },
  { id: 'IQqGOkMrGSw', kicker: 'Entrevista sobre gestión', name: 'Giovanna Cruz' },
  { id: 'J8X2uyfJqjU', kicker: 'Entrevista sobre gestión', name: 'Cristihan Méndez' },
];

const allVideos = [mainVideo, ...interviews];

export default function GestionSection() {
  const [activeId, setActiveId] = useState(mainVideo.id);
  const activeVideo = allVideos.find((v) => v.id === activeId) ?? mainVideo;

  return (
    <section className="gestion-section" id="gestion-2025">
      <h2 className="gestion-title">
        ¡Conoce la gestión de la Liga Tolimense de Patinaje del 2025!
      </h2>

      <div className="gestion-player">
        <div className="gestion-player-frame">
          <iframe
            key={activeVideo.id}
            src={`https://www.youtube.com/embed/${activeVideo.id}`}
            title={`${activeVideo.kicker} - ${activeVideo.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>

        <p className="gestion-player-caption">
          <strong>{activeVideo.kicker}</strong> — {activeVideo.name}
        </p>
      </div>

      <div className="gestion-buttons">
        {interviews.map((video) => (
          <button
            key={video.id}
            type="button"
            className={`gestion-btn ${activeId === video.id ? 'is-active' : ''}`}
            onClick={() => setActiveId(video.id)}
            aria-pressed={activeId === video.id}
          >
            <span className="gestion-btn-thumb">
              <img
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={`${video.kicker} - ${video.name}`}
                loading="lazy"
              />
              <span className="gestion-btn-play" aria-hidden="true">▶</span>
              {activeId === video.id && (
                <span className="gestion-btn-badge">Viendo ahora</span>
              )}
            </span>

            <span className="gestion-btn-text">
              <span className="gestion-btn-kicker">{video.kicker}</span>
              <span className="gestion-btn-name">{video.name}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
