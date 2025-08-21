// src/components/Menu_bar.tsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/menu.css';
import logo from '../assets/img/logo.png';



export default function Menu_bar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null); // NEW


  useEffect(() => {
   const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideHeader = headerRef.current?.contains(target);
      const clickedInsideMobile = mobileMenuRef.current?.contains(target); // NEW
      if (menuOpen && !clickedInsideHeader && !clickedInsideMobile) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);


  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <>
      <div className="header" ref={headerRef}>
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>

        {/* Desktop Menu */}

        <nav className="menu-desktop">

        {/* Client‑side navigation using <Link> */}
          <Link to="/">Inicio</Link>

          <div className="dropdown">
            <Link to="/cursos">Cursos ▾</Link>
            <div className="dropdown-content">
              <a href="/Registrate">¡Regístrate ya!</a>
              <a href="/novato">Novato</a>
              <a href="/avanzado">Avanzado</a>
              <a href="/adultos">Adultos</a>
            </div>
          </div>

          <div className="dropdown">
            <Link to="/modalidades">Modalidades ▾</Link>
            <div className="dropdown-content">
              <a href="/carreras">Carreras</a>
              <a href="/artistico">Artístico</a>
            </div>
          </div>

          <Link to="/Noticias">Noticias</Link>
          <Link to="/Eventos">Eventos</Link>
          <Link to="/resoluciones">Resoluciones</Link>
          <Link to="/guias">Guías</Link>
          <Link to="/iniciasesion">Iniciar sesión</Link>
          <Link to="/registrate">Crear usuario</Link>
          <Link to="/perfil">Perfil</Link>
          <Link to="/usuarios">Lista</Link>
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

    <nav
        ref={mobileMenuRef}
        className={`menu-mobile ${menuOpen ? 'open' : ''}`}
      >
        <Link to="/#inicio" onClick={() => setMenuOpen(false)}>Inicio</Link>

        <details>
          <summary>Modalidades</summary>
          <Link to="/carreras"  onClick={() => setMenuOpen(false)}>Carreras</Link>
          <Link to="/artistico" onClick={() => setMenuOpen(false)}>Artístico</Link>
        </details>

        <details>
          <summary>Cursos</summary>
          <Link to="/Registrate" onClick={() => setMenuOpen(false)}>¡Regístrate ya!</Link>
          <Link to="/novato"     onClick={() => setMenuOpen(false)}>Novato</Link>
          <Link to="/avanzado"   onClick={() => setMenuOpen(false)}>Avanzado</Link>
          <Link to="/adultos"    onClick={() => setMenuOpen(false)}>Adultos</Link>
        </details>

      <Link to="/Noticias" onClick={() => setMenuOpen(false)}>Noticias</Link>
      <Link to="/Eventos" onClick={() => setMenuOpen(false)}>Eventos</Link>
      <Link to="/resoluciones" onClick={() => setMenuOpen(false)}>Resoluciones</Link>
      <Link to="/guias" onClick={() => setMenuOpen(false)}>Guias</Link>
      <Link to="/membresia" onClick={() => setMenuOpen(false)}>Membresia</Link>
      <Link to="/inicia_sesion" onClick={() => setMenuOpen(false)}>Inicia Sesión</Link>
    </nav>

    </>


  );
}