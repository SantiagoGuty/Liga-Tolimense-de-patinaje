import { useEffect, useState, type FormEvent } from 'react';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import { signOut } from 'aws-amplify/auth';
import { deleteUser } from 'aws-amplify/auth';
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  updateCurrentUserAvatar,
  deleteCurrentUserProfile, // ⬅️ nuevo
} from '../services/userProfile';
import { uploadAvatar, getAvatarUrl } from '../services/storageService';
import { useNavigate } from 'react-router-dom';
import '../styles/perfil.css'; // reuse styles

export default function EditarPerfil() {
  const nav = useNavigate();
  const [form, setForm] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const p = await getCurrentUserProfile();
        if (!p) { nav('/crear-perfil', { replace: true }); return; }
        setForm({
          nombre: p.nombre || '',
          apellido: p.apellido || '',
          correo: p.correo || '',
          telefono: p.telefono || '',
          fechaNacimiento: p.fechaNacimiento || '',
          sexo: p.sexo || '',
          cedula: p.cedula || '',
          permiso: p.permiso || '',
          estatus: p.estatus || '',
          avatarKey: p.avatarKey || '',
        });
        if (p.avatarKey) {
          try {
            const url = await getAvatarUrl(p.avatarKey);
            setAvatarUrl(url.toString());
          } catch {
            /* ignore */
          }
        }
      } catch (e: any) {
        setError(e.message || 'No se pudo cargar el perfil');
      }
    })();
  }, [nav]);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onPickAvatar() {
    (document.getElementById('edit-avatar-input') as HTMLInputElement)?.click();
  }

  async function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    setSaving(true); setError('');
    try {
      const key = await uploadAvatar(f);
      await updateCurrentUserAvatar(key);
      const url = await getAvatarUrl(key);
      setForm((prev: any) => ({ ...prev, avatarKey: key }));
      setAvatarUrl(url.toString());
    } catch (err: any) {
      setError(err?.message || 'No se pudo subir la foto');
    } finally {
      setSaving(false);
      (e.target as HTMLInputElement).value = '';
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true); setError('');
    try {
      await updateCurrentUserProfile({
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        telefono: form.telefono || null,
        fechaNacimiento: form.fechaNacimiento || null,
        sexo: form.sexo || null,
        cedula: form.cedula || null,
        permiso: form.permiso || null,
        estatus: form.estatus || null,
      });
      nav('/perfil');
    } catch (err: any) {
      setError(err?.message || 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  }

  async function onDeleteProfile() {
  const ok = window.confirm(
    '¿Eliminar tu perfil y cuenta? Esta acción no se puede deshacer.'
  );
  if (!ok) return;

  setSaving(true); setError('');
  try {
    // 1) Remove profile row (AppSync/DynamoDB)
    await deleteCurrentUserProfile().catch(() => { /* ignore if not found */ });

    // 2) Remove Cognito user (this also signs the user out)
    await deleteUser();

    // 3) Go home
    nav('/', { replace: true });
  } catch (err: any) {
    setError(err?.message || 'No se pudo eliminar la cuenta');
  } finally {
    setSaving(false);
  }
}



  if (!form) return null;

  const initials =
    (form?.nombre?.[0] || '').toUpperCase() +
    (form?.apellido?.[0] || '').toUpperCase();

  return (
    <div className="page-wrapper profile-page">
      <Menu_bar />
      <div className="main-content">
        <section className="profile-card" aria-labelledby="edit-title">
          <div className="profile__header">
            <h1 id="edit-title" className="profile__title">Editar perfil</h1>
            <div className="profile__avatar">
              {avatarUrl
                ? <img src={avatarUrl} alt="Foto de perfil" />
                : <div className="profile__initials">{initials || '🙂'}</div>}
            </div>
            <input
              id="edit-avatar-input"
              type="file"
              accept="image/*"
              onChange={onAvatarChange}
              style={{ display: 'none' }}
            />
            <div className="profile__actions">
              <button className="btn btn--primary" type="button" onClick={onPickAvatar} disabled={saving}>
                Cambiar foto
              </button>
              <button className="btn btn--secondary" type="button" onClick={() => nav('/perfil')}>
                Cancelar
              </button>
              {/* ⬇️ Acción de peligro */}
              <button className="btn btn--danger" type="button" onClick={onDeleteProfile} disabled={saving}>
                Eliminar perfil
              </button>
            </div>
            {error && <p style={{ color: 'crimson', margin: 0 }}>{error}</p>}
          </div>

          <form className="profile__form" onSubmit={onSubmit}>
            <div className="profile__field">
              <label>Nombre</label>
              <input name="nombre" value={form.nombre} onChange={onChange} required />
            </div>
            <div className="profile__field">
              <label>Apellido</label>
              <input name="apellido" value={form.apellido} onChange={onChange} required />
            </div>
            <div className="profile__field">
              <label>Correo</label>
              <input name="correo" type="email" value={form.correo} onChange={onChange} required />
            </div>
            <div className="profile__field">
              <label>Teléfono</label>
              <input name="telefono" value={form.telefono} onChange={onChange} />
            </div>
            <div className="profile__field">
              <label>Fecha de nacimiento</label>
              <input name="fechaNacimiento" type="date" value={form.fechaNacimiento || ''} onChange={onChange} />
            </div>
            <div className="profile__field">
              <label>Sexo</label>
              <select name="sexo" value={form.sexo || ''} onChange={onChange}>
                <option value="">Selecciona…</option>
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="profile__field">
              <label>Cédula</label>
              <input name="cedula" value={form.cedula || ''} onChange={onChange} />
            </div>

            <div className="profile__actions">
              <button className="btn btn--primary" type="submit" disabled={saving} aria-busy={saving}>
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </button>
              <button className="btn btn--secondary" type="button" onClick={() => nav('/perfil')} disabled={saving}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </div>
      <FooterTol />
    </div>
  );
}
