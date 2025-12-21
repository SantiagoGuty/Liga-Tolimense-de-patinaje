import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import '../styles/resoluciones.css';
import carrerasBanner from '../assets/img/grupo_tolima.jpg';


// PDF.js worker (works great with Vite + ESM)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

type BoletinMeta = {
  id: string;
  title: string;
  date: string;    // ISO yyyy-mm-dd
  url: string;     // absolute or /public path
};

//  Replace with your real files (you can keep PDFs in /public/resoluciones/*.pdf)
const BOLETINES: BoletinMeta[] = [
  { id: '11 Nov 2025 ', title: 'Resolucion n° 20 - parametros y listado de asistencia a entrenamientos grupo de rendimiento', date: '2025-11-11', url: '/resoluciones/RESOLUCION N° 20 - PARAMETROS Y LISTADO DE ASISTENCIA A ENTRENAMIENTOS GRUPO DE RENDIMIE.pdf' },
  { id: '31 Ago 2025', title: 'Resolucion n° 19 - Resolución de invitación Conversatorio Liga 2025', date: '2025-08-31', url: '/resoluciones/RESOLUCION III RANKING DEPARTAMENTAL 11 Y 12 DE OCTUBRE MELGAR .pdf' },
  { id: '13 Abril 2025', title: 'Resolucion n° 19 - OA', date: '2025-04-13', url: '/resoluciones/RESOLUCION 015  13-04-25.pdf' },
  { id: '8 Abril 2025', title: 'Resolucion n° 14 - OA', date: '2025-04-08', url: '/resoluciones/OA-014 ABRIL 08 -25.pdf' },
  { id: '1 Mar 2025', title: 'Resolucion n° 6 - OA', date: '2025-03-01', url: '/resoluciones/RESOLUCION OA.00 6.pdf' },
];

export default function Resoluciones() {
  const [search, setSearch] = useSearchParams();
  const byId = useMemo(() => Object.fromEntries(BOLETINES.map(b => [b.id, b])), []);
  const initial = search.get('id') && byId[search.get('id') as string]
    ? (search.get('id') as string)
    : BOLETINES[0]?.id;

  const [currentId, setCurrentId] = useState<string>(initial);
  const current = byId[currentId];

  const [page, setPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.1);
  const [useIframe, setUseIframe] = useState(false);

  // Keep selected boletín in the URL (?id=...)
  useEffect(() => {
    if (currentId) setSearch({ id: currentId }, { replace: true });
  }, [currentId, setSearch]);

  // Fit-to-width behavior
  const viewportRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      const w = el.clientWidth;
      // A simple heuristic to keep it nicely sized on different screens
      setScale(Math.max(0.8, Math.min(1.8, w / 900)));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reset page when switching boletín
  useEffect(() => {
    setPage(1);
    setUseIframe(false);
  }, [currentId]);

  const downloadName = `${current?.title.replace(/\s+/g, '_')}.pdf`;

  return (
    <div className="page-wrapper">
      <Menu_bar />

      {/* Banner */}
      <section className="page-banner carreras-banner">
        <img src={carrerasBanner} alt="Banner Patinaje Carreras" className="banner-img" />
        <h1 className="banner-title">Resoluciones</h1>
      </section>

      <main className="boletines-layout">
        {/* Center viewer */}
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
                onLoadError={() => setUseIframe(true)} // fallback if PDFJS can’t parse
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

        {/* Right menu */}
        <aside className="boletin-sidebar">
          <div className="sidebar-head">
            <h3>Resoluciones</h3>
            <span className="sidebar-subtitle">Selecciona una resolución:</span>
          </div>

          <ul className="boletin-list">
            {BOLETINES.map(b => (
              <li
                key={b.id}
                className={`boletin-item ${b.id === currentId ? 'active' : ''}`}
                onClick={() => setCurrentId(b.id)}
              >
                <div className="b-title">{b.title}</div>
                <div className="b-date">
                  {new Date(b.date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
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
