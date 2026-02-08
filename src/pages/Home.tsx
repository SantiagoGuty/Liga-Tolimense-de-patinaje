import '../styles/home.css';
  {/* import eventosImg from '../assets/img/festibal1.jpg';*/}
import campeon from '../assets/img/campeon.jpg';


import accion_2 from '../assets/img/accion2.jpg';
import accion_4 from '../assets/img/accion4.jpg';
import artistico1 from '../assets/img/artistico1.jpg';
import logo_blanco from '../assets/img/logo_liga_blanco.png';



import Menu_bar from '../components/Menu_bar';
import Aliados from '../components/Aliados';
import FooterTol from '../components/FooterTol';
import EventosCarousel from '../components/EventosCarousel';
import NoticiasSection from "../components/NoticiasSection";
import "../styles/noticias-section.css";

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home() {

  const heroImages = [accion_4, artistico1, accion_2, campeon];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
 
  {/* Images automatic slide in home start*/}
  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 10000); // every 8s

    return () => clearInterval(interval);
  }, []);


  return (

  <div className="page-wrapper" id='inicio'>

    {/*Main menu object*/}
    <Menu_bar/> 

    <div className='main-content'>

      {/* Intro con imagenes */}
      <div className="hero">

        <div className="hero-left">

          <div
              className="hero-slider"
              style={{ transform: `translateX(-${currentHeroIndex * 100}%)` }}
            >
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Hero ${index}`}
                  className={`hero-slide ${index === currentHeroIndex ? 'zoom' : ''}`}
                />
              ))}
          </div>
        </div>

        <div className="hero-right">

        <h1 className="sr-only">Liga Tolimense de Patinaje</h1>

        <img
          className="hero-title-img"
          src={logo_blanco}
          alt="Liga Tolimense de Patinaje"
        />
      </div>


      </div>

      {/* Qué es la Liga */}
      <section className="about-liga">
        <div className="about-liga-wrapper">

          <h2>¿Qué es la Liga Tolimense de Patinaje?</h2>

          <p className="about-intro">
            La <strong>Liga Tolimense de Patinaje</strong> es una organización deportiva
            comprometida con la formación integral de patinadores, impulsando el
            talento, la disciplina y la proyección competitiva en el Tolima.
          </p>

          <div className="about-features">

            <div className="about-feature">
              <span className="about-icon">🛼</span>
              <h3>Formación Deportiva</h3>
              <p>
                Acompañamos a los atletas desde sus primeros pasos hasta niveles
                competitivos, respetando los procesos y etapas de desarrollo.
              </p>
            </div>

            <div className="about-feature">
              <span className="about-icon">🏆</span>
              <h3>Proyección y Competencia</h3>
              <p>
                Preparamos patinadores para representar al Tolima en eventos
                departamentales, nacionales e internacionales.
              </p>
            </div>

            <div className="about-feature">
              <span className="about-icon">🤝</span>
              <h3>Comunidad y Valores</h3>
              <p>
                Fomentamos el respeto, la disciplina y el trabajo en equipo como
                pilares del crecimiento deportivo y personal.
              </p>
            </div>

            <div className="about-feature">
              <span className="about-icon">📍</span>
              <h3>Presencia Regional</h3>
              <p>
                Trabajamos junto a clubes, entrenadores y familias en Ibagué y
                diferentes municipios del Tolima.
              </p>
            </div>

          </div>
        </div>
      </section>





    

    {/* Rifa */}
    <section className="rifa-section">
      <div className="rifa-content">
        <h2> 🎉 ¡Gran Rifa de parte de la Liga Tolimense de Patinaje!🎉</h2>
        <p>
          Participa llenando el formulario y podrás ganar
          <strong> dos grandes anchetas</strong>.
          <br />
          ¡No pierdas esta oportunidad!
        </p>

        <a
          href="https://forms.gle/GCZ55iJuDgbh72NMA"
          target="_blank"
          rel="noreferrer"
          className="rifa-btn"
        >
          👉 Llenar formulario y participar 
        </a>
      </div>
    </section>


    {/* Noticias */}
    <NoticiasSection />

{/* Cursos 
      <section className="cursos">

        <div className="cursos_titulos">
          <h1>¡Únete a nuestros cursos!</h1>
          <p>Desde tus primeras lecciones hasta proyección profesional ¡no importa tu edad!</p>
        </div>
        
        <div className="niveles">

          <div className="nivel novato">
                
            <div className="nivel-button">

              <a href='/Novato'>
                <span>Novato</span>
              </a>
            </div>
          
            <div className="nivel-info">

              <p>
                Ideal para quienes empiezan desde cero. Aprende desde cero con ejercicios básicos de equilibrio,
                postura y deslizamiento. Este nivel está diseñado para construir una base sólida en el patinaje,
                ideal para niños y adultos sin experiencia previa.
              </p>

                <div className="nivel-leer-mas">
                  <Link to="/Novato">Leer más</Link>
                </div>

            </div>
          </div>

          <div className="nivel avanzado">

            <div className="nivel-button">

              <a href="/Avanzado">
                <span>Avanzado</span>
              </a>

            </div>

            <div className="nivel-info">

              <p>
                Desarrolla tu técnica, velocidad y precisión. Aquí perfeccionamos giros, frenados, y maniobras más
                complejas, preparando a los patinadores para competencias o entrenamientos exigentes. Proyección
                a selección Tolima.
              </p>

                <div className="nivel-leer-mas">
                  <Link to="/avanzado">Leer más</Link>
                </div>

            </div>
          </div>

          <div className="nivel adultos">

            <div className="nivel-button">

              <a href='/Adultos'>
                <span>Adultos</span>
              </a>
            </div>

            <div className="nivel-info">

              <p>
                Un espacio seguro y motivador para adultos que desean aprender, retomar o mantenerse activos
                mediante el patinaje. Adaptamos el ritmo según tus necesidades y objetivos personales.
              </p>
                <div className="nivel-leer-mas">
                  <Link to="/Adultos">Leer más</Link>
                </div>

            </div>
          </div>
          
        </div>

      </section>
*/}
      {/* Registro 
      <section className="registro-split">

        <div className="registro-left">
            
          <img src={eventosImg} alt="Registro Niños Patinaje" />
        
        </div>
            
        <div className="registro-right">

          <a href='/registrate'>
            <button className="registro-btn">¡Regístrate ya!</button>
          </a>
        </div>

      </section>


*/}
      


    
      {/* Eventos */}
      <EventosCarousel variant="page" />



     {/* Links */}
    <section className="links">
      <Link to="/resoluciones" className="resoluciones">Resoluciones</Link>
      <Link to="/boletines" className="guias">Boletines</Link>
    </section>
    
    {/* Dónde entrenamos */}
    <section className="training-location">
      <div className="training-content">

        <h2>¿Dónde entrenamos?</h2>

        <div className="training-grid">
          
          {/* Left: Map */}
          <div className="training-map">
            <iframe
              title="Ubicación entrenamientos"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.91380258534!2d-75.18776357173918!3d4.427157956526538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c53c023ec02f%3A0x146a5207c779b5ea!2sIbague%20Sports%20Park!5e0!3m2!1sen!2sus!4v1770525226759!5m2!1sen!2sus"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right: Info */}
          <div className="training-info">
            <p>
              Nuestros entrenamientos se realizan en diferentes escenarios deportivos
              de <strong>Ibagué</strong>, adecuados para cada modalidad.
            </p>

            <ul>
              <li><strong>📍 Lugar:</strong> Escenarios deportivos de Ibagué</li>
              <li><strong>🕒 Horarios:</strong> Según categoría y modalidad</li>
              <li><strong>👶 Edades:</strong> Niños, jóvenes y adultos</li>
              <li><strong>🛼 Modalidades:</strong> Carreras, Artístico, Hockey</li>
            </ul>

            <p className="training-note">
              Para conocer horarios exactos y puntos de entrenamiento,
              comunícate con nosotros o regístrate.
            </p>
          </div>

        </div>
      </div>
    </section>



      {/* Aliados */}
      <section className="aliados" id="aliados">
        <h1>Nuestros Aliados</h1>
        <Aliados />
      </section>


      {/* Footer */}


    </div>

          <FooterTol/>


  </div>

);
}