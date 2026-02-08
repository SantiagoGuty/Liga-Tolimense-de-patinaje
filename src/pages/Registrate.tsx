// src/pages/Registrate.tsx
import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

import '../styles/iniciasesion.css';
import '../styles/registrate.css';

import {
  signupEmailPassword,
  confirmSignupEmail,

} from '../services/authService';
import {
  getCurrentUserProfile,
  createCurrentUserProfile,
  updateCurrentUserProfile,
} from '../services/userProfile';
import { uploadAvatar } from '../services/storageService';
import { signIn } from 'aws-amplify/auth';
import accion_4 from '../assets/img/accion4.jpg';

type FormData = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;          // normalized to E.164 on submit
  fechaNacimiento: string;   // yyyy-mm-dd
  sexo: string;
  cedula: string;
  contrasena: string;
};

type FieldErrors = Partial<Record<keyof FormData | 'general' | 'codigo', string>>;

export default function Registrate() {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    sexo: '',
    cedula: '',
    contrasena: '',
  });

  const [isFederated] = useState(false);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [needsConfirm, setNeedsConfirm] = useState(false); // email+password only
  const [code, setCode] = useState('');
  const nav = useNavigate();
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);


  // After returning from Google (Hosted UI), we’re already authenticated.
  // Prefill known fields and switch to "complete profile" mode.
  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) URL.revokeObjectURL(avatarPreviewUrl);
    };
  }, [avatarPreviewUrl]);

  // ---- Validation helpers ---------------------------------------------------

  // Max allowed DOB => today minus 5 years
  const maxDob = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    return d.toISOString().slice(0, 10);
  }, []);

  // Solo dígitos
  function digitsOnly(v: string) {
    return v.replace(/\D/g, '');
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

      // Cédula: solo números y tope 10
    if (name === 'cedula') {
      const clean = digitsOnly(value).slice(0, 10);
      setForm(prev => ({ ...prev, cedula: clean }));
      setErrors(prev => ({ ...prev, cedula: '' }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }

function onFileChange(e: ChangeEvent<HTMLInputElement>) {
  const f = e.target.files?.[0] ?? null;
  setFotoFile(f);

  // Limpia preview anterior si existía
  setAvatarPreviewUrl((prev) => {
    if (prev) URL.revokeObjectURL(prev);
    return f ? URL.createObjectURL(f) : null;
  });
}


  // Password must have 8+ chars and at least one number
  function validPassword(pw: string) {
    return /^(?=.*\d).{8,}$/.test(pw);
  }

  // Validate 5+ years old
  function validAge5OrMore(dateStr: string) {
    if (!dateStr) return false;
    const dob = new Date(dateStr + 'T00:00:00');
    const min = new Date();
    min.setFullYear(min.getFullYear() - 5);
    return dob <= min;
  }

  // Normalize phone to E.164 for CO/US or reject
  function normalizePhone(raw: string): { e164: string; country: 'CO' | 'US' } | null {
    const onlyDigits = raw.replace(/\D/g, '');

    // +57XXXXXXXXXX (or 57XXXXXXXXXX)
    if (/^\+?57\d{10}$/.test(raw.replace(/\D/g, '').replace(/^/, '+'))) {
      const digits = onlyDigits.replace(/^57/, '');
      if (digits.length === 10) return { e164: `+57${digits}`, country: 'CO' };
    }

    // +1XXXXXXXXXX (or 1XXXXXXXXXX)
    if (/^\+?1\d{10}$/.test(raw.replace(/\D/g, '').replace(/^/, '+'))) {
      const digits = onlyDigits.replace(/^1/, '');
      if (digits.length === 10) return { e164: `+1${digits}`, country: 'US' };
    }

    // 10-digit local: guess country
    if (onlyDigits.length === 10) {
      if (onlyDigits.startsWith('3')) return { e164: `+57${onlyDigits}`, country: 'CO' };
      return { e164: `+1${onlyDigits}`, country: 'US' };
    }

    return null;
  }

  // Unified validator (can skip password for federated flow)
  function validate(skipPassword = false): boolean {
    const next: FieldErrors = {};

    if (!form.nombre.trim()) next.nombre = 'Ingresa tu nombre.';
    if (!form.apellido.trim()) next.apellido = 'Ingresa tu apellido.';

    if (!form.correo.trim()) next.correo = 'Ingresa un correo.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) next.correo = 'Correo inválido.';

    const phone = normalizePhone(form.telefono);
    if (!form.telefono.trim()) next.telefono = 'Ingresa un teléfono.';
    else if (!phone) next.telefono = 'Teléfono inválido. Usa 10 dígitos o +57/+1.';

    if (!form.fechaNacimiento) next.fechaNacimiento = 'Selecciona tu fecha de nacimiento.';
    else if (!validAge5OrMore(form.fechaNacimiento)) next.fechaNacimiento = 'Debes tener 5 años o más.';

    if (!form.sexo) next.sexo = 'Selecciona tu sexo.';
    if (!form.cedula.trim()) {
      next.cedula = 'Ingresa tu documento.';
    } else if (!/^\d{7,10}$/.test(form.cedula)) {
      next.cedula = 'La cédula (NUIP) debe tener entre 7 y 10 dígitos numéricos.';
    }

    if (!skipPassword) {
      if (!form.contrasena) next.contrasena = 'Crea una contraseña.';
      else if (!validPassword(form.contrasena))
        next.contrasena = 'Mínimo 8 caracteres e incluir al menos un número.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  // ---- Submit flows ---------------------------------------------------------

  // Main submit button (branches on federated vs email/password)
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    if (isFederated) {
      // Completing profile for a Google-authenticated user.
      if (!validate(true)) return;

      try {
        let avatarKey: string | undefined;
        if (fotoFile) avatarKey = await uploadAvatar(fotoFile);

        const existing = await getCurrentUserProfile().catch(() => null);
        const phone = normalizePhone(form.telefono);
        const telefonoE164 = phone?.e164 ?? form.telefono;

        if (existing?.id) {
          await updateCurrentUserProfile({
            nombre: form.nombre,
            apellido: form.apellido,
            telefono: telefonoE164,
            fechaNacimiento: form.fechaNacimiento,
            sexo: form.sexo,
            cedula: form.cedula,
            ...(avatarKey ? { avatarKey } : {}),
          });
        } else {
          await createCurrentUserProfile({
            nombre: form.nombre,
            apellido: form.apellido,
            telefono: telefonoE164 || undefined,
            fechaNacimiento: form.fechaNacimiento || undefined,
            sexo: form.sexo || undefined,
            cedula: form.cedula || undefined,
            ...(avatarKey ? { avatarKey } : {}),
          });
        }

        nav('/perfil', { replace: true });
      } catch (err: any) {
        setErrors({ general: err?.message || 'No se pudo crear/actualizar el perfil.' });
      }

      return;
    }

    // Email + password registration (original flow)
    if (!validate(false)) return;

    try {
      await signupEmailPassword({
        email: form.correo,
        password: form.contrasena,
        given_name: form.nombre,
        family_name: form.apellido,
      });

      setNeedsConfirm(true);
      setTimeout(() => {
        document.getElementById('confirm-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } catch (err: any) {
      setErrors({ general: err?.message || 'Error en el registro' });
    }
  }

  // Email+password confirmation
  async function handleConfirm(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      // 1) Confirm in Cognito
      await confirmSignupEmail(form.correo, code);

      // 2) Sign in for credentials
      await signIn({ username: form.correo, password: form.contrasena });

      // 3) Optional avatar upload
      let avatarKey: string | undefined;
      if (fotoFile) avatarKey = await uploadAvatar(fotoFile);

      // 4) Upsert profile
      const existing = await getCurrentUserProfile().catch(() => null);
      const phone = normalizePhone(form.telefono);
      const telefonoE164 = phone?.e164 ?? form.telefono;

      if (existing?.id) {
        await updateCurrentUserProfile({
          nombre: form.nombre,
          apellido: form.apellido,
          telefono: telefonoE164,
          fechaNacimiento: form.fechaNacimiento,
          sexo: form.sexo,
          cedula: form.cedula,
          ...(avatarKey ? { avatarKey } : {}),
        });
      } else {
        await createCurrentUserProfile({
          nombre: form.nombre,
          apellido: form.apellido,
          telefono: telefonoE164 || undefined,
          fechaNacimiento: form.fechaNacimiento || undefined,
          sexo: form.sexo || undefined,
          cedula: form.cedula || undefined,
          ...(avatarKey ? { avatarKey } : {}),
        });
      }

      nav('/perfil', { replace: true });
    } catch (err: any) {
      setErrors({ codigo: err?.message || 'No se pudo confirmar/crear el perfil' });
    }
  }

  // ---- Render ---------------------------------------------------------------

  return (
    <div className="page-wrapper">
      <Menu_bar />

      <main className="auth-wrapper" role="main" aria-labelledby="register-title">
        {/* Left: brand image (same as login) */}
        <aside className="auth-hero" aria-hidden="true">
          <img src={accion_4} alt="Patinadores en acción" />
          <div className="auth-hero-overlay" />
          <h1 className="auth-hero-title">Liga Tolimense de Patinaje</h1>
        </aside>

        {/* Right: register card */}
        <section className="auth-card">
          <h2 id="register-title">{isFederated ? 'Completa tu perfil' : 'Regístrate'}</h2>


          <form className="auth-form two-col" onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <p style={{ color: 'crimson', marginTop: 0, marginBottom: '0.75rem' }}>
                {errors.general}
              </p>
            )}

            {/* Nombre */}
            <label className="auth-field">
              <span>Nombre</span>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ej: Ana"
                value={form.nombre}
                onChange={onChange}
                required
                aria-invalid={!!errors.nombre}
                className={errors.nombre ? 'input-error' : ''}
              />
              {errors.nombre && <small className="field-error">{errors.nombre}</small>}
            </label>

            {/* Apellido */}
            <label className="auth-field">
              <span>Apellidos</span>
              <input
                id="apellido"
                name="apellido"
                type="text"
                placeholder="Ej: García"
                value={form.apellido}
                onChange={onChange}
                required
                aria-invalid={!!errors.apellido}
                className={errors.apellido ? 'input-error' : ''}
              />
              {errors.apellido && <small className="field-error">{errors.apellido}</small>}
            </label>

            {/* Correo */}
            <label className="auth-field">
              <span>Correo electrónico</span>
              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="tucorreo@dominio.com"
                value={form.correo}
                onChange={onChange}
                required
                aria-invalid={!!errors.correo}
                className={errors.correo ? 'input-error' : ''}
                disabled={isFederated}
              />
              {errors.correo && <small className="field-error">{errors.correo}</small>}
            </label>

            {/* Teléfono */}
            <label className="auth-field">
              <span>Teléfono</span>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                inputMode="tel"
                placeholder="10 dígitos o +57/+1"
                value={form.telefono}
                onChange={onChange}
                required
                aria-invalid={!!errors.telefono}
                className={errors.telefono ? 'input-error' : ''}
              />
              {errors.telefono && <small className="field-error">{errors.telefono}</small>}
            </label>

            {/* Fecha */}
            <label className="auth-field">
              <span>Fecha de Nacimiento</span>
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                max={maxDob}
                value={form.fechaNacimiento}
                onChange={onChange}
                required
                aria-invalid={!!errors.fechaNacimiento}
                className={errors.fechaNacimiento ? 'input-error' : ''}
              />
              {errors.fechaNacimiento && (
                <small className="field-error">{errors.fechaNacimiento}</small>
              )}
            </label>

            {/* Sexo */}
            <label className="auth-field">
              <span>Sexo</span>
              <select
                id="sexo"
                name="sexo"
                value={form.sexo}
                onChange={onChange}
                required
                aria-invalid={!!errors.sexo}
                className={errors.sexo ? 'input-error' : ''}
              >
                <option value="">Selecciona…</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.sexo && <small className="field-error">{errors.sexo}</small>}
            </label>

            {/* Cédula */}
            <label className="auth-field">
              <span>Cédula / Tarjeta de identidad</span>
              <input
                id="cedula"
                name="cedula"
                type="text"
                placeholder="Documento"
                value={form.cedula}
                onChange={onChange}
                required
                aria-invalid={!!errors.cedula}
                className={errors.cedula ? 'input-error' : ''}
              />
              {errors.cedula && <small className="field-error">{errors.cedula}</small>}
            </label>

            {/* Contraseña (hidden when federated) */}
            {!isFederated && (
              <label className="auth-field">
                <span>Contraseña</span>
                <input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  placeholder="Mín. 8 caracteres y un número"
                  value={form.contrasena}
                  onChange={onChange}
                  required
                  minLength={8}
                  pattern="^(?=.*\\d).{8,}$"
                  title="Debe tener mínimo 8 caracteres e incluir al menos un número."
                  aria-invalid={!!errors.contrasena}
                  className={errors.contrasena ? 'input-error' : ''}
                  autoComplete="new-password"
                />
                {errors.contrasena && <small className="field-error">{errors.contrasena}</small>}
              </label>
            )}

            {/* Foto (full row) */}
            <div className="auth-field full">
              <span>Foto de Perfil</span>
              <div className="auth-file-control">
                <input
                  id="fotoPerfil"
                  name="fotoPerfil"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="auth-file-input"
                />
                <label htmlFor="fotoPerfil" className="auth-file-btn">
                  Seleccionar archivo
                </label>
                <span className={`auth-file-name ${fotoFile ? '' : 'placeholder'}`}>
                  {fotoFile ? fotoFile.name : 'Ningún archivo seleccionado'}
                </span>
              </div>
            </div>

            <button type="submit" className="auth-btn">
              {isFederated ? 'Guardar perfil' : '¡Regístrate!'}
            </button>
          </form>

          {/* Email+password confirmation only */}
          {needsConfirm && !isFederated && (
            <form id="confirm-form" className="auth-form" onSubmit={handleConfirm}>
              {errors.codigo && (
                <p style={{ color: 'crimson', marginTop: 0, marginBottom: '0.75rem' }}>
                  {errors.codigo}
                </p>
              )}
              <label className="auth-field">
                <span>Código de confirmación</span>
                <input
                  id="codigo"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="auth-btn">Confirmar cuenta</button>
            </form>
          )}
        </section>
      </main>

      <FooterTol />
    </div>
    
  );
  
}
