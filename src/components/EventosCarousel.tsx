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
                <h5>3er Festibal Departametal de escuelas y novatos</h5>
                <p>La selección tolimense acaba de terminar una jornada histórica en Medellin...</p>
                <a href="/event-detail" className="read-more-btn">Leer más</a>
              </div>
              <div className="event-image-area">
                <CImage className="noticia-img" src={patinadores_infantiles} alt="Evento 1" />
              </div>
            </div>
          </CCarouselItem>

          <CCarouselItem>
            <div className="event-slide">
              <div className="event-text-area">
                <h5>Interligas Ibagué 2025</h5>
                <p>La selección tolimense se prepara para defender la casa...</p>
                <a href="/event-detail" className="read-more-btn">Leer más</a>
              </div>
              <div className="event-image-area">
                <CImage className="noticia-img" src={arias_y_ninos} alt="Evento 2" />
              </div>
            </div>
          </CCarouselItem>

          <CCarouselItem>
            <div className="event-slide">
              <div className="event-text-area">
                <h5>Contrarreloj Guarne</h5>
                <p>La selección tolimense acaba de terminar una jornada histórica en Guarne...</p>
                <a href="/event-detail" className="read-more-btn">Leer más</a>
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
