// src/pages/Perfil.tsx
import { useEffect, useState } from 'react';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import { getCurrentUserProfile, updateCurrentUserAvatar, saveCurrentUserQr } from '../services/userProfile';
import { uploadAvatar, getAvatarUrl } from '../services/storageService';
import { uploadProtected, getProtectedUrl } from '../services/storageService';
import { makeQrPngBlob } from '../services/qrService';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import '../styles/perfil.css';

export default function Perfil() {
  const nav = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [qrBusy, setQrBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const p = await getCurrentUserProfile();
        if (!p) { nav('/crear-perfil', { replace: true }); return; }
        setProfile(p);

        // Avatar
        if (p.avatarKey) {
          try { const url = await getAvatarUrl(p.avatarKey); setAvatarUrl(url.toString()); } catch {}
        }

        // QR: if exists -> fetch; else -> generate once
        if (p.qrKey) {
          try {
            const url = await getProtectedUrl(p.qrKey);
            setQrUrl(url.toString());
          } catch {}
        } else {
          await generateAndSaveQr(p); // create now
        }
      } catch (e: any) {
        setError(e.message || 'No se pudo cargar el perfil');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nav]);

  async function generateAndSaveQr(p: any) {
    try {
      setQrBusy(true);
      // Minimal, non-PII payload
      const payloadObj = { u: p.id, v: 1 };
      const payload = JSON.stringify(payloadObj);

      const blob = await makeQrPngBlob(payload, 640);
      const key = `qrcodes/${p.id}.png`;

      await uploadProtected(key, blob, 'image/png');
      await saveCurrentUserQr(key, payload);

      const url = await getProtectedUrl(key);
      setQrUrl(url.toString());

      // reflect in local profile state
      setProfile((prev: any) => ({ ...prev, qrKey: key, qrPayload: payload }));
    } catch (err: any) {
      setError(err?.message || 'No se pudo generar el código QR');
    } finally {
      setQrBusy(false);
    }
  }

  async function handlePickFile() {
    (document.getElementById('avatar-input') as HTMLInputElement)?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const key = await uploadAvatar(file);
      const updated = await updateCurrentUserAvatar(key);
      setProfile((prev: any) => ({ ...prev, avatarKey: updated.avatarKey }));
      const url = await getAvatarUrl(updated.avatarKey);
      setAvatarUrl(url.toString());
    } catch (err: any) {
      setError(err?.message || 'No se pudo subir la foto');
    } finally {
      setUploading(false);
      (e.target as HTMLInputElement).value = '';
    }
  }

  async function handleLogout() {
    try { await logout(); }
    finally { nav('/', { replace: true }); }
  }

  if (error) return <div style={{ padding: 16, color: 'red' }}>{error}</div>;
  if (!profile) return null;

  const initials =
    (profile?.nombre?.[0] || '').toUpperCase() +
    (profile?.apellido?.[0] || '').toUpperCase();

  return (
    <div className="page-wrapper profile-page">
      <Menu_bar />

      <div className="main-content">
        <section className="profile-card" aria-labelledby="profile-title">
          <div className="profile__header">
            <h1 id="profile-title" className="profile__title">Perfil Liga Tolimense</h1>

            {/* Avatar + QR side-by-side */}
            <div className="profile__media">
              <div className="profile__avatar" aria-label="Foto de perfil">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Foto de perfil" />
                ) : (
                  <div className="profile__initials">{initials || '🙂'}</div>
                )}
              </div>

              <div className="profile__qr" aria-label="Mi código QR">
                {qrUrl ? (
                  <img src={qrUrl} alt="Código QR de miembro" />
                ) : (
                  <span style={{ color:'#f6c200', fontWeight:800 }}>
                    {qrBusy ? 'Generando QR…' : 'QR no disponible'}
                  </span>
                )}
              </div>
            </div>

            {/* Hidden input + actions */}
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Details */}
          <div className="profile__details">
            <ul>
              <li><span className="label">Nombre:</span><span className="value">{profile.nombre} {profile.apellido}</span></li>
              <li><span className="label">Correo:</span><span className="value">{profile.correo}</span></li>
              <li><span className="label">Teléfono:</span><span className="value">{profile.telefono || '—'}</span></li>
              <li><span className="label">Fecha de nacimiento:</span><span className="value">{profile.fechaNacimiento || '—'}</span></li>
              <li><span className="label">Sexo:</span><span className="value">{profile.sexo || '—'}</span></li>
              <li><span className="label">Cédula:</span><span className="value">{profile.cedula || '—'}</span></li>
            </ul>
          </div>

          <div className="profile__actions">
            <button
              className="btn btn--primary"
              type="button"
              onClick={handlePickFile}
              disabled={uploading}
              aria-busy={uploading}
            >
              {uploading ? 'Subiendo…' : 'Cambiar foto'}
            </button>

            <button
              className="btn btn--secondary"
              type="button"
              onClick={() => nav('/editar-perfil')}
            >
              Editar perfil
            </button>

            <button
              className="btn btn--secondary"
              type="button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>

            {/* Optional: force re-generate QR */}
            {!profile.qrKey && (
              <button
                className="btn btn--secondary"
                type="button"
                onClick={() => generateAndSaveQr(profile)}
                disabled={qrBusy}
              >
                {qrBusy ? 'Generando…' : 'Generar QR'}
              </button>
            )}
          </div>
        </section>
      </div>

      <FooterTol />
    </div>
  );
}
