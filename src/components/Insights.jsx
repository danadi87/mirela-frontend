import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import InsightCard from "../components/InsightCard";
import { allInsights } from "../data/insights";
import styles from "../styles/Insights.module.css";

export default function Insights() {
  useScrollReveal();
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Filter labels — "ai" added as first non-all filter
  const filters = [
    { key: "all", label: t("insights", "filterAll") },
    { key: "ai", label: t("insights", "filterAI") },
    { key: "finance", label: t("insights", "filterFinance") },
    { key: "te", label: t("insights", "filterTE") },
    { key: "change", label: t("insights", "filterChange") },
    { key: "tech", label: t("insights", "filterTech") },
  ];

  const filtered =
    activeFilter === "all"
      ? allInsights
      : allInsights.filter((a) => a.categories?.includes(activeFilter));

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">{t("insights", "tag")}</p>
          <h1>{t("insights", "heading")}</h1>
          <p className={styles.heroSub}>{t("insights", "sub")}</p>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ── */}
      {featured && (
        <section className={`section ${styles.featuredSection}`}>
          <div className="container">
            <p className="section-label">{t("insights", "featuredLabel")}</p>
            <div className={`reveal ${styles.featuredWrap}`}>
              <InsightCard article={featured} featured />
            </div>
          </div>
        </section>
      )}

      {/* ── FILTER + ARTICLES GRID ── */}
      <section className="section section--ivory">
        <div className="container">
          <div className={styles.filterRow}>
            <p className="section-label">{t("insights", "allLabel")}</p>
            <div
              className={styles.filters}
              role="group"
              aria-label="Filter articles"
            >
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  className={`${styles.filterBtn} ${
                    activeFilter === key ? styles.active : ""
                  }`}
                  onClick={() => setActiveFilter(key)}
                  aria-pressed={activeFilter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.articlesGrid}>
            {rest.map((article, i) => (
              <div
                key={article.id}
                className={`reveal reveal-delay-${(i % 3) + 1}`}
              >
                <InsightCard article={article} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={styles.empty}>
              {lang === "fr"
                ? "Aucun article dans cette catégorie."
                : lang === "es"
                  ? "No hay artículos en esta categoría."
                  : "No articles in this category yet."}
            </p>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className={`section ${styles.newsletterSection}`}>
        <div className="container--narrow">
          <div className={`reveal ${styles.newsletter}`}>
            <p className="section-label">{t("insights", "newsletterLabel")}</p>
            <h2>{t("insights", "newsletterTitle")}</h2>
            <p className={styles.newsletterSub}>
              {t("insights", "newsletterSub")}
            </p>
            {subscribed ? (
              <div className={styles.successMsg}>
                {lang === "fr"
                  ? "Abonnement confirmé — merci."
                  : lang === "es"
                    ? "Suscripción confirmada — gracias."
                    : "Subscription confirmed — thank you."}
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("insights", "newsletterPlaceholder")}
                  className={styles.emailInput}
                />
                <button type="submit" className="btn btn--primary">
                  {t("insights", "newsletterBtn")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section--dark ${styles.cta}`}>
        <div className="container--narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="tag tag--light">{t("insights", "ctaTag")}</p>
            <h2>{t("insights", "ctaTitle")}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
              {t("insights", "ctaBody")}
            </p>
            <Link to="/resources" className="btn btn--primary">
              {lang === "fr"
                ? "Parcourir les ressources →"
                : lang === "es"
                  ? "Ver los recursos →"
                  : "Browse the Resources →"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
