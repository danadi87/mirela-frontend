import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/InsightCard.module.css";

export default function InsightCard({ article, featured = false }) {
  const { lang, t } = useLanguage();

  const title = article.title[lang] || article.title.en;
  const excerpt = article.excerpt[lang] || article.excerpt.en;
  const tag = article.tag[lang] || article.tag.en;

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      style={{ "--accent": article.color }}
    >
      <div className={styles.cardInner}>
        <div className={styles.meta}>
          <span className={styles.tag}>{tag}</span>
          {article.isNew && (
            <span className={styles.newBadge}>{t("resources", "new")}</span>
          )}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.readTime}>
            {article.readTime} {t("resources", "readTime")}
          </span>
          <Link
            to={`/insights/${article.id}`}
            className={`btn btn--ghost ${styles.cta}`}
          >
            {t("resources", "readMore")}
          </Link>
        </div>
      </div>
      <div className={styles.accentBar} aria-hidden="true" />
    </article>
  );
}
