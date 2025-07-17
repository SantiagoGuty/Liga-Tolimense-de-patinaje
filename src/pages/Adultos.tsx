// File: src/pages/Adultos.tsx
import '../styles/adultos.css';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import adultoBanner from '../assets/img/profe.jpg'; // Banner image for Adultos

export default function Adultos() {
  return (
    <div className="page-wrapper adultos-page" id="adultos">
      <Menu_bar />

      {/* Banner Section */}
      <section className="adultos-banner">
        <img src={adultoBanner} alt="Banner Adultos" className="banner-img" />
        <h1 className="banner-title">Adultos</h1>
      </section>

      {/* About Section */}
      <section className="adultos-about">
        <h2>¿Cómo es el curso para Adultos?</h2>
        <p>
          El curso Adultos está especialmente diseñado para quienes desean retomar o iniciar el patinaje
          en un entorno seguro y motivador. Adaptamos los ejercicios a tu ritmo y objetivos personales.
        </p>
        <p>
          Trabajaremos en técnicas de equilibrio, frenado controlado y tracción eficiente, combinadas con
          dinámicas grupales que fomentan la camaradería y el aprendizaje paso a paso.
        </p>
        <p>
          Al finalizar el programa, disfrutarás de mayor confianza y habilidad sobre ruedas, ya sea para
          recreación, fitness o competencias amateur. ¡Únete a nuestra comunidad y vive la pasión por
          el patinaje a cualquier edad!
        </p>
        <a href="/Registrate">
          <button className="btn-registrarse adultos-btn">
            ¡Regístrate ahora!
          </button>
        </a>
      </section>

      <FooterTol />
    </div>
  );
}
