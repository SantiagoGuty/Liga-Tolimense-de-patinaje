
import '../styles/Home.css';
import '../styles/menu.css';
import { useEffect, useRef, useState } from 'react';
import logo from '../assets/img/logo.png';




export default function Menu_bar() {

      const [menuOpen, setMenuOpen] = useState(false);
      const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
        
    }, []);
    

    

  return (

    <>

    <div className="header">

      <div className="logo">

        <img src={logo} alt="Logo" />

      </div>

      {/* Desktop Menu visible in big screens +1024px*/}
      <nav className="menu-desktop">

        <a href="/">Inicio</a>
         <div className="dropdown">
          <a href="#cursos">Cursos ▾</a>
          <div className="dropdown-content">
            <a href="#novato">Novato</a>
            <a href="#avanzado">Avanzado</a>
            <a href="#adultos">Adultos</a>
          </div>
        </div>

        <div className="dropdown">
          <a href="#modalidades">Modalidades ▾</a>
          <div className="dropdown-content">
            <a href="#carreras">Carreras</a>
            <a href="#artistico">Artístico</a>
            <a href="#hockey">Hockey</a>
        </div>
        </div>
        <a href="/Noticias">Noticias</a>
        <a href="/Eventos">Eventos</a>
        <a href="/resoluciones">Resoluciones</a>
        <a href="/guias">Guias</a>
        <a href="#membresia">Membresia</a>
        <a href="#inicia_sesion">Inicia sesion</a>


      </nav>

      {/* Mobile Burger */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>

      <button
        className={`menu-button ${menuOpen ? 'opened' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Main Menu"
        aria-expanded={menuOpen}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
          <path className="line line2" d="M 20,50 H 80" />
          <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
        </svg>
      </button>


      </div>

    </div>

    <nav className={`menu-mobile ${menuOpen ? 'open' : ''}`}>

  <a href="/#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>

      <details>
        <summary>Modalidades</summary>
        <a href="#carreras" onClick={() => setMenuOpen(false)}>Carreras</a>
        <a href="#artistico" onClick={() => setMenuOpen(false)}>Artístico</a>
        <a href="#hockey" onClick={() => setMenuOpen(false)}>Hockey</a>
      </details>

      <details>
        <summary>Cursos</summary>
        <a href="#registro" onClick={() => setMenuOpen(false)}>Registrate ya!</a>
        <a href="#novato" onClick={() => setMenuOpen(false)}>Novato</a>
        <a href="#avanzado" onClick={() => setMenuOpen(false)}>Avanzado</a>
        <a href="#adultos" onClick={() => setMenuOpen(false)}>Adultos</a>
      </details>

      <a href="#noticias" onClick={() => setMenuOpen(false)}>Noticias</a>
      <a href="/Eventos" onClick={() => setMenuOpen(false)}>Eventos</a>
      <a href="#resoluciones" onClick={() => setMenuOpen(false)}>Resoluciones</a>
      <a href="#guias" onClick={() => setMenuOpen(false)}>Guias</a>
      <a href="#membresia" onClick={() => setMenuOpen(false)}>Membresia</a>
      <a href="#inicia_sesion" onClick={() => setMenuOpen(false)}>Inicia Sesión</a>
    </nav>

    </>


  );
}
