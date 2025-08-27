import '../styles/home.css';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import EventosCarousel from '../components/EventosCarousel';





export default function Eventos() {

    return(
<>
      <Menu_bar />

      {/* Banner with background color + title */}
      <section className="noticias-banner">
        <div className="banner-inner">
          <h1>Eventos</h1>
          <p>Entérate de los últimos de patinaje</p>
        </div>
      </section>

      <EventosCarousel variant="page" showTitle={false} />

      <FooterTol />
    </>
    )
}