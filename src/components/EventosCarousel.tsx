// src/components/EventosCarousel.tsx
import '../styles/eventos.css';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import patinadores_infantiles from '../assets/img/patinadores_infantiles.jpg';
import arias_y_ninos from '../assets/img/arias_y_ninos_1.jpg';
import accion_1 from '../assets/img/accion1.jpg';

type EventosCarouselProps = {
  variant?: 'home' | 'page';   // controls layout size/styles
  showTitle?: boolean;         // toggle internal title
  className?: string;
};

export default function EventosCarousel({
  variant = 'home',
  showTitle = true,
  className = '',
}: EventosCarouselProps) {
  
  const wrapperClass = `eventos eventos--${variant} ${className}`.trim();

  return (
    <section id="eventos" className={wrapperClass}>
      {showTitle && (
        <div className="eventos-title">
          <h1>Eventos</h1>
        </div>
      )}

      <div className="noticias-carousel-wrapper eventos-carousel-wrapper">
        <CCarousel controls indicators transition="crossfade" interval={6000}>
          <CCarouselItem>
            <div className="event-slide">
              <div className="event-text-area">
                <h5>Nacional interclubes 2025 - Ibagué</h5>
                <p>En el marco del campeonato panamericano de patinaje de velocidad, categoría mayores.</p>
                <a href="https://fedepatin.org.co/1ibague2025-velocidad-mayores/" className="read-more-btn">Resultados</a>
              </div>
              <div className="event-image-area">
                <CImage className="noticia-img" src={patinadores_infantiles} alt="Evento 1" />
              </div>
            </div>
          </CCarouselItem>

          <CCarouselItem>
            <div className="event-slide">
              <div className="event-text-area">
                <h5>Nacional interclubes 2025 - Cali</h5>
                <p>En el marco del grand prix de patinaje de velocidad, categoría mayores.</p>
                <a href="https://fedepatin.org.co/2valida2024-velocidad-cali/" className="read-more-btn">Resultados</a>
              </div>
              <div className="event-image-area">
                <CImage className="noticia-img" src={arias_y_ninos} alt="Evento 2" />
              </div>
            </div>
          </CCarouselItem>

          <CCarouselItem>
            <div className="event-slide">
              <div className="event-text-area">
                <h5>Nacional interclubes 2025 - Medellín</h5>
                <p>Válida nacional interclubes 2025, en el marco del grand prix de patinaje de velocidad, categoría mayores.</p>
                <a href="https://fedepatin.org.co/3valida2025-velocidad-medellin/" className="read-more-btn">Resultados</a>
              </div>
              <div className="event-image-area">
                <CImage className="noticia-img" src={accion_1} alt="Evento 3" />
              </div>
            </div>
          </CCarouselItem>

          <CCarouselItem>
            <div className="event-slide">
              <div className="event-text-area">
                <h5>Nacional interclubes 2025 - Bogotá</h5>
                <p>Nacional interclubes 2025, categoría mayores.</p>
                <a href="https://fedepatin.org.co/4valida2025-velocidad-bogota/" className="read-more-btn">Resultados</a>
              </div>
              <div className="event-image-area">
                <CImage className="noticia-img" src={accion_1} alt="Evento 3" />
              </div>
            </div>
          </CCarouselItem>
        </CCarousel>
      </div>
    </section>
  );
}
