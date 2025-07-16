


import '../styles/NoticiasPage.css'
import Menu_bar from '../components/Menu_bar'
import FooterTol from '../components/FooterTol'

import seleccion1 from '../assets/img/seleccion1.jpg'
import premiacion1 from '../assets/img/premiacion1.jpg'
import artistico1 from '../assets/img/artistico1.jpg'

export default function Noticias() {
  return (
    <>
      <Menu_bar />

      <section className="noticias" id="noticias">
        <h1>Noticias</h1>

        <div className="news-cards-container">
          <article className="news-card">
            <img src={seleccion1} alt="Tolima abraza el oro" />
            <div className="news-card-content">
              <h3>¡Tolima abraza el oro!</h3>
              <p>
                La selección tolimense acaba de terminar una jornada histórica en Cartagena...
              </p>
              <a href="/noticia-1">Leer más</a>
            </div>
          </article>

          <article className="news-card">
            <img src={premiacion1} alt="Nuevo curso de patinaje en Ibagué" />
            <div className="news-card-content">
              <h3>Nuevo curso de patinaje en Ibagué</h3>
              <p>Inscripciones abiertas para todas las edades y niveles.</p>
              <a href="/noticia-2">Leer más</a>
            </div>
          </article>

          <article className="news-card">
            <img src={artistico1} alt="Convocatoria abierta" />
            <div className="news-card-content">
              <h3>Convocatoria abierta</h3>
              <p>
                La Liga Tolimense invita a clubes a participar en la copa regional 2025.
              </p>
              <a href="/noticia-3">Leer más</a>
            </div>
          </article>
        </div>
      </section>

      <FooterTol />
    </>
  )
}
