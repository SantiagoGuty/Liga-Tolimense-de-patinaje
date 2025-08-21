import { Link } from "react-router-dom";
import noticias from "../data/noticias";

type NoticiasSectionProps = {
  /** Heading above the grid (omit to hide) */
  title?: string;
  /** How many cards to render; omit to show all */
  limit?: number;
  /** If false, render ONLY the grid (no surrounding section/heading) */
  wrap?: boolean;
  /** Optional id for the outer section */
  id?: string;
  /** Extra class for the outer wrapper */
  className?: string;
};

export default function NoticiasSection({
  title = "Noticias",
  limit,
  wrap = true,
  id = "noticias",
  className = "",
}: NoticiasSectionProps) {
    
  const items = limit ? noticias.slice(0, limit) : noticias;

  const grid = (
    <div className="news-cards-container">
      {items.map(({ slug, title, excerpt, image }) => (
        <article key={slug} className="news-card">
          {/* Image also navigates */}
          <Link to={`/noticias/${slug}`} className="news-card-image" aria-label={title}>
            <img src={image} alt={title} />
          </Link>

          <div className="news-card-content">
            <h3>{title}</h3>
            <p>{excerpt}</p>
            <Link to={`/noticias/${slug}`} className="read-more">
              Leer más
            </Link>
          </div>
        </article>
      ))}
    </div>
  );

  if (!wrap) return grid;

  return (
    <section className={`noticias ${className}`} id={id}>
      {title && <h1>{title}</h1>}
      {grid}
    </section>
  );
}
