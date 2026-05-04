import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { generateClient } from 'aws-amplify/api';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import '../styles/resoluciones.css';
import carrerasBanner from '../assets/img/grupo_tolima.jpg';
import { buildPublicUrl } from '../services/storageService';
import { listResolutions } from '../graphql/queries';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const gqlClient = generateClient();

type ResolucionMeta = {
  id: string;
  title: string;
  date: string;
  url: string;
};

export default function Resoluciones() {
  const [search, setSearch] = useSearchParams();
  const [resoluciones, setResoluciones] = useState<ResolucionMeta[]>([]);
  const [loadingResoluciones, setLoadingResoluciones] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await gqlClient.graphql({
          query: listResolutions,
          variables: { limit: 100 },
          authMode: 'apiKey',
        })) as any;
        const items = data?.listResolutions?.items ?? [];
        const resolved: ResolucionMeta[] = items.map((r: any) => ({
          id: r.id,
          title: r.title,
          date: r.date,
          url: buildPublicUrl(r.s3Key),
        }));
        setResoluciones(resolved.sort((a, b) => b.date.localeCompare(a.date)));
      } catch {
        // list stays empty
      } finally {
        setLoadingResoluciones(false);
      }
    })();
  }, []);

  const byId = useMemo(
    () => Object.fromEntries(resoluciones.map((r) => [r.id, r])),
    [resoluciones]
  );

  const initial =
    search.get('id') && byId[search.get('id') as string]
      ? (search.get('id') as string)
      : resoluciones[0]?.id;

  const [currentId, setCurrentId] = useState<string>(initial);

  useEffect(() => {
    if (!byId[currentId] && resoluciones[0]) setCurrentId(resoluciones[0].id);
  }, [resoluciones, byId, currentId]);

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
        <img src={carrerasBanner} alt="Banner Resoluciones" className="banner-img" />
        <h1 className="banner-title">Resoluciones</h1>
      </section>

      <main className="boletines-layout">
        {loadingResoluciones && (
          <div className="loading" style={{ padding: '3rem', textAlign: 'center', width: '100%' }}>
            Cargando resoluciones…
          </div>
        )}

        {!loadingResoluciones && resoluciones.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#aaa', width: '100%' }}>
            No hay resoluciones disponibles.
          </div>
        )}

        {!loadingResoluciones && resoluciones.length > 0 && (
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
                    <Page pageNumber={page} scale={scale} renderAnnotationLayer renderTextLayer />
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
                <h3>Resoluciones</h3>
                <span className="sidebar-subtitle">Selecciona una resolución:</span>
              </div>

              {/* MOBILE LIST */}
              <div className="mobile-actions">
                {resoluciones.map((r) => (
                  <div key={r.id} className="mobile-doc-row">
                    <div className="mobile-doc-title">{r.title}</div>
                    <div className="mobile-doc-buttons">
                      <a href={r.url} target="_blank" rel="noreferrer">Abrir</a>
                      <a href={r.url} download>Descargar</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP LIST */}
              <ul className="boletin-list">
                {resoluciones.map((r) => (
                  <li
                    key={r.id}
                    className={`boletin-item ${r.id === currentId ? 'active' : ''}`}
                    onClick={() => setCurrentId(r.id)}
                  >
                    <div className="b-title">{r.title}</div>
                    <div className="b-date">
                      {new Date(r.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
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
