// src/pages/Registrate.tsx
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import '../styles/registrate.css';

import { signupEmailPassword, confirmSignupEmail } from '../services/authService';

type FormData = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
  sexo: string;
  cedula: string;
  contrasena: string;
  fotoPerfil: string; // only the filename for now
};

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
    fotoPerfil: ''
  });

  const [error, setError] = useState<string>('');
  const [needsConfirm, setNeedsConfirm] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const nav = useNavigate();

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setForm(prev => ({ ...prev, fotoPerfil: file?.name || '' }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    try {
      await signupEmailPassword({
        email: form.correo,
        password: form.contrasena,
        given_name: form.nombre,
        family_name: form.apellido,
        // phone_number: +57...  // (optional) in E.164 format if you decide to add it later
      });

      // Show confirmation step
      setNeedsConfirm(true);
      // Optionally, scroll to the confirm form
      setTimeout(() => document.getElementById('confirm-form')?.scrollIntoView({ behavior: 'smooth' }), 0);
    } catch (err: any) {
      setError(err?.message || 'Error en el registro');
    }
  }

  async function handleConfirm(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await confirmSignupEmail(form.correo, code);
      alert('¡Cuenta confirmada! Ahora inicia sesión.');
      nav('/iniciasesion');
    } catch (err: any) {
      setError(err?.message || 'Código inválido');
    }
  }

  return (
    <div className="base">
      <Menu_bar />

      <section className="registration-section" id="registro">
        <h1>Regístrate</h1>

        <form className="registration-form" onSubmit={handleSubmit}>
          {error && !needsConfirm && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" required onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input id="apellido" name="apellido" type="text" required onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input id="correo" name="correo" type="email" required onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input id="telefono" name="telefono" type="tel" required onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input id="fechaNacimiento" name="fechaNacimiento" type="date" required onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="sexo">Sexo</label>
            <select id="sexo" name="sexo" required onChange={onChange}>
              <option value="">Selecciona...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cedula">Cédula / Tarjeta de identidad</label>
            <input id="cedula" name="cedula" type="text" required onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input id="contrasena" name="contrasena" type="password" required onChange={onChange} />
          </div>

          <div className="form-group file-group">
            <label htmlFor="fotoPerfil">Foto de Perfil</label>
            <input id="fotoPerfil" name="fotoPerfil" type="file" accept="image/*" onChange={onFileChange} />
            {!!form.fotoPerfil && <small>Archivo seleccionado: {form.fotoPerfil}</small>}
          </div>

          <button type="submit" className="form-button">¡Regístrate!</button>
        </form>

        {needsConfirm && (
          <form id="confirm-form" className="registration-form" onSubmit={handleConfirm} style={{ marginTop: '1.25rem' }}>
            {error && <p className="form-error">{error}</p>}
            <div className="form-group">
              <label htmlFor="codigo">Código de confirmación</label>
              <input id="codigo" value={code} onChange={(e) => setCode(e.target.value)} required />
            </div>
            <button type="submit" className="form-button">Confirmar cuenta</button>
          </form>
        )}
      </section>

      <FooterTol />
    </div>
  );
}
