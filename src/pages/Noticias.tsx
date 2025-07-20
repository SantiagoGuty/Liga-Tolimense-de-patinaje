import noticias from '../data/noticias';
import { Link } from 'react-router-dom';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

import '../styles/noticias.css';

export default function Noticias() {
  return (
    <>
      <Menu_bar />

      {/* Banner with background color + title */}
      <section className="noticias-banner">
        <div className="banner-inner">
          <h1>Noticias</h1>
          <p>Entérate de lo último en la liga Tolimense</p>
        </div>
      </section>

      {/* Cards grid */}
      <section className="noticias-list">
        <div className="news-cards-container">
          {noticias.map(({ slug, title, excerpt, image }) => (
            <article key={slug} className="news-card">
              <img src={image} alt={title} />
              <div className="news-card-content">
                <h3>{title}</h3>
                <p>{excerpt}</p>
                    <Link to={`/noticias/${slug}`} className="read-more">Leer más</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FooterTol />
    </>
  );
}
