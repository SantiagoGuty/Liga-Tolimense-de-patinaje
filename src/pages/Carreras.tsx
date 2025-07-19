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
        <h1 className="banner-title">Carreras</h1>
      </section>

      {/* About Section */}
      <section className="novato-about">
        <h2>¿Como es el curso para Novatos?</h2>
        <p>
          El curso para Novatos está diseñado para quienes toman sus primeras patinadas. Aquí crearás una base
          sólida desarrollando tu equilibrio, postura y control del patín. Trabajaremos paso a paso,
          combinando ejercicios de deslizamiento y frenado para asegurar tu confianza en cada movimiento.
        </p>
        <p>
          Durante las sesiones, aprenderás a desplazarte con seguridad, mantener el centro de gravedad y
          realizar tus primeros giros. Nuestro objetivo es que al finalizar el curso conozcas las técnicas
          fundamentales que te permitirán avanzar al siguiente nivel sin miedo.
        </p>
        <p>
          Ideal para niños y adultos sin experiencia previa. ¡Ven y descubre lo divertido que puede ser
          empezar a patinar con un grupo de instructores expertos y compañeros entusiastas!
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