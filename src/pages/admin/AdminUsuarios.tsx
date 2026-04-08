import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { post } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { logAdminAction } from '../../services/adminLogService';
import { listUsers } from '../../graphql/queries';
import type { User } from '../../API';
import { getAvatarUrl } from '../../services/storageService';

async function setUserAdminGroup(username: string, makeAdmin: boolean) {
  const session = await fetchAuthSession();
  const token = session.tokens?.accessToken?.toString() ?? '';
  const path = makeAdmin ? '/addUserToGroup' : '/removeUserFromGroup';
  const op = post({
    apiName: 'AdminQueries',
    path,
    options: {
      body: { username, groupname: 'Admins' },
      headers: { Authorization: token },
    },
  });
  await op.response;
}

import '../../styles/banner.css';
import '../../styles/admin/adminBanner.css';
import '../../styles/admin/adminBase.css';
import '../../styles/admin/adminUsuarios.css';

import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import adminBanner from '../../assets/img/festibal1.jpg';

const client = generateClient();

function initials(u: User) {
  return ((u.nombre?.[0] ?? '') + (u.apellido?.[0] ?? '')).toUpperCase() || '?';
}

function statusClass(estatus: string | null | undefined) {
  if (!estatus) return '';
  return estatus.toLowerCase();
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-CO', { dateStyle: 'medium' });
}

// ── User detail modal ────────────────────────────────────────────────────────
function UserDetailModal({ user, onClose }: { user: User; onClose: () => void }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user.avatarKey) {
      getAvatarUrl(user.avatarKey)
        .then(u => setAvatarUrl(u.toString()))
        .catch(() => null);
    } else {
      setAvatarUrl(null);
    }
  }, [user.avatarKey]);

  // Close on backdrop click
  function onBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const fields: { label: string; value: string | null | undefined }[] = [
    { label: 'Correo',            value: user.correo },
    { label: 'Teléfono',          value: user.telefono },
    { label: 'Cédula',            value: user.cedula },
    { label: 'Fecha de nac.',     value: formatDate(user.fechaNacimiento) },
    { label: 'Sexo',              value: user.sexo },
    { label: 'Estatus',           value: user.estatus },
    { label: 'Permiso',           value: user.permiso },
    { label: 'Miembro desde',     value: formatDate(user.createdAt) },
    { label: 'Última actualiz.',  value: formatDate(user.updatedAt) },
  ];

  return (
    <div className="user-modal-backdrop" onClick={onBackdrop}>
      <div className="user-modal" role="dialog" aria-modal="true" aria-label="Perfil de usuario">

        <button className="user-modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        {/* Header */}
        <div className="user-modal-header">
          <div className="user-modal-avatar">
            {avatarUrl
              ? <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  onError={() => setAvatarUrl(null)}
                />
              : <span>{initials(user)}</span>
            }
          </div>
          <div>
            <h2 className="user-modal-name">{user.nombre} {user.apellido}</h2>
            <div className="user-card-badges" style={{ marginTop: 6 }}>
              {user.estatus && (
                <span className={`user-badge ${statusClass(user.estatus)}`}>{user.estatus}</span>
              )}
              {user.permiso && (
                <span className="user-badge permiso">{user.permiso}</span>
              )}
            </div>
          </div>
        </div>

        {/* Fields */}
        <dl className="user-modal-fields">
          {fields.map(f => (
            <div key={f.label} className="user-modal-field">
              <dt>{f.label}</dt>
              <dd>{f.value || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<User | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await client.graphql({ query: listUsers })) as any;
        setUsers(data?.listUsers?.items ?? []);
      } catch (err) {
        console.error('Error cargando usuarios:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function toggleAdmin(u: User) {
    const isAdmin = u.permiso === 'ADMIN';
    const cognitoUsername = u.owner?.split('::')[0] ?? u.id;
    setTogglingId(u.id);
    try {
      await setUserAdminGroup(cognitoUsername, !isAdmin);
      await logAdminAction({
        action: isAdmin ? 'DEMOTE' : 'PROMOTE',
        resourceType: 'USER',
        resourceTitle: `${u.nombre} ${u.apellido} (${u.correo})`,
      });
      // Optimistically update local list
      setUsers(prev => prev.map(x =>
        x.id === u.id ? { ...x, permiso: isAdmin ? 'USUARIO' : 'ADMIN' } : x
      ));
      if (selected?.id === u.id) {
        setSelected(prev => prev ? { ...prev, permiso: isAdmin ? 'USUARIO' : 'ADMIN' } : null);
      }
    } catch (err: any) {
      alert('No se pudo cambiar el rol. Asegúrate de tener Admin Queries activo.\n\n' + (err?.message ?? err));
    } finally {
      setTogglingId(null);
    }
  }

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (
      u.nombre?.toLowerCase().includes(q) ||
      u.apellido?.toLowerCase().includes(q) ||
      u.correo?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="page-wrapper carreras-page page-with-banner">
      <Menu_bar />

      {/* Banner */}
      <section className="page-banner admin-banner">
        <img src={adminBanner} alt="Panel de administración" className="banner-img" />
        <h1 className="banner-title">Usuarios</h1>
      </section>

      <div className="admin-usuarios-page">

        {/* Toolbar */}
        <div className="admin-users-toolbar">
          <div className="admin-users-search-wrap">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8.5" cy="8.5" r="5.5" />
              <line x1="13" y1="13" x2="18" y2="18" />
            </svg>
            <input
              className="admin-users-search"
              type="text"
              placeholder="Buscar por nombre o correo…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {!loading && (
            <span className="admin-users-meta">
              {filtered.length} usuario{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* States */}
        {loading && <div className="admin-users-empty">Cargando usuarios…</div>}

        {!loading && filtered.length === 0 && (
          <div className="admin-users-empty">
            {search ? 'Sin resultados para esa búsqueda.' : 'No hay usuarios registrados aún.'}
          </div>
        )}

        {/* User grid */}
        {!loading && filtered.length > 0 && (
          <div className="admin-users-grid">
            {filtered.map(u => (
              <div key={u.id} className="admin-user-card">
                <div className="user-card-avatar">{initials(u)}</div>
                <div className="user-card-info">
                  <p className="user-card-name">{u.nombre} {u.apellido}</p>
                  <p className="user-card-email">{u.correo}</p>
                  <div className="user-card-badges">
                    {u.estatus && (
                      <span className={`user-badge ${statusClass(u.estatus)}`}>
                        {u.estatus}
                      </span>
                    )}
                    {u.permiso && (
                      <span className="user-badge permiso">{u.permiso}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                    <button
                      className="user-card-view-btn"
                      onClick={() => setSelected(u)}
                    >
                      Ver perfil
                    </button>
                    <button
                      className={`user-card-view-btn ${u.permiso === 'ADMIN' ? 'user-card-demote-btn' : 'user-card-promote-btn'}`}
                      onClick={() => toggleAdmin(u)}
                      disabled={togglingId === u.id}
                    >
                      {togglingId === u.id
                        ? '…'
                        : u.permiso === 'ADMIN' ? 'Quitar admin' : 'Hacer admin'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <UserDetailModal user={selected} onClose={() => setSelected(null)} />
      )}

      <FooterTol />
    </div>
  );
}
