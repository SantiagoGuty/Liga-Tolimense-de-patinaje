// src/components/PracticasPanel.tsx
// Reusable panel — no Menu_bar / FooterTol.
// Used by both MisPracticas (coach page) and AdminPracticas (admin page).
import { useEffect, useMemo, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';

import type {
  Practice,
  CreatePracticeInput,
  ListPracticesQuery,
  ListPracticesQueryVariables,
  CreatePracticeMutation,
  CreatePracticeMutationVariables,
  ListPracticeCheckInsQuery,
  ListPracticeCheckInsQueryVariables,
} from '../API';

import { listPractices, listPracticeCheckIns } from '../graphql/queries';
import { createPractice } from '../graphql/mutations';

import '../styles/admin/adminPracticas.css';

const client = generateClient();

function isoDateOnly(d = new Date()) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

function makeQrToken() {
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function PracticasPanel() {
  const [loading, setLoading]   = useState(true);
  const [err, setErr]           = useState('');
  const [items, setItems]       = useState<Practice[]>([]);
  const [counts, setCounts]     = useState<Record<string, number>>({});
  const [ownerSub, setOwnerSub] = useState('');
  const [creating, setCreating] = useState(false);

  const [form, setForm] = useState({
    title: '',
    date: isoDateOnly(),
    location: '',
    notes: '',
  });

  const canCreate = useMemo(
    () => form.title.trim().length > 0 && form.date.trim().length > 0,
    [form.title, form.date]
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const session = await fetchAuthSession();
        const sub = session.tokens?.idToken?.payload?.sub as string | undefined;
        if (!sub) throw new Error('No hay sesión activa. Inicia sesión.');
        setOwnerSub(sub);
        await loadPractices(sub);
      } catch (e: any) {
        setErr(e?.message || 'No se pudieron cargar las prácticas');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function loadPractices(sub: string) {
    const resp = (await client.graphql({
      query: listPractices,
      variables: {
        filter: { owner: { eq: sub } },
        limit: 200,
      } satisfies ListPracticesQueryVariables,
    })) as any;

    const data = resp?.data as ListPracticesQuery | undefined;
    const practices = (data?.listPractices?.items || []).filter(Boolean) as Practice[];
    practices.sort((a: any, b: any) => (b.date || '').localeCompare(a.date || ''));
    setItems(practices);
    await loadCounts(practices.map(p => p.id));
  }

  async function loadCounts(ids: string[]) {
    try {
      const out: Record<string, number> = {};
      for (const pid of ids) {
        const r = (await client.graphql({
          query: listPracticeCheckIns,
          variables: {
            filter: { practiceId: { eq: pid } },
            limit: 999,
          } satisfies ListPracticeCheckInsQueryVariables,
        })) as any;
        const data = r?.data as ListPracticeCheckInsQuery | undefined;
        out[pid] = (data?.listPracticeCheckIns?.items || []).filter(Boolean).length;
      }
      setCounts(out);
    } catch { /* ignore */ }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!canCreate) return;
    setCreating(true);
    setErr('');
    try {
      const input: CreatePracticeInput = {
        title:    form.title.trim(),
        date:     form.date,
        location: form.location.trim() || undefined,
        notes:    form.notes.trim() || undefined,
        qrToken:  makeQrToken(),
      };
      const resp = (await client.graphql({
        query: createPractice,
        variables: { input } satisfies CreatePracticeMutationVariables,
      })) as any;
      const data    = resp?.data as CreatePracticeMutation | undefined;
      const created = data?.createPractice as Practice | null;
      if (!created) throw new Error('No se pudo crear la práctica.');
      await loadPractices(ownerSub);
      setForm({ title: '', date: isoDateOnly(), location: '', notes: '' });
    } catch (e: any) {
      setErr(e?.message || 'Error creando la práctica');
    } finally {
      setCreating(false);
    }
  }

  if (loading) return <div className="practicas-empty">Cargando prácticas…</div>;

  return (
    <div className="practicas-panel">

      {/* ── Create form ── */}
      <div className="practica-form-card">
        <h2>Crear práctica</h2>

        {err && <div className="practica-error">{err}</div>}

        <form onSubmit={onCreate}>
          <div className="practica-fields">
            <div className="practica-field full-width">
              <label htmlFor="p-title">Título *</label>
              <input
                id="p-title"
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Ej. Práctica Técnica – Lunes"
                required
              />
            </div>

            <div className="practica-field">
              <label htmlFor="p-date">Fecha *</label>
              <input
                id="p-date"
                type="date"
                name="date"
                value={form.date}
                onChange={onChange}
                required
              />
            </div>

            <div className="practica-field">
              <label htmlFor="p-location">Lugar</label>
              <input
                id="p-location"
                name="location"
                value={form.location}
                onChange={onChange}
                placeholder="Ej. Pista cubierta Ibagué"
              />
            </div>

            <div className="practica-field full-width">
              <label htmlFor="p-notes">Notas</label>
              <textarea
                id="p-notes"
                name="notes"
                value={form.notes}
                onChange={onChange}
                placeholder="Observaciones, objetivos del entrenamiento…"
                rows={3}
              />
            </div>
          </div>

          <button type="submit" className="practica-btn-primary" disabled={!canCreate || creating}>
            {creating ? 'Creando…' : 'Crear práctica'}
          </button>
        </form>
      </div>

      {/* ── List ── */}
      <div>
        <div className="practicas-list-header">
          <h2>Prácticas creadas</h2>
          <span className="practicas-count">{items.length} práctica{items.length !== 1 ? 's' : ''}</span>
        </div>

        {items.length === 0 ? (
          <div className="practicas-empty">No has creado prácticas todavía.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((p: any) => (
              <div key={p.id} className="practica-card">
                <div className="practica-card-header">
                  <h3 className="practica-card-title">{p.title}</h3>
                  <span className="practica-card-date">
                    {new Date(p.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                  </span>
                </div>

                {(p.location || p.notes) && (
                  <div className="practica-card-meta">
                    {p.location && <span><strong>Lugar:</strong> {p.location}</span>}
                    {p.notes    && <span><strong>Notas:</strong> {p.notes}</span>}
                  </div>
                )}

                <div className="practica-card-footer">
                  <span className="practica-checkins-badge">
                    ✓ {counts[p.id] ?? '—'} asistentes
                  </span>
                  <button
                    type="button"
                    className="practica-btn-qr"
                    onClick={() => alert(`QR para práctica: ${p.id}`)}
                  >
                    Tomar asistencia (QR)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
