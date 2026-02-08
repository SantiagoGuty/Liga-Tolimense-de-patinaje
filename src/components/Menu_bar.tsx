// src/components/Menu_bar.tsx
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/menu.css';
import logo from '../assets/img/logo_solo.png';

// Auth + profile helpers
import { currentUser } from '../services/authService';
import {
  getCurrentUserProfile,
  createCurrentUserProfile,
} from '../services/userProfile';
import { getAvatarUrl } from '../services/storageService';
import { getGroups } from '../services/roles';

function deriveNameFromEmail(email: string | undefined) {
  if (!email) return { nombre: 'Usuario', apellido: 'Liga' };
  const left = email.split('@')[0] || '';
  const cleaned = left.replace(/[._-]+/g, ' ').trim();
  const parts = cleaned.split(' ').filter(Boolean);
  const nombre = (parts[0] || 'Usuario').slice(0, 40);
  const apellido = (parts.slice(1).join(' ') || 'Liga').slice(0, 40);
  return { nombre, apellido };
}

export default function Menu_bar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const [isAdminGroup, setIsAdminGroup] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>('');

  const headerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // prevent repeated create attempts in a single session
  const createdProfileOnceRef = useRef(false);

  useEffect(() => {
    (async () => {
      const u = await currentUser().catch(() => null);
      const authed = !!u;
      setIsAuthed(authed);

      if (!authed) {
        setIsAdminGroup(false);
        setAvatarUrl(null);
        setInitials('');
        createdProfileOnceRef.current = false;
        return;
      }

      // 1) groups/role
      try {
        const groups = await getGroups();
        const admin = groups.includes('Admins');
        setIsAdminGroup(admin);

        // Debug if you want:
        // console.log('GROUPS:', groups);
      } catch {
        setIsAdminGroup(false);
      }

      // 2) profile + avatar
      try {
        let p = await getCurrentUserProfile();

        // If no profile exists, auto-create one ONCE
        if (!p && !createdProfileOnceRef.current) {
          createdProfileOnceRef.current = true;

          // Try to derive from Cognito email (your authService likely returns something)
          // If not available, it will fallback
          const emailGuess =
            (u as any)?.signInDetails?.loginId ||
            (u as any)?.username ||
            undefined;

          const { nombre, apellido } = deriveNameFromEmail(emailGuess);

          p = await createCurrentUserProfile({
            nombre,
            apellido,
            correo: typeof emailGuess === 'string' ? emailGuess : '',
            estatus: 'ACTIVO',
            permiso: isAdminGroup ? 'ADMIN' : 'USUARIO',
          }).catch(() => null);
        }

        const inits =
          ((p?.nombre?.[0] || '').toUpperCase() +
            (p?.apellido?.[0] || '').toUpperCase()) || 'SG';
        setInitials(inits);

        if (p?.avatarKey) {
          try {
            const url = await getAvatarUrl(p.avatarKey);
            setAvatarUrl(url.toString());
          } catch {
            setAvatarUrl(null);
          }
        } else {
          setAvatarUrl(null);
        }
      } catch {
        // keep menu usable even if profile fails
        setAvatarUrl(null);
        setInitials('SG');
      }
    })();
  }, [location.pathname, menuOpen]);

  // Close mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideHeader = headerRef.current?.contains(target);
      const clickedInsideMobile = mobileMenuRef.current?.contains(target);
      if (menuOpen && !clickedInsideHeader && !clickedInsideMobile) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Close on ESC
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <>
      <div className="header" ref={headerRef}>
        <div className="header-left">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>

          {/* Avatar next to logo when authenticated */}
          {isAuthed && (
            <Link
              to="/perfil"
              className="profile-thumb"
              aria-label="Ir a perfil"
              title="Mi perfil"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Foto de perfil" />
              ) : (
                <span className="initials">{initials || 'SG'}</span>
              )}
            </Link>
          )}
        </div>

        {/* Desktop Menu */}
        <nav className="menu-desktop">
          <Link to="/">Inicio</Link>

          {/* ✅ ADMIN MENU (desktop) */}
          {isAuthed && isAdminGroup && (
            <div className="dropdown">
              <a type="button" className="dropdown-trigger">
                Admin ▾
              </a>
              <div className="dropdown-content">
                <Link to="/admin/usuarios">Usuarios</Link>
                <Link to="/admin/practicas">Prácticas</Link>
                <Link to="/admin/resoluciones">Subir Resoluciones</Link>
                <Link to="/admin/boletines">Subir Boletines</Link>
              </div>
            </div>
          )}
          
          <div className="dropdown">
            <a type="button" className="dropdown-trigger">
              Modalidades ▾
            </a>
            <div className="dropdown-content">
              <Link to="/carreras">Carreras</Link>
              <Link to="/artistico">Artístico</Link>
            </div>
          </div>

          <Link to="/Noticias">Noticias</Link>
          <Link to="/Eventos">Eventos</Link>
          <Link to="/resoluciones">Resoluciones</Link>
          <Link to="/boletines">Boletines</Link>

  {/* sign in 
          {!isAuthed && (
            <>
              <Link to="/iniciasesion">Iniciar sesión</Link>
              <Link to="/registrate">Crear usuario</Link>
            </>
          )}*/}
        </nav>

        {/* Mobile Burger */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <a
            className={`menu-button ${menuOpen ? 'opened' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Main Menu"
            aria-expanded={menuOpen}
            type="button"
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
              <path className="line line2" d="M 20,50 H 80" />
              <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav ref={mobileMenuRef} className={`menu-mobile ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>

        <details>
          <summary>Modalidades</summary>
          <Link to="/carreras" onClick={() => setMenuOpen(false)}>Carreras</Link>
          <Link to="/artistico" onClick={() => setMenuOpen(false)}>Artístico</Link>
        </details>

        <Link to="/Noticias" onClick={() => setMenuOpen(false)}>Noticias</Link>
        <Link to="/Eventos" onClick={() => setMenuOpen(false)}>Eventos</Link>
        <Link to="/resoluciones" onClick={() => setMenuOpen(false)}>Resoluciones</Link>
        <Link to="/boletines" onClick={() => setMenuOpen(false)}>Boletines</Link>

        {/* ✅ ADMIN MENU (mobile) */}
        {isAuthed && isAdminGroup && (
          <details>
            <summary>Admin</summary>
            <Link to="/admin/usuarios" onClick={() => setMenuOpen(false)}>Usuarios</Link>
            <Link to="/admin/practicas" onClick={() => setMenuOpen(false)}>Prácticas</Link>
            <Link to="/admin/resoluciones" onClick={() => setMenuOpen(false)}>Subir Resoluciones</Link>
            <Link to="/admin/boletines" onClick={() => setMenuOpen(false)}>Subir Boletines</Link>
          </details>
        )}

        {!isAuthed && (
          <>
            <Link to="/iniciasesion" onClick={() => setMenuOpen(false)}>Inicia sesión</Link>
            <Link to="/registrate" onClick={() => setMenuOpen(false)}>Crear usuario</Link>
          </>
        )}
      </nav>
    </>
  );
}
