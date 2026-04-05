// src/pages/Registrate.tsx
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

import '../styles/iniciasesion.css';
import '../styles/registrate.css';

import {
  ensureSessionLoaded,
  isSignedIn,
  getIdTokenClaims,
} from '../services/authService';
import {
  getCurrentUserProfile,
  createCurrentUserProfile,
  updateCurrentUserProfile,
} from '../services/userProfile';
import { uploadAvatar } from '../services/storageService';
import accion_4 from '../assets/img/accion4.jpg';

type FormData = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
  sexo: string;
  cedula: string;
};

type FieldErrors = Partial<Record<keyof FormData | 'general', string>>;

export default function Registrate() {
  const [form, setForm] = useState<FormData>({
    nombre: '', apellido: '', correo: '',
    telefono: '', fechaNacimiento: '', sexo: '', cedula: '',
  });

  const [ready, setReady] = useState(false); // show form only after auth check
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      await ensureSessionLoaded();

      if (!(await isSignedIn())) {
        nav('/iniciasesion', { replace: true });
        return;
      }

      const profile = await getCurrentUserProfile().catch(() => null);
      const isComplete = profile && profile.correo?.includes('@') && !!profile.cedula;
      if (isComplete) {
        nav('/perfil', { replace: true });
        return;
      }

      // Signed in but no complete profile → pre-fill from Google token
      const claims = await getIdTokenClaims().catch(() => null);
      setForm(prev => ({
        ...prev,
        correo: (claims?.email as string) ?? '',
        nombre: (claims?.given_name as string) ?? ((claims?.name as string)?.split(' ')[0] ?? ''),
        apellido: (claims?.family_name as string) ?? ((claims?.name as string)?.split(' ').slice(1).join(' ') ?? ''),
      }));

      // Pre-load Google profile picture
      const pictureUrl = claims?.picture as string | undefined;
      if (pictureUrl) {
        try {
          const res = await fetch(pictureUrl);
          const blob = await res.blob();
          const ext = blob.type.includes('png') ? 'png' : 'jpg';
          const file = new File([blob], `google_avatar.${ext}`, { type: blob.type });
          setFotoFile(file);
          setAvatarPreviewUrl(URL.createObjectURL(file));
        } catch { /* ignore */ }
      }

      setReady(true);
    })();
  }, [nav]);

  useEffect(() => {
    return () => { if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl); };
  }, [avatarPreviewUrl]);

  const maxDob = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    return d.toISOString().slice(0, 10);
  }, []);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === 'cedula') {
      setForm(prev => ({ ...prev, cedula: value.replace(/\D/g, '').slice(0, 10) }));
      setErrors(prev => ({ ...prev, cedula: '' }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFotoFile(f);
    setAvatarPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return f ? URL.createObjectURL(f) : null;
    });
  }

  function normalizePhone(raw: string): string | null {
    const d = raw.replace(/\D/g, '');
    if (/^\+?57\d{10}$/.test('+' + d)) return `+57${d.replace(/^57/, '')}`;
    if (/^\+?1\d{10}$/.test('+' + d)) return `+1${d.replace(/^1/, '')}`;
    if (d.length === 10) return d.startsWith('3') ? `+57${d}` : `+1${d}`;
    return null;
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!form.nombre.trim()) next.nombre = 'Ingresa tu nombre.';
    if (!form.apellido.trim()) next.apellido = 'Ingresa tu apellido.';
    if (!form.telefono.trim()) next.telefono = 'Ingresa un teléfono.';
    else if (!normalizePhone(form.telefono)) next.telefono = 'Teléfono inválido. Usa 10 dígitos o +57/+1.';
    if (!form.fechaNacimiento) next.fechaNacimiento = 'Selecciona tu fecha de nacimiento.';
    if (!form.sexo) next.sexo = 'Selecciona tu sexo.';
    if (!form.cedula.trim()) next.cedula = 'Ingresa tu documento.';
    else if (!/^\d{7,10}$/.test(form.cedula)) next.cedula = 'La cédula debe tener entre 7 y 10 dígitos.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    try {
      let avatarKey: string | undefined;
      if (fotoFile) avatarKey = await uploadAvatar(fotoFile);

      const existing = await getCurrentUserProfile().catch(() => null);
      const telefonoE164 = normalizePhone(form.telefono) ?? form.telefono;

      if (existing?.id) {
        await updateCurrentUserProfile({
          nombre: form.nombre, apellido: form.apellido,
          correo: form.correo, telefono: telefonoE164,
          fechaNacimiento: form.fechaNacimiento,
          sexo: form.sexo, cedula: form.cedula,
          ...(avatarKey ? { avatarKey } : {}),
        });
      } else {
        await createCurrentUserProfile({
          nombre: form.nombre, apellido: form.apellido,
          correo: form.correo,
          telefono: telefonoE164 || undefined,
          fechaNacimiento: form.fechaNacimiento || undefined,
          sexo: form.sexo || undefined, cedula: form.cedula || undefined,
          ...(avatarKey ? { avatarKey } : {}),
        });
      }
      nav('/perfil', { replace: true });
    } catch (err: any) {
      setErrors({ general: err?.message || 'No se pudo guardar el perfil.' });
    }
  }

  if (!ready) return null;

  return (
    <div className="page-wrapper">
      <Menu_bar />

      <main className="auth-wrapper" role="main" aria-labelledby="register-title" style={{ marginTop: 120 }}>
        <aside className="auth-hero" aria-hidden="true">
          <img src={accion_4} alt="Patinadores en acción" />
          <div className="auth-hero-overlay" />
          <h1 className="auth-hero-title">Liga Tolimense de Patinaje</h1>
        </aside>

        <section className="auth-card">
          <h2 id="register-title">Completa tu perfil</h2>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
            {form.correo}
          </p>

          <form className="auth-form two-col" onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <p style={{ color: 'crimson', marginTop: 0, marginBottom: '0.75rem', gridColumn: '1/-1' }}>
                {errors.general}
              </p>
            )}

            <label className="auth-field">
              <span>Nombre</span>
              <input name="nombre" type="text" placeholder="Ej: Ana"
                value={form.nombre} onChange={onChange} required
                className={errors.nombre ? 'input-error' : ''} />
              {errors.nombre && <small className="field-error">{errors.nombre}</small>}
            </label>

            <label className="auth-field">
              <span>Apellidos</span>
              <input name="apellido" type="text" placeholder="Ej: García"
                value={form.apellido} onChange={onChange} required
                className={errors.apellido ? 'input-error' : ''} />
              {errors.apellido && <small className="field-error">{errors.apellido}</small>}
            </label>

            <label className="auth-field">
              <span>Teléfono</span>
              <input name="telefono" type="tel" inputMode="tel"
                placeholder="10 dígitos o +57/+1"
                value={form.telefono} onChange={onChange} required
                className={errors.telefono ? 'input-error' : ''} />
              {errors.telefono && <small className="field-error">{errors.telefono}</small>}
            </label>

            <label className="auth-field">
              <span>Fecha de Nacimiento</span>
              <input name="fechaNacimiento" type="date" max={maxDob}
                value={form.fechaNacimiento} onChange={onChange} required
                className={errors.fechaNacimiento ? 'input-error' : ''} />
              {errors.fechaNacimiento && <small className="field-error">{errors.fechaNacimiento}</small>}
            </label>

            <label className="auth-field">
              <span>Sexo</span>
              <select name="sexo" value={form.sexo} onChange={onChange} required
                className={errors.sexo ? 'input-error' : ''}>
                <option value="">Selecciona…</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.sexo && <small className="field-error">{errors.sexo}</small>}
            </label>

            <label className="auth-field">
              <span>Cédula / Tarjeta de identidad</span>
              <input name="cedula" type="text" placeholder="Documento"
                value={form.cedula} onChange={onChange} required
                className={errors.cedula ? 'input-error' : ''} />
              {errors.cedula && <small className="field-error">{errors.cedula}</small>}
            </label>

            {/* Foto de perfil */}
            <div className="auth-field full">
              <span>Foto de Perfil</span>
              <div className="avatar-picker-wrap">
                <input
                  id="fotoPerfil"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="fotoPerfil" className="avatar-picker" title="Cambiar foto">
                  {avatarPreviewUrl
                    ? <img src={avatarPreviewUrl} alt="Foto de perfil" />
                    : <span className="avatar-picker-initials">
                        {((form.nombre[0] ?? '') + (form.apellido[0] ?? '')).toUpperCase() || '?'}
                      </span>
                  }
                  <div className="avatar-picker-overlay">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    <span>{avatarPreviewUrl ? 'Cambiar foto' : 'Subir foto'}</span>
                  </div>
                </label>
                {fotoFile && <p className="avatar-picker-filename">{fotoFile.name}</p>}
              </div>
            </div>

            <button type="submit" className="auth-btn" style={{ cursor: 'pointer' }}>
              Guardar perfil
            </button>
          </form>
        </section>
      </main>

      <FooterTol />
    </div>
  );
}
