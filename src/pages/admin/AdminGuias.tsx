import { useEffect, useState, type FormEvent } from 'react';
import { generateClient } from 'aws-amplify/api';
import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import { uploadPublicPdf } from '../../services/storageService';

const client = generateClient();

const LIST_GUIAS = /* GraphQL */ `
  query ListGuias {
    listGuias(limit: 100) {
      items { id title date description s3Key createdAt }
    }
  }
`;

const CREATE_GUIA = /* GraphQL */ `
  mutation CreateGuia($input: CreateGuiaInput!) {
    createGuia(input: $input) { id title date description s3Key createdAt }
  }
`;

const DELETE_GUIA = /* GraphQL */ `
  mutation DeleteGuia($input: DeleteGuiaInput!) {
    deleteGuia(input: $input) { id }
  }
`;

type GuiaItem = { id: string; title: string; date: string; description?: string | null; s3Key: string; createdAt: string };

export default function AdminGuias() {
  const [guias, setGuias] = useState<GuiaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  async function fetchGuias() {
    try {
      const { data } = (await client.graphql({ query: LIST_GUIAS })) as any;
      const items: GuiaItem[] = data?.listGuias?.items ?? [];
      setGuias(items.sort((a, b) => b.date.localeCompare(a.date)));
    } catch (err) {
      console.error('Error cargando guías:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchGuias(); }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file || !title || !date) return;
    setUploading(true);
    setMsg(null);
    try {
      const s3Key = await uploadPublicPdf(file, 'guias');
      await client.graphql({
        query: CREATE_GUIA,
        variables: { input: { title, date, s3Key, description: description || undefined } },
      });
      setMsg({ text: 'Guía subida exitosamente.', ok: true });
      setTitle('');
      setDate('');
      setDescription('');
      setFile(null);
      const fileInput = document.getElementById('guia-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      await fetchGuias();
    } catch (err: any) {
      setMsg({ text: err?.message || 'No se pudo subir la guía.', ok: false });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta guía permanentemente?')) return;
    try {
      await client.graphql({ query: DELETE_GUIA, variables: { input: { id } } });
      setGuias(prev => prev.filter(g => g.id !== id));
    } catch (err: any) {
      alert('Error al eliminar: ' + (err?.message ?? 'desconocido'));
    }
  }

  return (
    <div className="page-wrapper">
      <Menu_bar />
      <main style={{ padding: '2rem 1rem', maxWidth: 900, margin: '0 auto' }}>
        <h1>Administración · Guías</h1>

        {/* Upload form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40, background: '#f8f8f8', padding: 24, borderRadius: 12, border: '1px solid #e0e0e0' }}
        >
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Subir nueva guía</h2>

          {msg && (
            <p style={{ margin: 0, color: msg.ok ? '#2a7d2a' : 'crimson', fontWeight: 500 }}>
              {msg.text}
            </p>
          )}

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>Título *</span>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej. Guía de Competencias 2026"
              required
              style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>Fecha *</span>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem', width: 200 }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>Descripción (opcional)</span>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Breve descripción de la guía…"
              rows={3}
              style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.95rem', resize: 'vertical' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>Archivo PDF *</span>
            <input
              id="guia-file"
              type="file"
              accept="application/pdf"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
              required
              style={{ fontSize: '0.95rem' }}
            />
          </label>

          <button
            type="submit"
            disabled={uploading}
            style={{ padding: '10px 24px', alignSelf: 'flex-start', borderRadius: 8, border: 'none', background: '#1a56db', color: '#fff', fontSize: '1rem', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1 }}
          >
            {uploading ? 'Subiendo…' : 'Subir guía'}
          </button>
        </form>

        {/* List */}
        <h2 style={{ fontSize: '1.2rem' }}>Guías publicadas</h2>
        {loading ? (
          <p>Cargando…</p>
        ) : guias.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No hay guías aún.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: '#f0f0f0', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Título</th>
                <th style={{ padding: '10px 12px', width: 140 }}>Fecha</th>
                <th style={{ padding: '10px 12px', width: 100, textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {guias.map(g => (
                <tr key={g.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div>{g.title}</div>
                    {g.description && <div style={{ fontSize: '0.82rem', opacity: 0.6, marginTop: 2 }}>{g.description}</div>}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {new Date(g.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(g.id)}
                      style={{ color: 'crimson', background: 'none', border: '1px solid crimson', borderRadius: 5, padding: '4px 12px', cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <FooterTol />
    </div>
  );
}
