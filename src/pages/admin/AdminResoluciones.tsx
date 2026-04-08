import { useEffect, useState, type FormEvent } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listResolutions } from '../../graphql/queries';
import { createResolution, deleteResolution } from '../../graphql/mutations';
import { logAdminAction } from '../../services/adminLogService';

import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import { uploadPublicPdf, getPublicUrl } from '../../services/storageService';

import '../../styles/admin/adminBase.css';
import '../../styles/admin/adminDocs.css';

const client = generateClient();

type ResItem = { id: string; title: string; date: string; s3Key: string };

export default function AdminResoluciones() {
  const [items, setItems] = useState<ResItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  async function fetchItems() {
    try {
      const { data } = (await client.graphql({ query: listResolutions })) as any;
      const raw: ResItem[] = data?.listResolutions?.items ?? [];
      setItems(raw.sort((a, b) => b.date.localeCompare(a.date)));
    } catch (err) {
      console.error('Error cargando resoluciones:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file || !title || !date) return;
    setUploading(true);
    setMsg(null);
    try {
      const s3Key = await uploadPublicPdf(file, 'resoluciones');
      await client.graphql({
        query: createResolution,
        variables: {
          input: {
            title,
            date,
            s3Key,
            pk: 'RESOLUTION',
          },
        },
      });
      await logAdminAction({ action: 'CREATE', resourceType: 'RESOLUCION', resourceTitle: title });
      setMsg({ text: 'Resolución subida exitosamente.', ok: true });
      setTitle('');
      setDate('');
      setFile(null);
      const fi = document.getElementById('res-file') as HTMLInputElement;
      if (fi) fi.value = '';
      await fetchItems();
    } catch (err: any) {
      setMsg({ text: err?.message || 'No se pudo subir la resolución.', ok: false });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta resolución permanentemente?')) return;
    try {
      const item = items.find(r => r.id === id);
      await client.graphql({ query: deleteResolution, variables: { input: { id } } });
      await logAdminAction({ action: 'DELETE', resourceType: 'RESOLUCION', resourceTitle: item?.title });
      setItems(prev => prev.filter(r => r.id !== id));
    } catch (err: any) {
      alert('Error al eliminar: ' + (err?.message ?? 'desconocido'));
    }
  }

  async function openDoc(s3Key: string) {
    try {
      const url = await getPublicUrl(s3Key);
      window.open(url, '_blank');
    } catch {
      alert('No se pudo abrir el documento.');
    }
  }

  return (
    <div className="page-wrapper admin-no-banner">
      <Menu_bar />

      <div className="admin-header">
        <h1 className="admin-title">Resoluciones</h1>
        <p className="admin-subtitle">
          Sube y administra las resoluciones oficiales de la liga.
        </p>
      </div>

      <div className="admin-docs-page">

        {/* ── Upload form ── */}
        <div className="doc-upload-card">
          <h2>Subir nueva resolución</h2>

          {msg && (
            <div className={`doc-msg ${msg.ok ? 'ok' : 'error'}`}>{msg.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="doc-fields">
              <div className="doc-field full-width">
                <label htmlFor="res-title">Título *</label>
                <input
                  id="res-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ej. Resolución – I Festival de Escuelas y Novatos 2026"
                  required
                />
              </div>

              <div className="doc-field">
                <label htmlFor="res-date">Fecha *</label>
                <input
                  id="res-date"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="doc-field">
                <label htmlFor="res-file">Archivo PDF *</label>
                <input
                  id="res-file"
                  type="file"
                  accept="application/pdf"
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="doc-btn-primary" disabled={uploading}>
              {uploading ? 'Subiendo…' : 'Subir resolución'}
            </button>
          </form>
        </div>

        {/* ── List ── */}
        <div className="doc-list-header">
          <h2>Resoluciones publicadas</h2>
          {!loading && (
            <span className="doc-list-count">{items.length} documento{items.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && <div className="doc-empty">Cargando…</div>}

        {!loading && items.length === 0 && (
          <div className="doc-empty">No hay resoluciones publicadas aún.</div>
        )}

        {!loading && items.length > 0 && (
          <div className="doc-list">
            {items.map(r => (
              <div key={r.id} className="doc-list-item">
                <div className="doc-item-info">
                  <div className="doc-item-title">{r.title}</div>
                  <div className="doc-item-date">
                    <span>
                      {new Date(r.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                    </span>
                  </div>
                </div>
                <button
                  className="doc-btn-delete"
                  style={{ background: 'transparent', color: '#555', borderColor: '#ccc' }}
                  onClick={() => openDoc(r.s3Key)}
                >
                  Ver
                </button>
                <button className="doc-btn-delete" onClick={() => handleDelete(r.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterTol />
    </div>
  );
}
