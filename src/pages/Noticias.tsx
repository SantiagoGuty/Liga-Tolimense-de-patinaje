import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import NoticiasSection from '../components/NoticiasSection';


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

     <section className="noticias-list">
        <NoticiasSection wrap={false} />
     </section>

      <FooterTol />
    </>
  );
}
