import '../styles/carreras.css';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import novatoBanner from '../assets/img/festibal1.jpg';

export default function Carreras() {
  return (
    <div className="page-wrapper novato-page" id="novato">
      <Menu_bar />

      {/* Banner Section */}
      <section className="novato-banner">
        <img src={novatoBanner} alt="Banner Novato" className="banner-img" />
        <h1 className="banner-title-artistico">Patinaje Carreras</h1>
      </section>

      {/* About Section */}
      <section className="novato-about">
        <h2>¿Qué es el Patinaje Carreras?</h2>
        <p>
            El patinaje de carreras es una disciplina de alta velocidad donde se combinan técnica, resistencia y estrategia. 
            En Tolima ofrecemos un programa integral que parte desde la correcta postura y arranque, avanza al trabajo de 
            trazado de curvas y rectas, y culmina en entrenamiento de velocidad y resistencia en circuito. Durante las sesiones, 
            practicarás arranques explosivos, mantenimiento de la cadencia en cada vuelta y ejercicios de fuerza para mejorar tu 
            potencia y eficiencia sobre las ruedas.
        </p>

        <h2>¡Únete Hoy!</h2>
        <p>
            Tanto si nunca has subido a unos patines de ruedas como si ya compites, nuestra liga de carreras te brinda entrenadores 
            certificados, pista profesional y un ambiente de superación constante. Participa en entrenamientos grupales, recibe 
            asesoría personalizada y prepárate para competir en eventos locales y regionales. ¡Inscríbete ahora y conviértete en  
            velocista sobre ruedas!
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