import '../styles/artistico.css';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import novatoBanner from '../assets/img/festibal1.jpg';

export default function Artistico() {
  return (
    <div className="page-wrapper novato-page" id="novato">
      <Menu_bar />

      {/* Banner Section */}
      <section className="novato-banner">
        <img src={novatoBanner} alt="Banner Novato" className="banner-img" />
        <h1 className="banner-title-artistico">Patinaje Artístico</h1>
      </section>

      {/* About Section */}
      <section className="novato-about">
        <h2>¿Qué es el Patinaje Artístico?</h2>
        <p>
          El patinaje artístico combina la elegancia y la técnica sobre ruedas. En Tolima ofrecemos un programa
          completo que abarca desde los fundamentos básicos hasta las rutinas coreografiadas para competencias.
          Aprenderás piruetas, saltos y secuencias artísticas mientras mejoras tu fuerza, flexibilidad y expresión
        </p>
        <h2>¡Únete Hoy!</h2>
        <p>
          No importa tu nivel, en Tolima encontrarás el apoyo y la estructura para alcanzar tus metas en
          el patinaje artístico. ¡Ven y sé parte de nuestra comunidad!
        </p>
        <a href="/Registrate">
          <button className="btn-registrarse novato-btn">
            ¡Regístrate ahora!
          </button>
        </a>
      </section>

      <FooterTol />
    </div>
  );
}