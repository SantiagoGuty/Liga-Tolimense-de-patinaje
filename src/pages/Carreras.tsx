// File: src/pages/Carreras.tsx
import '../styles/banner.css';     // shared banner layout (spacer + overlay)
import '../styles/carreras.css';   // page-specific tweaks

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

// Use any image you like; this one already exists in your repo.
// Replace if you have a better "carreras" photo.
import carrerasBanner from '../assets/img/festibal1.jpg';

export default function Carreras() {
  return (
    <div className="page-wrapper carreras-page page-with-banner" id="carreras">
      <Menu_bar />

      {/* Banner */}
      <section className="page-banner carreras-banner">
        <img src={carrerasBanner} alt="Banner Patinaje Carreras" className="banner-img" />
        <h1 className="banner-title">Patinaje Carreras</h1>
      </section>

      {/* About */}
      <section className="carreras-about">
        <h2>¿Qué es el Patinaje Carreras?</h2>
        <p>
          El patinaje de carreras es una disciplina de alta velocidad donde se combinan técnica, resistencia
          y estrategia. En Tolima ofrecemos un programa integral que parte desde la correcta postura y arranque,
          avanza al trabajo de trazado de curvas y rectas, y culmina en entrenamiento de velocidad y resistencia
          en circuito. Practicarás arranques explosivos, cadencia de vuelta constante y ejercicios de fuerza
          para mejorar potencia y eficiencia sobre ruedas.
        </p>

        <h2>¡Únete Hoy!</h2>
        <p>
          Tanto si nunca has subido a unos patines como si ya compites, nuestra liga de carreras te brinda
          entrenadores certificados, pista profesional y un ambiente de superación constante. Participa en
          entrenamientos grupales, recibe asesoría personalizada y prepárate para competir en eventos locales
          y regionales. ¡Inscríbete y conviértete en velocista sobre ruedas!
        </p>

      </section>

      <FooterTol />
    </div>
  );
}
