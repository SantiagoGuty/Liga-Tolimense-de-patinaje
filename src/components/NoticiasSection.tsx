import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getFeaturedNoticiaIds } from '../services/siteConfigService';

const gqlClient = generateClient();

const LIST_NOTICIAS = /* GraphQL */ `
  query ListNoticias {
    listNoticias(limit: 100) {
      items { id title date }
    }
  }
`;

type NoticiaMeta = { id: string; title: string; date: string };

type NoticiasSectionProps = {
  title?: string;
  wrap?: boolean;
  id?: string;
  className?: string;
};

export default function NoticiasSection({
  title = 'Noticias',
  wrap = true,
  id = 'noticias',
  className = '',
}: NoticiasSectionProps) {
  const [items, setItems] = useState<NoticiaMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data }, featuredIds] = await Promise.all([
          (gqlClient.graphql({ query: LIST_NOTICIAS, authMode: 'apiKey' }) as Promise<any>),
          getFeaturedNoticiaIds(),
        ]);

        const all: NoticiaMeta[] = (data?.listNoticias?.items ?? [])
          .sort((a: NoticiaMeta, b: NoticiaMeta) => b.date.localeCompare(a.date));

        if (featuredIds && featuredIds.length > 0) {
          // Show featured ones (in the order the admin picked them), fall back to recent for any missing id
          const featuredMap = Object.fromEntries(all.map(n => [n.id, n]));
          const featured = featuredIds
            .map(fid => featuredMap[fid])
            .filter(Boolean) as NoticiaMeta[];
          // If some featured ids no longer exist, pad with most recent non-featured
          if (featured.length < 3) {
            const featuredSet = new Set(featured.map(n => n.id));
            const extra = all.filter(n => !featuredSet.has(n.id)).slice(0, 3 - featured.length);
            setItems([...featured, ...extra]);
          } else {
            setItems(featured.slice(0, 3));
          }
        } else {
          // Default: 3 most recent
          setItems(all.slice(0, 3));
        }
      } catch {
        // Network/auth error — show nothing, don't crash
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // While loading or empty, render nothing (don't crash the home page)
  if (loading || items.length === 0) return null;

  const grid = (
    <div className="featured-news-grid">
      {items.map(({ id: nid, title: ntitle, date }) => (
        <article key={nid} className="featured-news-card">
          <Link
            to={`/noticias?id=${nid}`}
            className="featured-news-image"
            aria-label={ntitle}
          >
            {/* Placeholder gradient instead of image — admins upload PDFs, not images */}
            <div style={{
              width: '100%', height: '100%', minHeight: 140,
              background: 'linear-gradient(135deg, #8b1a1a 0%, #c0392b 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
          </Link>

          <div className="featured-news-content">
            <h3>{ntitle}</h3>
            <p style={{ fontSize: '0.82rem', color: '#888' }}>
              {new Date(date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}
            </p>
            <Link to={`/noticias?id=${nid}`} className="featured-news-link">
              Leer noticia →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );

  if (!wrap) return grid;

  return (
    <section className={`featured-news ${className}`} id={id}>
      {title && <h2 className="featured-news-title">{title}</h2>}
      {grid}
    </section>
  );
}
