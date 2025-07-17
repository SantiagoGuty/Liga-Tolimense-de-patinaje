// src/pages/Registrate.tsx
import { useState } from 'react'; 
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import type { FormEvent, ChangeEvent } from 'react'
import { register } from '../services/userService'
import { useNavigate } from 'react-router-dom'
import '../styles/registrate.css'

// Add a type definition for your form state
type FormData = {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
  sexo: string;
  cedula: string;
  contrasena: string;
  fotoPerfil: string;
};

export default function Registrate() {
  // Use the type definition here to fix the implicit 'any' error
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
  })
  const [error, setError] = useState<string>('')
  const nav = useNavigate()

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setForm(prev => ({ ...prev, fotoPerfil: file?.name || '' }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await register(form)
      alert('¡Te has registrado! Por favor inicia sesión.')
      nav('/iniciasesion')
    } catch (err: any) {
      setError(err.message || 'Error en el registro')
    }
  }

  return (

    <div className='base'>

    <Menu_bar/>

    <section className="registration-section" id="registro">
      <h1>Regístrate</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}

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
          <input
            id="fotoPerfil"
            name="fotoPerfil"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>

        <button type="submit" className="form-button">
          ¡Regístrate!
        </button>
      </form>
    </section>

    <FooterTol/>

    </div>

  )
}