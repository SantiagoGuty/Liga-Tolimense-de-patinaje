// File: src/pages/Artistico.tsx
import '../styles/banner.css';      // shared banner layout
import '../styles/artistico.css';   // page-specific tweaks

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

// You already have this in your repo from Home.
import artisticoBanner from '../assets/img/artistico1.jpg';

export default function Artistico() {
  return (
    <div className="page-wrapper artistico-page page-with-banner" id="artistico">
      <Menu_bar />

      {/* Banner */}
      <section className="page-banner artistico-banner">
        <img src={artisticoBanner} alt="Banner Patinaje Artístico" className="banner-img" />
        <h1 className="banner-title">Patinaje Artístico</h1>
      </section>

      {/* About */}
      <section className="artistico-about">
        <h2>¿Qué es el Patinaje Artístico?</h2>
        <p>
          El patinaje artístico combina elegancia y técnica sobre ruedas. Nuestro programa abarca desde
          fundamentos hasta rutinas coreografiadas para competencias. Aprenderás piruetas, saltos y
          secuencias artísticas mientras mejoras fuerza, flexibilidad y expresión.
        </p>

        <h2>¡Únete Hoy!</h2>
        <p>
          No importa tu nivel: encontrarás el acompañamiento y la estructura para alcanzar tus metas
          en el patinaje artístico. ¡Ven y sé parte de nuestra comunidad!
        </p>

        <a href="/Registrate">
          <button className="btn-registrarse artistico-btn">¡Regístrate ahora!</button>
        </a>
      </section>

      <FooterTol />
    </div>
  );
}
