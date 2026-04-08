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

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const gqlClient = generateClient();

const LIST_NOTICIAS = /* GraphQL */ `
  query ListNoticias {
    listNoticias(limit: 100) {
      items { id title date s3Key }
    }
  }
`;

type NoticiaMeta = { id: string; title: string; date: string; url: string };

export default function Noticias() {
  const [search, setSearch] = useSearchParams();
  const [noticias, setNoticias] = useState<NoticiaMeta[]>([]);
  const [loadingNoticias, setLoadingNoticias] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = (await gqlClient.graphql({ query: LIST_NOTICIAS, authMode: 'apiKey' })) as any;
        const items = data?.listNoticias?.items ?? [];
        const resolved: NoticiaMeta[] = items.map((n: any) => ({
          id: n.id,
          title: n.title,
          date: n.date,
          url: buildPublicUrl(n.s3Key),
        }));
        setNoticias(resolved.sort((a, b) => b.date.localeCompare(a.date)));
      } catch {
        // network/auth error — list stays empty
      } finally {
        setLoadingNoticias(false);
      }
    })();
  }, []);

  const byId = useMemo(
    () => Object.fromEntries(noticias.map(n => [n.id, n])),
    [noticias]
  );

  const initial =
    search.get('id') && byId[search.get('id') as string]
      ? (search.get('id') as string)
      : noticias[0]?.id;

  const [currentId, setCurrentId] = useState<string>(initial);

  useEffect(() => {
    if (!byId[currentId] && noticias[0]) setCurrentId(noticias[0].id);
  }, [noticias, byId, currentId]);

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
        <img src={carrerasBanner} alt="Banner Noticias" className="banner-img" />
        <h1 className="banner-title">Noticias</h1>
      </section>

      <main className="boletines-layout">
        {loadingNoticias && (
          <div className="loading" style={{ padding: '3rem', textAlign: 'center', width: '100%' }}>
            Cargando noticias…
          </div>
        )}

        {!loadingNoticias && noticias.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#aaa', width: '100%' }}>
            No hay noticias disponibles.
          </div>
        )}

        {!loadingNoticias && noticias.length > 0 && (
          <>
            <section className="boletin-view">
              <header className="viewer-toolbar">
                <div className="left">
                  <h2 className="viewer-title">{current?.title}</h2>
                  <span className="viewer-date">
                    {new Date(current?.date || '').toLocaleDateString('es-CO', { dateStyle: 'medium' })}
                  </span>
                </div>
                <div className="tools">
                  <a className="btn" href={current?.url} download={downloadName}>Descargar</a>
                  <a className="btn" href={current?.url} target="_blank" rel="noreferrer">Abrir</a>
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

            <aside className="boletin-sidebar">
              <div className="sidebar-head">
                <h3>Noticias</h3>
                <span className="sidebar-subtitle">Selecciona una noticia:</span>
              </div>

              <div className="mobile-actions">
                {noticias.map(n => (
                  <div key={n.id} className="mobile-doc-row">
                    <div className="mobile-doc-title">{n.title}</div>
                    <div className="mobile-doc-buttons">
                      <a href={n.url} target="_blank">Abrir</a>
                      <a href={n.url} download>Descargar</a>
                    </div>
                  </div>
                ))}
              </div>

              <ul className="boletin-list">
                {noticias.map(n => (
                  <li
                    key={n.id}
                    className={`boletin-item ${n.id === currentId ? 'active' : ''}`}
                    onClick={() => setCurrentId(n.id)}
                  >
                    <div className="b-title">{n.title}</div>
                    <div className="b-date">
                      {new Date(n.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
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
