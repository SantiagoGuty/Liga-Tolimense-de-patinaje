import { useEffect, useState, type FormEvent } from 'react';
import { generateClient } from 'aws-amplify/api';
import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import { uploadPublicPdf, getPublicUrl } from '../../services/storageService';

import '../../styles/admin/adminBase.css';
import '../../styles/admin/adminDocs.css';

const client = generateClient();

const LIST_BOLETINES = /* GraphQL */ `
  query ListBoletins {
    listBoletins(limit: 100) {
      items { id title date s3Key createdAt }
    }
  }
`;

const CREATE_BOLETIN = /* GraphQL */ `
  mutation CreateBoletin($input: CreateBoletinInput!) {
    createBoletin(input: $input) { id title date s3Key createdAt }
  }
`;

const DELETE_BOLETIN = /* GraphQL */ `
  mutation DeleteBoletin($input: DeleteBoletinInput!) {
    deleteBoletin(input: $input) { id }
  }
`;

type BoletinItem = { id: string; title: string; date: string; s3Key: string; createdAt: string };

export default function AdminBoletines() {
  const [boletines, setBoletines] = useState<BoletinItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  async function fetchBoletines() {
    try {
      const { data } = (await client.graphql({ query: LIST_BOLETINES })) as any;
      const items: BoletinItem[] = data?.listBoletins?.items ?? [];
      setBoletines(items.sort((a, b) => b.date.localeCompare(a.date)));
    } catch (err) {
      console.error('Error cargando boletines:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchBoletines(); }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file || !title || !date) return;
    setUploading(true);
    setMsg(null);
    try {
      const s3Key = await uploadPublicPdf(file, 'boletines');
      await client.graphql({
        query: CREATE_BOLETIN,
        variables: { input: { title, date, s3Key } },
      });
      setMsg({ text: 'Boletín subido exitosamente.', ok: true });
      setTitle('');
      setDate('');
      setFile(null);
      const fi = document.getElementById('boletin-file') as HTMLInputElement;
      if (fi) fi.value = '';
      await fetchBoletines();
    } catch (err: any) {
      setMsg({ text: err?.message || 'No se pudo subir el boletín.', ok: false });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar este boletín permanentemente?')) return;
    try {
      await client.graphql({ query: DELETE_BOLETIN, variables: { input: { id } } });
      setBoletines(prev => prev.filter(b => b.id !== id));
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
        <h1 className="admin-title">Boletines</h1>
        <p className="admin-subtitle">
          Sube y administra los boletines oficiales de la liga.
        </p>
      </div>

      <div className="admin-docs-page">

        {/* ── Upload form ── */}
        <div className="doc-upload-card">
          <h2>Subir nuevo boletín</h2>

          {msg && (
            <div className={`doc-msg ${msg.ok ? 'ok' : 'error'}`}>{msg.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="doc-fields">
              <div className="doc-field full-width">
                <label htmlFor="boletin-title">Título *</label>
                <input
                  id="boletin-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ej. Boletín Festival y Ranking 2026"
                  required
                />
              </div>

              <div className="doc-field">
                <label htmlFor="boletin-date">Fecha *</label>
                <input
                  id="boletin-date"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="doc-field">
                <label htmlFor="boletin-file">Archivo PDF *</label>
                <input
                  id="boletin-file"
                  type="file"
                  accept="application/pdf"
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="doc-btn-primary" disabled={uploading}>
              {uploading ? 'Subiendo…' : 'Subir boletín'}
            </button>
          </form>
        </div>

        {/* ── List ── */}
        <div className="doc-list-header">
          <h2>Boletines publicados</h2>
          {!loading && (
            <span className="doc-list-count">{boletines.length} documento{boletines.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && <div className="doc-empty">Cargando…</div>}

        {!loading && boletines.length === 0 && (
          <div className="doc-empty">No hay boletines publicados aún.</div>
        )}

        {!loading && boletines.length > 0 && (
          <div className="doc-list">
            {boletines.map(b => (
              <div key={b.id} className="doc-list-item">
                <div className="doc-item-info">
                  <div className="doc-item-title">{b.title}</div>
                  <div className="doc-item-date">
                    <span>
                      {new Date(b.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                    </span>
                  </div>
                </div>
                <button
                  className="doc-btn-delete"
                  style={{ background: 'transparent', color: '#555', borderColor: '#ccc' }}
                  onClick={() => openDoc(b.s3Key)}
                >
                  Ver
                </button>
                <button className="doc-btn-delete" onClick={() => handleDelete(b.id)}>
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
