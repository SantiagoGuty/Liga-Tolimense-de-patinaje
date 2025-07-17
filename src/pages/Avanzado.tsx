// File: src/pages/Avanzado.tsx
import '../styles/avanzado.css';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import avanzadoBanner from '../assets/img/accion4.jpg'; // Banner image for Avanzados

export default function Avanzado() {
  return (
    <div className="page-wrapper avanzado-page" id="avanzado">
      <Menu_bar />

      {/* Banner Section */}
      <section className="avanzado-banner">
        <img src={avanzadoBanner} alt="Banner Avanzado" className="banner-img" />
        <h1 className="banner-title">Avanzado</h1>
      </section>

      {/* About Section */}
      <section className="avanzado-about">
        <h2>¿Cómo es el curso para Avanzados?</h2>
        <p>
          El curso Avanzado está dirigido a quienes ya dominan las técnicas básicas y desean llevar su
          patinaje al siguiente nivel. Aquí perfeccionarás giros, frenados de precisión y maniobras complejas.
        </p>
        <p>
          Trabajaremos en el control de la velocidad, posturas dinámicas y transiciones fluidas, además de
          ejercicios específicos para mejorar tu agilidad y resistencia.
        </p>
        <p>
          Al finalizar, estarás preparado(a) para competencias regionales y entrenamientos de alto rendimiento,
          con la proyección de formar parte de la selección Tolima.
        </p>
        <a href="/Registrate">
          <button className="btn-registrarse avanzado-btn">
            ¡Regístrate ahora!
          </button>
        </a>
      </section>

      <FooterTol />
    </div>
  );
}