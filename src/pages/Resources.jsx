import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import DownloadGateModal from "../components/DownloadGateModal";
import {
  allResources,
  freeResources,
  premiumResources,
} from "../data/resources";
import styles from "../styles/Resources.module.css";

// Pick 9 free resources — one per category then fill
function pickNine(pool) {
  const cats = [...new Set(pool.map((r) => r.categoryId))];
  const picked = [];
  // First pass: one per category
  for (const cat of cats) {
    const match = pool.find((r) => r.categoryId === cat && !picked.includes(r));
    if (match) picked.push(match);
  }
  // Fill to 9 with remaining
  for (const r of pool) {
    if (picked.length >= 9) break;
    if (!picked.includes(r)) picked.push(r);
  }
  return picked.slice(0, 9);
}

const FEATURED_FREE = pickNine(freeResources);
const FEATURED_PREMIUM = pickNine(premiumResources);

export default function Resources() {
  useScrollReveal();
  const { t, lang } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [gateResource, setGateResource] = useState(null);

  const isFree = selected?.type === "free";

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--amber" data-reveal="fade-up">
            {t("resources", "tag")}
          </p>
          <h1 data-reveal="fade-up">{t("resources", "heading")}</h1>
          <p className={styles.heroSub} data-reveal="fade-up">
            {t("resources", "sub")}
          </p>
        </div>
      </section>

      {/* ── FREE RESOURCES ───────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container">
          <div className={styles.sectionHeader} data-reveal="fade-up">
            <div>
              <p className="section-label">{t("resources", "freeLabel")}</p>
              <h2 className="section-title">{t("resources", "freeTitle")}</h2>
            </div>
            <Link
              to="/resources/library?type=free"
              className={styles.browseLink}
            >
              Browse full library →
            </Link>
          </div>

          <div className={styles.resourcesGrid} data-reveal="fade-up">
            {FEATURED_FREE.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                lang={lang}
                t={t}
                onClick={() => setSelected(resource)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM RESOURCES ────────────────────────────────── */}
      <section
        className="section"
        style={{ paddingTop: "2rem", background: "var(--ivory)" }}
      >
        <div className="container">
          <div className={styles.sectionHeader} data-reveal="fade-up">
            <div>
              <p className="section-label">{t("resources", "premLabel")}</p>
              <h2 className="section-title">{t("resources", "premTitle")}</h2>
            </div>
            <Link
              to="/resources/library?type=premium"
              className={styles.browseLink}
            >
              Browse full library →
            </Link>
          </div>

          <div className={styles.premiumGrid} data-reveal="fade-up">
            {FEATURED_PREMIUM.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                lang={lang}
                t={t}
                onClick={() => setSelected(resource)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className="cta-band" data-reveal="fade-up">
            <p className="tag tag--amber">{t("resources", "ctaTag")}</p>
            <h2>{t("resources", "ctaTitle")}</h2>
            <p>{t("resources", "ctaBody")}</p>
            <div className="cta-actions">
              <Link to="/enquiry" className="btn btn--primary">
                {t("resources", "ctaBtn1")}
              </Link>
              <Link to="/services" className="btn btn--outline">
                {t("resources", "ctaBtn2")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESOURCE MODAL ───────────────────────────────────── */}
      {selected && (
        <ResourceModal
          resource={selected}
          lang={lang}
          t={t}
          onClose={() => setSelected(null)}
          onDownload={(r) => {
            setSelected(null);
            setGateResource(r);
          }}
        />
      )}

      {/* ── DOWNLOAD GATE ────────────────────────────────────── */}
      {gateResource && (
        <DownloadGateModal
          resource={gateResource}
          onClose={() => setGateResource(null)}
        />
      )}
    </>
  );
}

// ── ResourceCard ───────────────────────────────────────────────
function ResourceCard({ resource, lang, t, onClick }) {
  const isFree = resource.type === "free";
  return (
    <button
      className={`${styles.resourceCard} ${isFree ? styles.freeCard : styles.premiumCard}`}
      style={{ "--accent": resource.color }}
      onClick={onClick}
    >
      <div className={styles.cardTop}>
        <span className={styles.resourceIcon}>{resource.icon}</span>
        {isFree ? (
          <span className={styles.freeBadge}>{t("resources", "free")}</span>
        ) : (
          <span className={styles.priceBadge}>€{resource.price}</span>
        )}
      </div>
      {resource.isNew && (
        <span className={styles.newBadge}>{t("resources", "new")}</span>
      )}
      <p className={styles.resourceCategory}>
        {resource.category[lang] || resource.category.en}
      </p>
      <h3 className={styles.resourceTitle}>
        {resource.title[lang] || resource.title.en}
      </h3>
      <p className={styles.resourceDesc}>
        {resource.desc[lang] || resource.desc.en}
      </p>
      <div className={styles.cardFooter}>
        <span className={styles.format}>{resource.format}</span>
        <span className={styles.cardCta}>
          {isFree ? t("resources", "download") : t("resources", "buy")}
        </span>
      </div>
    </button>
  );
}

// ── ResourceModal ──────────────────────────────────────────────
function ResourceModal({ resource, lang, t, onClose, onDownload }) {
  const isFree = resource.type === "free";

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        style={{ "--accent": resource.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>
          ✕
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.modalIcon}>{resource.icon}</span>
          <span className={styles.modalCategory}>
            {resource.category[lang] || resource.category.en}
          </span>
          <span
            className={`${styles.modalBadge} ${isFree ? styles.free : styles.paid}`}
          >
            {isFree ? t("resources", "free") : `€${resource.price}`}
          </span>
        </div>

        {resource.isNew && (
          <span className={styles.newBadge} style={{ marginBottom: "0.5rem" }}>
            {t("resources", "new")}
          </span>
        )}

        <h2 className={styles.modalTitle}>
          {resource.title[lang] || resource.title.en}
        </h2>
        <p className={styles.modalDesc}>
          {resource.desc[lang] || resource.desc.en}
        </p>

        {resource.includes?.length > 0 && (
          <div className={styles.modalIncludes}>
            <p className={styles.modalIncludesLabel}>What's included</p>
            <ul>
              {resource.includes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <p className={styles.modalFormat}>{resource.format}</p>

        <div className={styles.modalActions}>
          {isFree ? (
            <button
              className="btn btn--primary"
              onClick={() => onDownload(resource)}
            >
              {t("resources", "download")}
            </button>
          ) : resource.purchaseUrl ? (
            <a
              href={resource.purchaseUrl}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              {t("resources", "buy")}
            </a>
          ) : (
            <Link to="/contact" className="btn btn--primary" onClick={onClose}>
              {t("resources", "buy")}
            </Link>
          )}
          <button className="btn btn--outline" onClick={onClose}>
            {lang === "fr" ? "Fermer" : lang === "es" ? "Cerrar" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
