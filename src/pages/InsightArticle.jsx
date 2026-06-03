import { useParams, Link, Navigate } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import ReactMarkdown from "react-markdown";
import { allInsights } from "../data/insights";
import styles from "../styles/InsightArticle.module.css";

export default function InsightArticle() {
  useScrollReveal();
  const { lang } = useLanguage();
  const { id } = useParams();

  // Find the article by id
  const article = allInsights.find((a) => a.id === id);

  // If no article found, redirect to insights hub
  if (!article) return <Navigate to="/insights" replace />;

  const title = article.title[lang] || article.title.en;
  const tag = article.tag[lang] || article.tag.en;
  const content = article.content?.[lang] || article.content?.en;

  // Format the published date
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(
        lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-GB",
        { year: "numeric", month: "long", day: "numeric" },
      )
    : null;

  return (
    <>
      {/* ── ARTICLE HERO ── */}
      <section className={styles.hero} style={{ "--accent": article.color }}>
        <div className="container--narrow">
          <Link to="/insights" className={styles.backLink}>
            ←{" "}
            {lang === "fr"
              ? "Retour aux perspectives"
              : lang === "es"
                ? "Volver a perspectivas"
                : "Back to Insights"}
          </Link>

          <div className={styles.meta}>
            <span className={styles.tag}>{tag}</span>
            {article.isNew && (
              <span className={styles.newBadge}>
                {lang === "fr" ? "Nouveau" : lang === "es" ? "Nuevo" : "New"}
              </span>
            )}
          </div>

          <h1 className={styles.title}>{title}</h1>

          <div className={styles.byline}>
            {formattedDate && (
              <span className={styles.date}>{formattedDate}</span>
            )}
            <span className={styles.readTime}>
              {article.readTime}{" "}
              {lang === "fr"
                ? "min de lecture"
                : lang === "es"
                  ? "min de lectura"
                  : "min read"}
            </span>
          </div>
        </div>
        <div className={styles.accentBar} aria-hidden="true" />
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className={styles.body}>
        <div className="container--narrow">
          {content ? (
            <div className={styles.prose}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            // Shown when content field is not yet written
            <div className={styles.placeholder}>
              <span className={styles.placeholderIcon}>◎</span>
              <h2>
                {lang === "fr"
                  ? "Article en cours de rédaction."
                  : lang === "es"
                    ? "Artículo en preparación."
                    : "Article coming soon."}
              </h2>
              <p>
                {lang === "fr"
                  ? "Ce contenu sera disponible prochainement."
                  : lang === "es"
                    ? "Este contenido estará disponible próximamente."
                    : "This content will be available shortly."}
              </p>
              <Link
                to="/insights"
                className="btn btn--outline"
                style={{ marginTop: "1.5rem" }}
              >
                {lang === "fr"
                  ? "Voir tous les articles →"
                  : lang === "es"
                    ? "Ver todos los artículos →"
                    : "View all articles →"}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── RELATED / NEXT ARTICLES ── */}
      <RelatedArticles current={article} lang={lang} />
    </>
  );
}

// ── Related articles strip ──
function RelatedArticles({ current, lang }) {
  const related = allInsights
    .filter(
      (a) =>
        a.id !== current.id &&
        a.categories?.some((c) => current.categories?.includes(c)),
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  const heading =
    lang === "fr"
      ? "Articles similaires"
      : lang === "es"
        ? "Artículos relacionados"
        : "Related articles";

  return (
    <section className={styles.related}>
      <div className="container">
        <p className="section-label">{heading}</p>
        <div className={styles.relatedGrid}>
          {related.map((article) => {
            const title = article.title[lang] || article.title.en;
            const tag = article.tag[lang] || article.tag.en;
            const excerpt = article.excerpt[lang] || article.excerpt.en;
            return (
              <Link
                key={article.id}
                to={`/insights/${article.id}`}
                className={styles.relatedCard}
                style={{ "--accent": article.color }}
              >
                <span className={styles.relatedTag}>{tag}</span>
                <h3 className={styles.relatedTitle}>{title}</h3>
                <p className={styles.relatedExcerpt}>{excerpt}</p>
                <span className={styles.relatedCta}>
                  {lang === "fr"
                    ? "Lire →"
                    : lang === "es"
                      ? "Leer →"
                      : "Read →"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
