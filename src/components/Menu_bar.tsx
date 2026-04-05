// src/components/Menu_bar.tsx
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../styles/menu.css';
import logo from '../assets/img/logo_solo.png';

import { currentUser } from '../services/authService';
import { getCurrentUserProfile, createCurrentUserProfile } from '../services/userProfile';
import { getAvatarUrl } from '../services/storageService';
import { getGroups } from '../services/roles';

// ─── Module-level profile cache ───────────────────────────────────────────────
// Persists across route changes (page navigations don't unmount+remount this
// module). Keyed by userId so it auto-invalidates on login/logout.
type ProfileCache = {
  userId: string;
  isAdminGroup: boolean;
  initials: string;
  avatarUrl: string | null;
};

let _profileCache: ProfileCache | null = null;

/** Call this after sign-out so the next mount re-fetches fresh data. */
export function clearMenuCache() {
  _profileCache = null;
}
// ─────────────────────────────────────────────────────────────────────────────

function deriveNameFromEmail(email: string | undefined) {
  if (!email) return { nombre: 'Usuario', apellido: 'Liga' };
  const left = email.split('@')[0] || '';
  const cleaned = left.replace(/[._-]+/g, ' ').trim();
  const parts = cleaned.split(' ').filter(Boolean);
  return {
    nombre:   (parts[0] || 'Usuario').slice(0, 40),
    apellido: (parts.slice(1).join(' ') || 'Liga').slice(0, 40),
  };
}

export default function Menu_bar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [isAuthed, setIsAuthed]       = useState(false);
  const [isAdminGroup, setIsAdminGroup] = useState(false);
  const [avatarUrl, setAvatarUrl]     = useState<string | null>(null);
  const [initials, setInitials]       = useState<string>('');

  const headerRef     = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const location      = useLocation();

  const createdProfileOnceRef = useRef(false);

  useEffect(() => {
    (async () => {
      const u = await currentUser().catch(() => null);
      const authed = !!u;
      setIsAuthed(authed);

      if (!authed) {
        // Clear everything, including the cache
        _profileCache = null;
        setIsAdminGroup(false);
        setAvatarUrl(null);
        setInitials('');
        createdProfileOnceRef.current = false;
        return;
      }

      // Stable user identifier
      const userId: string =
        (u as any)?.userId ||
        (u as any)?.username ||
        (u as any)?.signInDetails?.loginId ||
        '';

      // ── Cache hit: apply instantly, skip all network calls ──
      if (_profileCache && _profileCache.userId === userId) {
        setIsAdminGroup(_profileCache.isAdminGroup);
        setInitials(_profileCache.initials);
        setAvatarUrl(_profileCache.avatarUrl);
        return;
      }

      // ── Cache miss: fetch everything, then store ──
      let admin = false;
      try {
        const groups = await getGroups();
        admin = groups.includes('Admins');
        setIsAdminGroup(admin);
      } catch {
        setIsAdminGroup(false);
      }

      let inits    = 'SG';
      let url: string | null = null;

      try {
        let p = await getCurrentUserProfile();

        if (!p && !createdProfileOnceRef.current) {
          const emailGuess =
            (u as any)?.signInDetails?.loginId ||
            (u as any)?.username ||
            '';
          // Skip auto-create for federated users (username has no @)
          // They need to complete their profile via /registrate
          const isRealEmail = typeof emailGuess === 'string' && emailGuess.includes('@');
          if (isRealEmail) {
            createdProfileOnceRef.current = true;
            const { nombre, apellido } = deriveNameFromEmail(emailGuess);
            p = await createCurrentUserProfile({
              nombre,
              apellido,
              correo: emailGuess,
              estatus: 'ACTIVO',
              permiso: admin ? 'ADMIN' : 'USUARIO',
            }).catch(() => null);
          }
        }

        inits = (
          (p?.nombre?.[0] || '').toUpperCase() +
          (p?.apellido?.[0] || '').toUpperCase()
        ) || 'SG';

        if (p?.avatarKey) {
          url = await getAvatarUrl(p.avatarKey).then(u => u.toString()).catch(() => null);
        }
      } catch {
        /* keep defaults */
      }

      setInitials(inits);
      setAvatarUrl(url);

      // Store in cache for all subsequent navigations
      _profileCache = { userId, isAdminGroup: admin, initials: inits, avatarUrl: url };
    })();
  }, [location.pathname]); // menuOpen removed — auth state doesn't change on menu open/close

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuOpen &&
        !headerRef.current?.contains(target) &&
        !mobileMenuRef.current?.contains(target)
      ) {
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

          {isAuthed && (
            <Link to="/perfil" className="profile-thumb" aria-label="Ir a perfil" title="Mi perfil">
              {avatarUrl
                ? <img src={avatarUrl} alt="Foto de perfil" />
                : <span className="initials">{initials || 'SG'}</span>
              }
            </Link>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="menu-desktop">
          <Link to="/">Inicio</Link>

          {isAuthed && isAdminGroup && (
            <div className="dropdown">
              <a type="button" className="dropdown-trigger">Admin ▾</a>
              <div className="dropdown-content">
                <Link to="/admin/usuarios">Usuarios</Link>
                <Link to="/admin/resoluciones">Subir Resoluciones</Link>
                <Link to="/admin/boletines">Subir Boletines</Link>
              </div>
            </div>
          )}

          <div className="dropdown">
            <a type="button" className="dropdown-trigger">Modalidades ▾</a>
            <div className="dropdown-content">
              <Link to="/carreras">Carreras</Link>
              <Link to="/artistico">Artístico</Link>
            </div>
          </div>

          <Link to="/Noticias">Noticias</Link>
          <Link to="/Eventos">Eventos</Link>
          <Link to="/resoluciones">Resoluciones</Link>
          <Link to="/boletines">Boletines</Link>

          {!isAuthed && (
            <>
              <Link to="/iniciasesion">Iniciar sesión</Link>
              <Link to="/registrate">Crear usuario</Link>
            </>
          )}

          <Link to="/privacidad" className="nav-legal-link">Privacidad</Link>
        </nav>

        {/* Mobile burger */}
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

      {/* Mobile nav */}
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

        {isAuthed && isAdminGroup && (
          <details>
            <summary>Admin</summary>
            <Link to="/admin/usuarios" onClick={() => setMenuOpen(false)}>Usuarios</Link>
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

        <Link to="/privacidad" onClick={() => setMenuOpen(false)}>Política de Privacidad</Link>
      </nav>
    </>
  );
}
