// src/pages/Registrate.tsx
import { useMemo, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

// Reuse auth visuals from login:
import '../styles/iniciasesion.css';
// Keep register-specific tweaks:
import '../styles/registrate.css';

import { signupEmailPassword, confirmSignupEmail } from '../services/authService';
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
  telefono: string;          // normalize to E.164 on submit
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

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [needsConfirm, setNeedsConfirm] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const nav = useNavigate();

  // Max allowed DOB => today minus 5 years
  const maxDob = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    return d.toISOString().slice(0, 10); // yyyy-mm-dd
  }, []);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // clear error as user types
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFotoFile(f);
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

    // +57XXXXXXXXXX
    if (/^\+?57\d{10}$/.test(raw.replace(/\D/g, '').replace(/^/, '+'))) {
      const digits = onlyDigits.replace(/^57/, '');
      if (digits.length === 10) return { e164: `+57${digits}`, country: 'CO' };
    }

    // +1XXXXXXXXXX
    if (/^\+?1\d{10}$/.test(raw.replace(/\D/g, '').replace(/^/, '+'))) {
      const digits = onlyDigits.replace(/^1/, '');
      if (digits.length === 10) return { e164: `+1${digits}`, country: 'US' };
    }

    // 10-digit local
    if (onlyDigits.length === 10) {
      if (onlyDigits.startsWith('3')) return { e164: `+57${onlyDigits}`, country: 'CO' };
      return { e164: `+1${onlyDigits}`, country: 'US' };
    }

    return null;
  }

  function validate(): boolean {
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
    if (!form.cedula.trim()) next.cedula = 'Ingresa tu documento.';

    if (!form.contrasena) next.contrasena = 'Crea una contraseña.';
    else if (!validPassword(form.contrasena))
      next.contrasena = 'Mínimo 8 caracteres e incluir al menos un número.';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

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

  async function handleConfirm(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      // 1) Confirm the account
      await confirmSignupEmail(form.correo, code);

      // 2) Sign in to get credentials (GraphQL/S3)
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

      // 5) Done → profile
      nav('/perfil', { replace: true });
    } catch (err: any) {
      setErrors({ codigo: err?.message || 'No se pudo confirmar/crear el perfil' });
    }
  }

  return (
    <div className="page-wrapper" id="registrate">
      <Menu_bar />

      <div className="main-content">
        <main className="auth-wrapper" role="main" aria-labelledby="auth-title">
          {/* Left: hero image with gradient overlay (same as login) */}
          <aside className="auth-hero" aria-hidden="true">
            <img src={accion_4} alt="Patinadores en acción" />
            <div className="auth-hero-overlay" />
            <h1 className="auth-hero-title">Liga Tolimense de Patinaje</h1>
          </aside>

          {/* Right: registration card */}
          <section className="auth-card">
            <h2 id="auth-title">Regístrate</h2>

            <form className="auth-form reg-grid" onSubmit={handleSubmit} noValidate>
              {errors.general && <p className="form-error">{errors.general}</p>}

              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
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
                {errors.nombre && <span className="error-msg">{errors.nombre}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
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
                {errors.apellido && <span className="error-msg">{errors.apellido}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="correo">Correo electrónico</label>
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
                />
                {errors.correo && <span className="error-msg">{errors.correo}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
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
                {errors.telefono && <span className="error-msg">{errors.telefono}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
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
                  <span className="error-msg">{errors.fechaNacimiento}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="sexo">Sexo</label>
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
                {errors.sexo && <span className="error-msg">{errors.sexo}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cedula">Cédula / Tarjeta de identidad</label>
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
                {errors.cedula && <span className="error-msg">{errors.cedula}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contrasena">Contraseña</label>
                <input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  placeholder="Mín. 8 caracteres y un número"
                  value={form.contrasena}
                  onChange={onChange}
                  required
                  minLength={8}
                  pattern="^(?=.*\d).{8,}$"
                  title="Debe tener mínimo 8 caracteres e incluir al menos un número."
                  aria-invalid={!!errors.contrasena}
                  className={errors.contrasena ? 'input-error' : ''}
                  autoComplete="new-password"
                />
                {errors.contrasena && <span className="error-msg">{errors.contrasena}</span>}
              </div>

              <div className="form-group file-group full">
                <label htmlFor="fotoPerfil">Foto de Perfil (opcional)</label>
                <input
                  id="fotoPerfil"
                  name="fotoPerfil"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
                {!!fotoFile && <small className="file-note">Archivo: {fotoFile.name}</small>}
              </div>

              <button type="submit" className="auth-btn">¡Regístrate!</button>
            </form>

            {needsConfirm && (
              <form
                id="confirm-form"
                className="auth-form reg-grid"
                onSubmit={handleConfirm}
                style={{ marginTop: '1.25rem' }}
              >
                {errors.codigo && <p className="form-error">{errors.codigo}</p>}

                <div className="form-group full">
                  <label htmlFor="codigo">Código de confirmación</label>
                  <input
                    id="codigo"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="auth-btn">Confirmar cuenta</button>
              </form>
            )}
          </section>
        </main>
      </div>

      <FooterTol />
    </div>
  );
}
