import { useEffect, useState, type FormEvent } from 'react';
import { generateClient } from 'aws-amplify/api';
import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import { uploadPublicPdf, getPublicUrl } from '../../services/storageService';
import { logAdminAction } from '../../services/adminLogService';
import { getFeaturedNoticiaIds, setFeaturedNoticiaIds } from '../../services/siteConfigService';

import '../../styles/admin/adminBase.css';
import '../../styles/admin/adminDocs.css';

const client = generateClient();

const LIST_NOTICIAS = /* GraphQL */ `
  query ListNoticias {
    listNoticias(limit: 100) {
      items { id title date s3Key createdAt }
    }
  }
`;

const CREATE_NOTICIA = /* GraphQL */ `
  mutation CreateNoticia($input: CreateNoticiaInput!) {
    createNoticia(input: $input) { id title date s3Key createdAt }
  }
`;

const DELETE_NOTICIA = /* GraphQL */ `
  mutation DeleteNoticia($input: DeleteNoticiaInput!) {
    deleteNoticia(input: $input) { id }
  }
`;

type NoticiaItem = { id: string; title: string; date: string; s3Key: string; createdAt: string };

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState<NoticiaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // Featured selection
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredSaving, setFeaturedSaving] = useState(false);
  const [featuredMsg, setFeaturedMsg] = useState<{ text: string; ok: boolean } | null>(null);

  async function fetchNoticias() {
    try {
      const { data } = (await client.graphql({ query: LIST_NOTICIAS })) as any;
      const items: NoticiaItem[] = data?.listNoticias?.items ?? [];
      setNoticias(items.sort((a, b) => b.date.localeCompare(a.date)));
    } catch (err) {
      console.error('Error cargando noticias:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFeatured() {
    setFeaturedLoading(true);
    try {
      const ids = await getFeaturedNoticiaIds();
      setFeaturedIds(ids ?? []);
    } catch {
      setFeaturedIds([]);
    } finally {
      setFeaturedLoading(false);
    }
  }

  useEffect(() => {
    fetchNoticias();
    fetchFeatured();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file || !title || !date) return;
    setUploading(true);
    setMsg(null);
    try {
      const s3Key = await uploadPublicPdf(file, 'noticias');
      await client.graphql({
        query: CREATE_NOTICIA,
        variables: { input: { title, date, s3Key } },
      });
      await logAdminAction({ action: 'CREATE', resourceType: 'BOLETIN', resourceTitle: `[Noticia] ${title}` });
      setMsg({ text: 'Noticia subida exitosamente.', ok: true });
      setTitle('');
      setDate('');
      setFile(null);
      const fi = document.getElementById('noticia-file') as HTMLInputElement;
      if (fi) fi.value = '';
      await fetchNoticias();
    } catch (err: any) {
      setMsg({ text: err?.message || 'No se pudo subir la noticia.', ok: false });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta noticia permanentemente?')) return;
    try {
      const item = noticias.find(n => n.id === id);
      await client.graphql({ query: DELETE_NOTICIA, variables: { input: { id } } });
      await logAdminAction({ action: 'DELETE', resourceType: 'BOLETIN', resourceTitle: `[Noticia] ${item?.title}` });
      setNoticias(prev => prev.filter(n => n.id !== id));
      // Remove from featured if it was selected
      setFeaturedIds(prev => prev.filter(fid => fid !== id));
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

  function toggleFeatured(id: string) {
    setFeaturedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  }

  async function saveFeatured() {
    setFeaturedSaving(true);
    setFeaturedMsg(null);
    try {
      await setFeaturedNoticiaIds(featuredIds);
      setFeaturedMsg({ text: 'Noticias destacadas guardadas.', ok: true });
    } catch (err: any) {
      setFeaturedMsg({ text: err?.message || 'No se pudo guardar.', ok: false });
    } finally {
      setFeaturedSaving(false);
    }
  }

  return (
    <div className="page-wrapper admin-no-banner">
      <Menu_bar />

      <div className="admin-header">
        <h1 className="admin-title">Noticias</h1>
        <p className="admin-subtitle">Sube y administra las noticias oficiales de la liga.</p>
      </div>

      <div className="admin-docs-page">

        <div className="doc-upload-card">
          <h2>Subir nueva noticia</h2>

          {msg && (
            <div className={`doc-msg ${msg.ok ? 'ok' : 'error'}`}>{msg.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="doc-fields">
              <div className="doc-field full-width">
                <label htmlFor="noticia-title">Título *</label>
                <input
                  id="noticia-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ej. Inicio de Temporada 2026"
                  required
                />
              </div>

              <div className="doc-field">
                <label htmlFor="noticia-date">Fecha *</label>
                <input
                  id="noticia-date"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="doc-field">
                <label htmlFor="noticia-file">Archivo PDF *</label>
                <input
                  id="noticia-file"
                  type="file"
                  accept="application/pdf"
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="doc-btn-primary" disabled={uploading}>
              {uploading ? 'Subiendo…' : 'Subir noticia'}
            </button>
          </form>
        </div>

        {/* Featured noticias selector */}
        <div className="doc-upload-card" style={{ marginTop: '1.5rem' }}>
          <h2>Noticias destacadas en inicio</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Selecciona hasta 3 noticias para mostrar en la página de inicio. Si no seleccionas ninguna, se mostrarán las 3 más recientes.
          </p>

          {featuredMsg && (
            <div className={`doc-msg ${featuredMsg.ok ? 'ok' : 'error'}`}>{featuredMsg.text}</div>
          )}

          {featuredLoading || loading ? (
            <div className="doc-empty">Cargando…</div>
          ) : noticias.length === 0 ? (
            <div className="doc-empty">No hay noticias para seleccionar.</div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {noticias.map(n => {
                  const checked = featuredIds.includes(n.id);
                  const disabled = !checked && featuredIds.length >= 3;
                  return (
                    <label
                      key={n.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '8px',
                        border: `1px solid ${checked ? '#8b1a1a' : '#e0e0e0'}`,
                        background: checked ? '#fff5f5' : '#fafafa',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        opacity: disabled ? 0.5 : 1,
                        transition: 'all 0.15s',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggleFeatured(n.id)}
                        style={{ accentColor: '#8b1a1a', width: '1rem', height: '1rem' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{n.title}</div>
                        <div style={{ fontSize: '0.78rem', color: '#888' }}>
                          {new Date(n.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                        </div>
                      </div>
                      {checked && (
                        <span style={{
                          fontSize: '0.72rem', fontWeight: 600, background: '#8b1a1a',
                          color: '#fff', padding: '2px 8px', borderRadius: '999px'
                        }}>
                          Destacada
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  className="doc-btn-primary"
                  onClick={saveFeatured}
                  disabled={featuredSaving}
                  type="button"
                >
                  {featuredSaving ? 'Guardando…' : 'Guardar selección'}
                </button>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>
                  {featuredIds.length}/3 seleccionadas
                </span>
              </div>
            </>
          )}
        </div>

        <div className="doc-list-header">
          <h2>Noticias publicadas</h2>
          {!loading && (
            <span className="doc-list-count">{noticias.length} noticia{noticias.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {loading && <div className="doc-empty">Cargando…</div>}

        {!loading && noticias.length === 0 && (
          <div className="doc-empty">No hay noticias publicadas aún.</div>
        )}

        {!loading && noticias.length > 0 && (
          <div className="doc-list">
            {noticias.map(n => (
              <div key={n.id} className="doc-list-item">
                <div className="doc-item-info">
                  <div className="doc-item-title">
                    {n.title}
                    {featuredIds.includes(n.id) && (
                      <span style={{
                        marginLeft: '0.5rem', fontSize: '0.7rem', fontWeight: 600,
                        background: '#8b1a1a', color: '#fff', padding: '1px 7px',
                        borderRadius: '999px', verticalAlign: 'middle'
                      }}>
                        Destacada
                      </span>
                    )}
                  </div>
                  <div className="doc-item-date">
                    {new Date(n.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                  </div>
                </div>
                <button
                  className="doc-btn-delete"
                  style={{ background: 'transparent', color: '#555', borderColor: '#ccc' }}
                  onClick={() => openDoc(n.s3Key)}
                >
                  Ver
                </button>
                <button className="doc-btn-delete" onClick={() => handleDelete(n.id)}>
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
