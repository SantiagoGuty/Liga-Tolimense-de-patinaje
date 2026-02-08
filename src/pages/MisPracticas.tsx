// src/pages/MisPracticas.tsx
import { useEffect, useMemo, useState } from "react";
import Menu_bar from "../components/Menu_bar";
import FooterTol from "../components/FooterTol";

import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";

import type {
  Practice,
  CreatePracticeInput,
  ListPracticesQuery,
  ListPracticesQueryVariables,
  CreatePracticeMutation,
  CreatePracticeMutationVariables,
  ListPracticeCheckInsQuery,
  ListPracticeCheckInsQueryVariables,
} from "../API";

import { listPractices, listPracticeCheckIns } from "../graphql/queries";
import { createPractice } from "../graphql/mutations";

const client = generateClient();

function isoDateOnly(d = new Date()) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

function makeQrToken() {
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function MisPracticas() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState<Practice[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [ownerSub, setOwnerSub] = useState("");

  const [form, setForm] = useState({
    title: "",
    date: isoDateOnly(),
    location: "",
    notes: "",
  });

  const [creating, setCreating] = useState(false);

  const canCreate = useMemo(
    () => form.title.trim().length > 0 && form.date.trim().length > 0,
    [form.title, form.date]
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");

        const session = await fetchAuthSession();
        const sub = session.tokens?.idToken?.payload?.sub as string | undefined;
        if (!sub) throw new Error("No hay sesión activa. Inicia sesión.");

        setOwnerSub(sub);
        await loadPractices(sub);
      } catch (e: any) {
        setErr(e?.message || "No se pudieron cargar las prácticas");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function loadPractices(sub: string) {
    // ✅ NO generics here
    const resp = (await client.graphql({
      query: listPractices,
      variables: {
        filter: { owner: { eq: sub } },
        limit: 200,
      } satisfies ListPracticesQueryVariables,
    })) as any;

    const data = resp?.data as ListPracticesQuery | undefined;

    const practices = (data?.listPractices?.items || []).filter(Boolean) as Practice[];
    practices.sort((a: any, b: any) => (b.date || "").localeCompare(a.date || ""));
    setItems(practices);

    await loadCounts(practices.map((p) => p.id));
  }

  async function loadCounts(practiceIds: string[]) {
    try {
      const out: Record<string, number> = {};

      for (const pid of practiceIds) {
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
    } catch {
      // ignore if checkins not ready
    }
  }

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!canCreate) return;

    setCreating(true);
    setErr("");

    try {
      // ✅ qrToken is REQUIRED
      const input: CreatePracticeInput = {
        title: form.title.trim(),
        date: form.date,
        location: form.location.trim() || undefined,
        notes: form.notes.trim() || undefined,
        qrToken: makeQrToken(),
      };

      // ✅ NO generics here
      const resp = (await client.graphql({
        query: createPractice,
        variables: { input } satisfies CreatePracticeMutationVariables,
      })) as any;

      const data = resp?.data as CreatePracticeMutation | undefined;
      const created = data?.createPractice as Practice | null;

      if (!created) throw new Error("No se pudo crear la práctica.");

      await loadPractices(ownerSub);
      setForm({ title: "", date: isoDateOnly(), location: "", notes: "" });
    } catch (e: any) {
      setErr(e?.message || "Error creando la práctica");
    } finally {
      setCreating(false);
    }
  }

  if (loading) return null;

  return (
    <div className="page-wrapper">
      <Menu_bar />

      <div className="main-content" style={{ padding: "1rem", maxWidth: 900, margin: "0 auto" }}>
        <h1>Mis prácticas</h1>
        {err && <p style={{ color: "red", fontWeight: 600 }}>{err}</p>}

        <section style={{ marginTop: 16, padding: 16, border: "1px solid #333", borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>Crear práctica</h2>

          <form onSubmit={onCreate} style={{ display: "grid", gap: 12 }}>
            <label>
              Título *
              <input name="title" value={form.title} onChange={onChange} required />
            </label>

            <label>
              Fecha *
              <input type="date" name="date" value={form.date} onChange={onChange} required />
            </label>

            <label>
              Lugar
              <input name="location" value={form.location} onChange={onChange} />
            </label>

            <label>
              Notas
              <textarea name="notes" value={form.notes} onChange={onChange} rows={3} />
            </label>

            <button type="submit" disabled={!canCreate || creating}>
              {creating ? "Creando…" : "Crear práctica"}
            </button>
          </form>
        </section>

        <section style={{ marginTop: 22 }}>
          <h2>Prácticas creadas</h2>

          {items.length === 0 ? (
            <p>No has creado prácticas todavía.</p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {items.map((p: any) => (
                <div key={p.id} style={{ padding: 14, border: "1px solid #333", borderRadius: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <strong style={{ fontSize: 18 }}>{p.title}</strong>
                    <span>{p.date}</span>
                  </div>

                  {p.location ? <div style={{ marginTop: 6 }}><b>Lugar:</b> {p.location}</div> : null}
                  {p.notes ? <div><b>Notas:</b> {p.notes}</div> : null}

                  <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700 }}>Check-ins: {counts[p.id] ?? "—"}</span>
                    <button type="button" onClick={() => alert(`Luego: pantalla QR para práctica ${p.id}`)}>
                      Tomar asistencia (QR)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <FooterTol />
    </div>
  );
}
