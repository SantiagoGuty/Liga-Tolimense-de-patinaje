import '../styles/Home.css';
//import patinador from '../assets/img/foto_portada.jpg';
import noticiasImg from '../assets/img/09052025-_DSC0334.jpg';
import eventosImg from '../assets/img/festibal1.jpg';
//import patinadora from '../assets/img/arias_patinadora.jpg';
import campeon from '../assets/img/campeon.jpg';
import accion_1 from '../assets/img/accion1.jpg';
import accion_2 from '../assets/img/accion2.jpg';
import accion_4 from '../assets/img/accion4.jpg';
import seleccion1 from '../assets/img/seleccion1.jpg';
import artistico1 from '../assets/img/artistico1.jpg';
import premiacion1 from '../assets/img/premiacion1.jpg';


import Aliados from '../components/Aliados';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';


import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
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

        <h1>¡Únete a nuestros cursos!</h1>
        <p>Desde tus primeras lecciones hasta proyección profesional ¡no importa tu edad!</p>
        
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




      {/*Eventos*/}
      <section className="eventos" id="eventos">
      
        <h2>Próximos eventos</h2>

        <div className="noticias-carousel-wrapper eventos-carousel-wrapper">

          <CCarousel controls indicators transition="crossfade" interval={5000}>

            <CCarouselItem>

              <CImage className="noticia-img" src={accion_1} alt="Evento 1" />
              
              <CCarouselCaption>

                <h5>Interclubes Medellin 2025</h5>
                <p>La selección tolimense acaba de terminar una jornada histórica en Cartagena...</p>

              </CCarouselCaption>

            </CCarouselItem>

            <CCarouselItem>

              <CImage className="noticia-img" src={accion_2} alt="Evento 2" />
              
              <CCarouselCaption>

                <h5>Festibal juvenil Honda 2025</h5>
                <p>Prepárate para competir en el evento más esperado del año en Ibagué.</p>

              </CCarouselCaption>

            </CCarouselItem>

            <CCarouselItem>
                  
              <CImage className="noticia-img" src={noticiasImg} alt="Evento 3" />
              
              <CCarouselCaption>

                <h5>Interligas Ibague 2025</h5>
                <p>No te quedes por fuera del próximo torneo de patinaje del 2025.</p>

              </CCarouselCaption>
              
            </CCarouselItem>

          </CCarousel>
        </div>
      </section>


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