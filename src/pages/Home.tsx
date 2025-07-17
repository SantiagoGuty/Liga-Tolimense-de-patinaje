import '../styles/home.css';
//import patinador from '../assets/img/foto_portada.jpg';
//import noticiasImg from '../assets/img/09052025-_DSC0334.jpg';
import eventosImg from '../assets/img/festibal1.jpg';
//import patinadora from '../assets/img/arias_patinadora.jpg';
import campeon from '../assets/img/campeon.jpg';


import accion_2 from '../assets/img/accion2.jpg';
import accion_4 from '../assets/img/accion4.jpg';
import seleccion1 from '../assets/img/seleccion1.jpg';
import artistico1 from '../assets/img/artistico1.jpg';
import premiacion1 from '../assets/img/premiacion1.jpg';


import Menu_bar from '../components/Menu_bar';
import Aliados from '../components/Aliados';
import FooterTol from '../components/FooterTol';
import EventosCarousel from '../components/EventosCarousel';


import { useEffect, useState } from 'react';


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

          <h2>Liga Tolimense <br></br>de patinaje</h2>

        </div>

      </div>



    
      {/* Noticias */}
      <div className="noticias" id="noticias">

        <h1>Noticias</h1>

        <div className="news-cards-container">

          <div className="news-card">

            <img src={seleccion1} alt="Noticia 1" />
            
            <div className="news-card-content">

                <h3>¡Tolima abraza el oro!</h3>
                <p>La selección tolimense acaba de terminar una jornada histórica en Cartagena...</p>
                <a href="/noticia-1">Leer más</a>

            </div>
          </div>

          <div className="news-card">

              <img src={premiacion1} alt="Noticia 2" />

              <div className="news-card-content">

                <h3>Nuevo curso de patinaje en Ibagué</h3>
                <p>Inscripciones abiertas para todas las edades y niveles.</p>
                <a href="/noticia-2">Leer más</a>

              </div>
          </div>

          <div className="news-card">
            
            <img src={artistico1} alt="Noticia 3" />

            <div className="news-card-content">

              <h3>Convocatoria abierta</h3>
              <p>La Liga Tolimense invita a clubes a participar en la copa regional 2025.</p>
              <a href="/noticia-3">Leer más</a>
            </div>
          </div>

        </div>
      </div>



      <section className="cursos">

        <div className="cursos_titulos">
          <h1>¡Únete a nuestros cursos!</h1>
          <p>Desde tus primeras lecciones hasta proyección profesional ¡no importa tu edad!</p>
        </div>
        
        <div className="niveles">

          <div className="nivel novato">
                
            <div className="nivel-button">

              <span>Novato</span>

            </div>
          
            <div className="nivel-info">

              <p>
                Ideal para quienes empiezan desde cero. Aprende desde cero con ejercicios básicos de equilibrio,
                postura y deslizamiento. Este nivel está diseñado para construir una base sólida en el patinaje,
                ideal para niños y adultos sin experiencia previa.
              </p>

              <div className='nivel-leer-mas'>
                <a href="/noticia-3">Leer más</a>
              </div>

            </div>
          </div>

          <div className="nivel avanzado">

            <div className="nivel-button">

              <span>Avanzado</span>
            
            </div>

            <div className="nivel-info">

              <p>
                Desarrolla tu técnica, velocidad y precisión. Aquí perfeccionamos giros, frenados, y maniobras más
                complejas, preparando a los patinadores para competencias o entrenamientos exigentes. Proyección
                a selección Tolima.
              </p>

              <div className='nivel-leer-mas'>
                <a href="/noticia-3">Leer más</a>
              </div>

            </div>
          </div>

          <div className="nivel adultos">

            <div className="nivel-button">

              <span>Adultos</span>

            </div>

            <div className="nivel-info">

              <p>
                Un espacio seguro y motivador para adultos que desean aprender, retomar o mantenerse activos
                mediante el patinaje. Adaptamos el ritmo según tus necesidades y objetivos personales.
              </p>
              <div className='nivel-leer-mas'>
                <a href="/noticia-3">Leer más</a>
              </div>

            </div>
          </div>
          
        </div>

      </section>


      <section className="registro-split">

        <div className="registro-left">
            
          <img src={eventosImg} alt="Registro Niños Patinaje" />
        
        </div>
            
        <div className="registro-right">

          <button className="registro-btn">¡Regístrate ya!</button>
        
        </div>

      </section>



      {/* Aliados */}
      <EventosCarousel/>



      {/* Links */}
      <section className="links">

        <button className="resoluciones">Resoluciones</button>
        <button className="guias">Guías</button>

      </section>


      {/* Aliados */}
      <section className="aliados" id="aliados">
        <h1>Nuestros Aliados</h1>
        <Aliados />
      </section>


      {/* Footer */}
      <FooterTol/>


    </div>

  </div>

);
}