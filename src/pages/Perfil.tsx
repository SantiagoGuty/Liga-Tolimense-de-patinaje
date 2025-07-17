// src/pages/Perfil.tsx
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

// CORRECTED IMPORTS FOR AMPLIFY V6 AUTH
// The function name is getCurrentUser in v6
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import type { GraphQLResult } from 'aws-amplify/api';

import { getUser } from '../graphql/queries';
import { updateUser as updateUserMutation } from '../graphql/mutations';
import type {
  GetUserQuery,
  UpdateUserMutation,
  User as GQLUser,
} from '../API';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

import '../styles/perfil.css';

const client = generateClient();

export default function Perfil() {
  const [user, setUser] = useState<GQLUser | null>(null);
  // add the extra optional property
  const [editing, setEditing] = useState(false);
  // 3️⃣ allow fotoPerfil on top of your GraphQL User fields
  const [form, setForm] = useState<Partial<GQLUser> & { fotoPerfil?: string }>({});
  const nav = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        // CORRECTED USAGE
        const authUser = await getCurrentUser();
        const sub = authUser.userId; // Use authUser.userId for the Cognito Sub/ID

        // 2️⃣ perform the query and narrow to GraphQLResult
        const raw = await client.graphql({
          query: getUser,
          variables: { id: sub },
        });

        if (!('data' in raw)) {
          throw new Error('Unexpected subscription result');
        }

        const result = raw as GraphQLResult<{ getUser: GetUserQuery['getUser'] }>;
        const fetched = result.data?.getUser;
        if (!fetched) {
          nav('/Registrate');
          return;
        }

        setUser(fetched);
        setForm(fetched);
      } catch (error) { // Catch the error to handle navigation
        console.error("Error loading profile:", error);
        nav('/IniciaSesion');
      }
    }
    load();
  }, [nav]);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // 3️⃣ cast so TS knows fotoPerfil is allowed
      setForm(f => ({ ...(f as object), fotoPerfil: url }));
    }
  }

  async function handleSave() {
    if (!user) return;

    const input = {
      id: user.id,
      nombre: form.nombre,
      apellido: form.apellido,
      correo: form.correo,
      telefono: form.telefono,
      fechaNacimiento: form.fechaNacimiento,
      sexo: form.sexo,
      cedula: form.cedula,
      // if you want to persist fotoPerfil to S3/DB, handle that here
    };

    try {
      const raw = await client.graphql({
        query: updateUserMutation,
        variables: { input },
      });

      if (!('data' in raw)) throw new Error('Unexpected subscription result');
      const result = raw as GraphQLResult<{ updateUser: UpdateUserMutation['updateUser'] }>;
      const updated = result.data?.updateUser;
      if (!updated) throw new Error('No data returned');

      setUser(updated);
      setForm(updated);
      setEditing(false);
      alert('Perfil actualizado ✅');
    } catch (err: any) {
      alert('Error al actualizar: ' + err.message);
    }
  }

  if (!user) return null;

  const fields: Array<[keyof GQLUser, string]> = [
    ['nombre', 'Nombre'],
    ['apellido', 'Apellido'],
    ['correo', 'Correo'],
    ['telefono', 'Teléfono'],
    ['fechaNacimiento', 'Fecha de nacimiento'],
    ['sexo', 'Sexo'],
    ['cedula', 'Cédula / Tarjeta de identidad'],
  ];

  return (
    <div className="page-wrapper">
      <Menu_bar />

      <div className="main-content">
        <div className="profile-card">
          <h1 className="profile__title">
            {editing ? 'Edita tu perfil' : `Bienvenido, ${user.nombre}`}
          </h1>

          <div className="profile__avatar">
            {form.fotoPerfil ? (
              <img src={form.fotoPerfil} alt="Avatar" />
            ) : (
              <div className="profile__no-avatar">
                Sin foto de perfil
                {!editing && (
                  <button className="btn btn--link" onClick={() => setEditing(true)}>
                    Subir foto
                  </button>
                )}
              </div>
            )}
          </div>

          {editing ? (
            <form
              className="profile__form"
              onSubmit={e => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="profile__field full-width">
                <label htmlFor="fotoPerfil">Foto de perfil</label>
                <input
                  id="fotoPerfil"
                  name="fotoPerfil"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </div>

              {fields.map(([key, label]) => (
                <div className="profile__field" key={key}>
                  <label htmlFor={key}>{label}</label>
                  {key === 'sexo' ? (
                    <select
                      id={key}
                      name={key}
                      value={(form[key] as string) || ''}
                      onChange={onChange}
                    >
                      <option value="">Selecciona…</option>
                      <option>Masculino</option>
                      <option>Femenino</option>
                      <option>Otro</option>
                    </select>
                  ) : (
                    <input
                      id={key}
                      name={key}
                      type={
                        key === 'correo'
                          ? 'email'
                          : key === 'telefono'
                            ? 'tel'
                            : key === 'fechaNacimiento'
                              ? 'date'
                              : 'text'
                      }
                      value={(form[key] as string) || ''}
                      onChange={onChange}
                    />
                  )}
                </div>
              ))}

              <div className="profile__actions">
                <button type="button" className="btn btn--primary" onClick={handleSave}>
                  Guardar cambios
                </button>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    setEditing(false);
                    setForm(user);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="profile__details">
              <ul>
                {fields.map(([key, label]) => (
                  <li key={key}>
                    <span className="label">{label}:</span>{' '}
                    <span className="value">{(user as any)[key]}</span>
                  </li>
                ))}
              </ul>
              <div className="profile__actions">
                <button className="btn btn--primary" onClick={() => setEditing(true)}>
                  Editar perfil
                </button>
                <button
                  className="btn btn--secondary"
                  onClick={async () => {
                    // CORRECTED USAGE
                    await signOut();
                    nav('/IniciaSesion');
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <FooterTol />
    </div>
  );
}