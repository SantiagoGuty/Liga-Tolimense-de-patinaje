import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { generateClient } from 'aws-amplify/api';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import '../styles/boletin.css';
import carrerasBanner from '../assets/img/accion_meta.jpg';
import { getPublicUrl } from '../services/storageService';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const gqlClient = generateClient();

const LIST_BOLETINES = /* GraphQL */ `
  query ListBoletins {
    listBoletins(limit: 100) {
      items { id title date s3Key }
    }
  }
`;

type BoletinMeta = {
  id: string;
  title: string;
  date: string;
  url: string;
};


export default function Boletin() {
  const [search, setSearch] = useSearchParams();
  const [boletines, setBoletines] = useState<BoletinMeta[]>([]);
  const [loadingBoletines, setLoadingBoletines] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await gqlClient.graphql({ query: LIST_BOLETINES })) as any;
        const items = data?.listBoletins?.items ?? [];
        const resolved: BoletinMeta[] = await Promise.all(
          items.map(async (b: any) => ({
            id: b.id,
            title: b.title,
            date: b.date,
            url: await getPublicUrl(b.s3Key),
          }))
        );
        setBoletines(resolved.sort((a, b) => b.date.localeCompare(a.date)));
      } catch {
        // network/auth error — list stays empty
      } finally {
        setLoadingBoletines(false);
      }
    })();
  }, []);

  const byId = useMemo(
    () => Object.fromEntries(boletines.map((b: BoletinMeta) => [b.id, b])),
    [boletines]
  );

  const initial =
    search.get('id') && byId[search.get('id') as string]
      ? (search.get('id') as string)
      : boletines[0]?.id;

  const [currentId, setCurrentId] = useState<string>(initial);

  // Keep currentId in sync if boletines list changes
  useEffect(() => {
    if (!byId[currentId] && boletines[0]) setCurrentId(boletines[0].id);
  }, [boletines, byId, currentId]);

  const current = byId[currentId];

  const [page, setPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.1);
  const [useIframe, setUseIframe] = useState(false);

  useEffect(() => {
    if (currentId) setSearch({ id: currentId }, { replace: true });
  }, [currentId, setSearch]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const obs = new ResizeObserver(() => {
      const w = el.clientWidth;
      setScale(Math.max(0.8, Math.min(1.8, w / 900)));
    });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setPage(1);
    setUseIframe(false);
  }, [currentId]);

  const downloadName = `${current?.title.replace(/\s+/g, '_')}.pdf`;

  return (
    <div className="page-wrapper">
      <Menu_bar />

      <section className="page-banner carreras-banner">
        <img src={carrerasBanner} alt="Banner Boletines" className="banner-img" />
        <h1 className="banner-title">Boletines</h1>
      </section>

      <main className="boletines-layout">
        {loadingBoletines && (
          <div className="loading" style={{ padding: '3rem', textAlign: 'center', width: '100%' }}>
            Cargando boletines…
          </div>
        )}

        {!loadingBoletines && boletines.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#aaa', width: '100%' }}>
            No hay boletines disponibles.
          </div>
        )}

        {!loadingBoletines && boletines.length > 0 && (
          <>
            {/* DESKTOP VIEWER */}
            <section className="boletin-view">
              <header className="viewer-toolbar">
                <div className="left">
                  <h2 className="viewer-title">{current?.title}</h2>
                  <span className="viewer-date">
                    {new Date(current?.date || '').toLocaleDateString('es-CO', {
                      dateStyle: 'medium',
                    })}
                  </span>
                </div>

                <div className="tools">
                  <a className="btn" href={current?.url} download={downloadName}>
                    Descargar
                  </a>
                  <a className="btn" href={current?.url} target="_blank" rel="noreferrer">
                    Abrir
                  </a>
                </div>
              </header>

              <div className="viewer-canvas" ref={viewportRef}>
                {!useIframe ? (
                  <Document
                    file={current?.url}
                    onLoadSuccess={() => setPage(1)}
                    onLoadError={() => setUseIframe(true)}
                    loading={<div className="loading">Cargando PDF…</div>}
                  >
                    <Page pageNumber={page} scale={scale} />
                  </Document>
                ) : (
                  <iframe
                    className="iframe-fallback"
                    title={current?.title}
                    src={`${current?.url}#view=FitH`}
                  />
                )}
              </div>
            </section>

            {/* SIDEBAR */}
            <aside className="boletin-sidebar">
              <div className="sidebar-head">
                <h3>Boletines</h3>
                <span className="sidebar-subtitle">Selecciona un boletín:</span>
              </div>

              {/* MOBILE LIST */}
              <div className="mobile-actions">
                {boletines.map(b => (
                  <div key={b.id} className="mobile-doc-row">
                    <div className="mobile-doc-title">{b.title}</div>
                    <div className="mobile-doc-buttons">
                      <a href={b.url} target="_blank">Abrir</a>
                      <a href={b.url} download>Descargar</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP LIST */}
              <ul className="boletin-list">
                {boletines.map(b => (
                  <li
                    key={b.id}
                    className={`boletin-item ${b.id === currentId ? 'active' : ''}`}
                    onClick={() => setCurrentId(b.id)}
                  >
                    <div className="b-title">{b.title}</div>
                    <div className="b-date">
                      {new Date(b.date).toLocaleDateString('es-CO', {
                        dateStyle: 'medium',
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </>
        )}
      </main>

      <FooterTol />
    </div>
  );
}
