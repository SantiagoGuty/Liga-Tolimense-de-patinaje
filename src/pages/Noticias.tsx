import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

import carrerasBanner from '../assets/img/grupo_tolima.jpg';
import '../styles/resoluciones.css'; // SAME CSS AS RESOLUCIONES

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

type BoletinMeta = {
  id: string;
  title: string;
  date: string;
  url: string;
};

// File-based Noticias (structure intentionally mirrors Resoluciones)
const BOLETINES: BoletinMeta[] = [
  {
    id: 'ene-2025-logo',
    title: 'Inicio de Temporada – Logo',
    date: '2026-01-12',
    url: '/noticias/NOTICIA 1 LOGO.pdf',
  },
  {
    id: 'ene-2025-reunion',
    title: 'Reunión Inicio de Temporada',
    date: '2026-01-12',
    url: '/noticias/NOTICIA 2 REUNION.pdf',
  },
  {
    id: 'ene-2025-galardones',
    title: 'Galardones Liga',
    date: '2026-01-12',
    url: '/noticias/NOTICIA 3 GALARDONES.pdf',
  },
  {
    id: 'ene-2025-asamblea',
    title: 'Asamblea General',
    date: '2026-01-12',
    url: '/noticias/NOTICIA 4 ASAMBLEA.pdf',
  },
];

export default function Noticias() {
  const [search, setSearch] = useSearchParams();

  const byId = useMemo(
    () => Object.fromEntries(BOLETINES.map(b => [b.id, b])),
    []
  );

  const initial =
    search.get('id') && byId[search.get('id') as string]
      ? (search.get('id') as string)
      : BOLETINES[0]?.id;

  const [currentId, setCurrentId] = useState<string>(initial);
  const current = byId[currentId];

  const [page, setPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.1);
  const [useIframe, setUseIframe] = useState<boolean>(false);

  // Keep selected boletín in URL (?id=...)
  useEffect(() => {
    if (currentId) {
      setSearch({ id: currentId }, { replace: true });
    }
  }, [currentId, setSearch]);

  // Fit-to-width behavior (IDENTICAL to Resoluciones)
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

  // Reset page when switching noticia
  useEffect(() => {
    setPage(1);
    setUseIframe(false);
  }, [currentId]);

  const downloadName = `${current?.title.replace(/\s+/g, '_')}.pdf`;

  return (
    <div className="page-wrapper">
      <Menu_bar />

      {/* Banner — SAME STRUCTURE AS RESOLUCIONES */}
      <section className="page-banner carreras-banner">
        <img
          src={carrerasBanner}
          alt="Banner Noticias"
          className="banner-img"
        />
        <h1 className="banner-title">Noticias</h1>
      </section>

      <main className="boletines-layout">
        {/* Center viewer */}
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
              <a
                className="btn"
                href={current?.url}
                download={downloadName}
              >
                Descargar
              </a>
              <a
                className="btn"
                href={current?.url}
                target="_blank"
                rel="noreferrer"
              >
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
                <Page
                  pageNumber={page}
                  scale={scale}
                  renderAnnotationLayer
                  renderTextLayer
                />
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

        {/* Right menu — SAME CLASSES AS RESOLUCIONES */}
        <aside className="boletin-sidebar">
          <div className="sidebar-head">
            <h3>Noticias</h3>
            <span className="sidebar-subtitle">
              Selecciona una noticia:
            </span>
          </div>

          <ul className="boletin-list">
            {BOLETINES.map(b => (
              <li
                key={b.id}
                className={`boletin-item ${
                  b.id === currentId ? 'active' : ''
                }`}
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
      </main>

      <FooterTol />
    </div>
  );
}
