import { useState } from 'react'
import type { FormEvent } from 'react'
import { login } from '../services/userService'
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

import { useNavigate } from 'react-router-dom'

export default function IniciaSesion() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    try {
      await login(correo, contrasena)
      nav('/perfil')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <>

    <Menu_bar/>
    <form onSubmit={handleLogin}>
      {error && <p style={{color:'red'}}>{error}</p>}
      <input placeholder="Correo"     onChange={e=>setCorreo(e.target.value)} />
      <input placeholder="Contraseña" type="password"
             onChange={e=>setContrasena(e.target.value)} />
      <button type="submit">Iniciar sesión</button>
    </form>

    <FooterTol/>
    </>
  )
}
