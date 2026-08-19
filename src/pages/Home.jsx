import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import InsightCard from "../components/InsightCard";
import ResourceTeaser from "../components/ResourceTeaser";
import { allInsights } from "../data/insights";
import { freeResources, premiumResources } from "../data/resources";
import styles from "../styles/Home.module.css";

// Pick up to `max` resources — one per category first, then fill
function pickByCategory(pool, max) {
  const cats = [...new Set(pool.map((r) => r.categoryId))];
  const picked = [];
  // First pass: one per category
  for (const cat of cats) {
    if (picked.length >= max) break;
    const match = pool.find((r) => r.categoryId === cat && !picked.includes(r));
    if (match) picked.push(match);
  }
  // Fill remaining slots with whatever is next in the pool
  for (const r of pool) {
    if (picked.length >= max) break;
    if (!picked.includes(r)) picked.push(r);
  }
  return picked;
}

// Computed once — one resource per category, up to 6
const HOME_FREE = pickByCategory(freeResources, 6);
const HOME_PREMIUM = pickByCategory(premiumResources, 6);

export default function Home() {
  useScrollReveal();
  const { t } = useLanguage();

  // Latest article = first in the array (keep insights.js sorted newest first)
  const featuredArticle = allInsights[0];
  const otherArticles = allInsights.slice(1, 7); // up to 6 supporting cards

  return (
    <>
      {/*INSIGHTS & ARTICLES — primary homepage content*/}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="reveal">
              <p className="section-label">{t("home", "insightsLabel")}</p>
              <h2>{t("home", "insightsTitle")}</h2>
            </div>
            <Link
              to="/insights"
              className={`btn btn--ghost reveal reveal-delay-2 ${styles.seeAll}`}
            >
              {t("home", "insightsAll")}
            </Link>
          </div>

          {/* Featured / latest article — full-width hero card */}
          {featuredArticle && (
            <div className={`reveal ${styles.featuredArticleWrap}`}>
              <InsightCard article={featuredArticle} featured />
            </div>
          )}

          {/* Supporting articles grid */}
          <div className={styles.insightsGrid}>
            {otherArticles.map((article, i) => (
              <div
                key={article.id}
                className={`reveal reveal-delay-${(i % 3) + 1}`}
              >
                <InsightCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*FREE RESOURCES*/}
      <section className="section section--ivory">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="reveal">
              <p className="section-label">{t("home", "resourcesLabel")}</p>
              <h2>{t("home", "resourcesTitle")}</h2>
            </div>
            <Link
              to="/resources"
              className={`btn btn--ghost reveal reveal-delay-2 ${styles.seeAll}`}
            >
              {t("home", "resourcesAll")}
            </Link>
          </div>
          <div className={styles.resourcesGrid}>
            {HOME_FREE.map((resource, i) => (
              <div
                key={resource.id}
                className={`reveal reveal-delay-${(i % 3) + 1}`}
              >
                <ResourceTeaser resource={resource} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*PAID RESOURCES*/}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="reveal">
              <p className="section-label">{t("home", "premiumLabel")}</p>
              <h2>{t("home", "premiumTitle")}</h2>
            </div>
            <Link
              to="/resources"
              className={`btn btn--ghost reveal reveal-delay-2 ${styles.seeAll}`}
            >
              {t("home", "premiumAll")}
            </Link>
          </div>
          <div className={styles.resourcesGrid}>
            {HOME_PREMIUM.map((resource, i) => (
              <div
                key={resource.id}
                className={`reveal reveal-delay-${(i % 3) + 1}`}
              >
                <ResourceTeaser resource={resource} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*CTA BAND*/}
      <section className={`section--dark ${styles.ctaBand}`}>
        <div className={`container ${styles.ctaInner}`}>
          <div className="reveal">
            <p className="tag tag--light">{t("home", "ctaTag")}</p>
            <h2>{t("home", "ctaTitle")}</h2>
            <p>{t("home", "ctaBody")}</p>
          </div>
          <div className={`reveal reveal-delay-2 ${styles.ctaActions}`}>
            <Link to="/resources" className="btn btn--primary">
              {t("home", "ctaBtn1")}
            </Link>
            <Link to="/insights" className="btn btn--outline-light">
              {t("home", "ctaBtn2")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
