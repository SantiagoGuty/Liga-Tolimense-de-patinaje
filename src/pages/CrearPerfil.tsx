import { useEffect, useState, FormEvent } from 'react';
import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import { createCurrentUserProfile, getCurrentUserProfile } from '../services/userProfile';
import { useNavigate } from 'react-router-dom';

export default function CrearPerfil() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [form, setForm] = useState({
    nombre: '', apellido: '', telefono: '',
    fechaNacimiento: '', sexo: '', cedula: ''
  });

  useEffect(() => {
    (async () => {
      try {
        const existing = await getCurrentUserProfile();
        if (existing) {
          // Already has a profile → go view it
          nav('/perfil', { replace: true });
          return;
        }
      } catch (e: any) {
        // ignore "not found" style failures
      } finally {
        setLoading(false);
      }
    })();
  }, [nav]);

  function onChange(e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await createCurrentUserProfile({
        nombre: form.nombre,
        apellido: form.apellido,
        telefono: form.telefono || undefined,
        fechaNacimiento: form.fechaNacimiento || undefined,
        sexo: form.sexo || undefined,
        cedula: form.cedula || undefined,
      });
      nav('/perfil');
    } catch (e: any) {
      setError(e.message || 'No se pudo crear el perfil');
    }
  }

  if (loading) return null;

  return (
    <div className="page-wrapper">
      <Menu_bar />
      <div className="main-content" style={{ padding: '1rem' }}>
        <h1>Crear perfil</h1>
        {error && <p style={{color:'red'}}>{error}</p>}
        <form onSubmit={onSubmit} style={{ maxWidth: 560 }}>
          <label>Nombre
            <input name="nombre" required onChange={onChange} />
          </label>
          <label>Apellido
            <input name="apellido" required onChange={onChange} />
          </label>
          <label>Teléfono
            <input name="telefono" onChange={onChange} />
          </label>
          <label>Fecha de nacimiento
            <input type="date" name="fechaNacimiento" onChange={onChange} />
          </label>
          <label>Sexo
            <select name="sexo" onChange={onChange}>
              <option value="">Selecciona…</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
            </select>
          </label>
          <label>Cédula / TI
            <input name="cedula" onChange={onChange} />
          </label>

          <button type="submit">Guardar</button>
        </form>
      </div>
      <FooterTol />
    </div>
  );
}
