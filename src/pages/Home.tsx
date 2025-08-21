import '../styles/home.css';
//import patinador from '../assets/img/foto_portada.jpg';
//import noticiasImg from '../assets/img/09052025-_DSC0334.jpg';
import eventosImg from '../assets/img/festibal1.jpg';
//import patinadora from '../assets/img/arias_patinadora.jpg';
import campeon from '../assets/img/campeon.jpg';


import accion_2 from '../assets/img/accion2.jpg';
import accion_4 from '../assets/img/accion4.jpg';
import artistico1 from '../assets/img/artistico1.jpg';


import Menu_bar from '../components/Menu_bar';
import Aliados from '../components/Aliados';
import FooterTol from '../components/FooterTol';
import EventosCarousel from '../components/EventosCarousel';
import NoticiasSection from '../components/NoticiasSection';


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

          <h2>Liga Tolimense <br></br>de patinaje</h2>

        </div>

      </div>



    
      {/* Noticias */}
      <NoticiasSection title="Noticias" limit={3} />



      {/* Cursos */}
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

                <div className="nivel-leer-mas">
                  <Link to="/Novato">Leer más</Link>
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

                <div className="nivel-leer-mas">
                  <Link to="/avanzado">Leer más</Link>
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
                <div className="nivel-leer-mas">
                  <Link to="/Adultos">Leer más</Link>
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

          <a href='/registrate'>
            <button className="registro-btn">¡Regístrate ya!</button>
          </a>
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


    </div>

          <FooterTol/>


  </div>

);
}