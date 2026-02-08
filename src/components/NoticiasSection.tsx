import { Link } from "react-router-dom";

type NoticiasSectionProps = {
  title?: string;
  wrap?: boolean;
  id?: string;
  className?: string;
};

export default function NoticiasSection({
  title = "Noticias",
  wrap = true,
  id = "noticias",
  className = "",
}: NoticiasSectionProps) {

  // 🔒 Hardcoded: solo Noticias #3 y #4
const items = [
  {
    id: "ene-2025-galardones",
    title: "Galardones de Honor 2025",
    excerpt:
      "La Liga Tolimense de Patinaje rindió homenaje a sus deportistas, exaltando el esfuerzo, la disciplina y los logros obtenidos durante la temporada 2025.",
    image: "/img/galardones-honor.png", 
  },
  {
    id: "ene-2025-asamblea",
    title: "Tolima presente en la Asamblea de Fedepatín",
    excerpt:
      "La Liga participó en la Asamblea Extraordinaria de Fedepatín, contribuyendo a la toma de decisiones estratégicas del patinaje colombiano.",
    image: "/img/asamblea-fedepatin.png",
  },
];


  const grid = (
    <div className="featured-news-grid">
      {items.map(({ id, title, excerpt, image }) => (
        <article key={id} className="featured-news-card">
          <Link
            to={`/noticias?id=${id}`}
            className="featured-news-image"
            aria-label={title}
          >
            <img src={image} alt={title} />
          </Link>

          <div className="featured-news-content">
            <h3>{title}</h3>
            <p>{excerpt}</p>

            <Link
              to={`/noticias?id=${id}`}
              className="featured-news-link"
            >
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
