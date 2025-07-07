
import '../styles/Home.css';
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
        <a href="#escuela">Escuela</a>
        <a href="#artistico">Artístico</a>
        <a href="#carreras">Carreras</a>
        <a href="/Noticias">Noticias</a>
        <a href="#resoluciones">Resoluciones</a>
        <a href="/Eventos">Eventos</a>
        <a href="#resultados">Resultados</a>
        <a href="#recursos">Recursos</a>
        <a href="#pagos">Pagos</a>

      </nav>

      {/* Mobile Burger */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>

        <div className="bar" />
        <div className="bar" />
        <div className="bar" />

      </div>

    </div>

    <nav className={`menu-mobile ${menuOpen ? 'open' : ''}`}>

      <a href="/#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
      <a href="#escuela" onClick={() => setMenuOpen(false)}>Escuela</a>
      <a href="#artistico" onClick={() => setMenuOpen(false)}>Artístico</a>
      <a href="#carreras" onClick={() => setMenuOpen(false)}>Carreras</a>
      <a href="#noticias" onClick={() => setMenuOpen(false)}>Noticias</a>
      <a href="#resoluciones" onClick={() => setMenuOpen(false)}>Resoluciones</a>
      <a href="/Eventos" onClick={() => setMenuOpen(false)}>Eventos</a>
      <a href="#resultados" onClick={() => setMenuOpen(false)}>Resultados</a>
      <a href="#recursos" onClick={() => setMenuOpen(false)}>Recursos</a>
      <a href="#pagos" onClick={() => setMenuOpen(false)}>Pagos</a>
      
    </nav>
    </>


  );
}
