import { useEffect, useState } from 'react';
import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import { fetchAdminLogs } from '../../services/adminLogService';

import '../../styles/admin/adminBase.css';
import '../../styles/admin/adminUsuarios.css';

type LogEntry = {
  id: string;
  adminName: string;
  action: string;
  resourceType: string;
  resourceTitle: string;
  timestamp: string;
};

const ACTION_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  CREATE:  { label: 'Creó',    color: '#14582a', bg: 'rgba(22,130,60,0.1)'    },
  DELETE:  { label: 'Eliminó', color: '#9b1c1c', bg: 'rgba(200,30,30,0.08)'   },
  PROMOTE: { label: 'Promovió',color: '#1a4f8a', bg: 'rgba(26,79,138,0.08)'   },
  DEMOTE:  { label: 'Quitó admin a', color: '#7a5010', bg: 'rgba(193,144,60,0.1)' },
};

const TYPE_LABELS: Record<string, string> = {
  BOLETIN:    'Boletín',
  RESOLUCION: 'Resolución',
  GUIA:       'Guía',
  USER:       'Usuario',
};

function formatTs(iso: string) {
  return new Date(iso).toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function AdminLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAdminLogs()
      .then(setLogs)
      .catch(() => setError('No se pudieron cargar los registros.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper admin-no-banner">
      <Menu_bar />

      <div className="admin-header">
        <h1 className="admin-title">Registro de actividad</h1>
        <p className="admin-subtitle">
          Historial de acciones realizadas por administradores.
        </p>
      </div>

      <div className="admin-usuarios-page">
        {loading && <div className="admin-users-empty">Cargando registros…</div>}
        {error   && <div className="admin-users-empty">{error}</div>}

        {!loading && !error && logs.length === 0 && (
          <div className="admin-users-empty">No hay actividad registrada aún.</div>
        )}

        {!loading && logs.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: 600 }}>Fecha</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: 600 }}>Admin</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: 600 }}>Acción</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '10px 12px', color: '#888', fontWeight: 600 }}>Recurso</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => {
                const act = ACTION_LABELS[log.action] ?? { label: log.action, color: '#333', bg: '#f5f5f5' };
                return (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: '#888' }}>
                      {formatTs(log.timestamp)}
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                      {log.adminName}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: 999,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: act.color,
                        background: act.bg,
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                      }}>
                        {act.label}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#666' }}>
                      {TYPE_LABELS[log.resourceType] ?? log.resourceType}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#333' }}>
                      {log.resourceTitle || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <FooterTol />
    </div>
  );
}
