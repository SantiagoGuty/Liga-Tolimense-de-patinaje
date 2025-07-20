// src/pages/Noticia.jsx
import { useParams, Navigate, Link } from 'react-router-dom';
import noticias from '../data/noticias';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import '../styles/noticia.css';

export default function Noticia() {
  const { slug } = useParams();
  const noticia = noticias.find(n => n.slug === slug);

  if (!noticia) {
    return <Navigate to="/noticias" replace />;
  }

  return (
    <>
      <Menu_bar />
      <main className="noticia-page">
        <article className="noticia-detail">
          <Link to="/noticias" className="back-link">
            ← Volver a Noticias
          </Link>
          <h1>{noticia.title}</h1>

          <img
            src={noticia.image}
            alt={noticia.title}
            className="noticia-img"
          />
          {/* Optional meta, remove if not needed */}
          {/* <div className="noticia-meta">Publicado el: {noticia.date}</div> */}
          <div className="noticia-content">
            {noticia.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>
      </main>
      <FooterTol />
    </>
  );
}
