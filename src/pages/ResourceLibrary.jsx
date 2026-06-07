import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import DownloadGateModal from "../components/DownloadGateModal";
import {
  allResources,
  freeResources,
  premiumResources,
  CATEGORIES,
  getByCategory,
  getFreeByCategory,
  getPremiumByCategory,
} from "../data/resources";
import styles from "../styles/ResourceLibrary.module.css";

export default function ResourceLibrary() {
  useScrollReveal();
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const initType = searchParams.get("type") || "all"; // all | free | premium
  const initCat = searchParams.get("cat") || "all";

  const [typeFilter, setTypeFilter] = useState(initType);
  const [catFilter, setCatFilter] = useState(initCat);
  const [selected, setSelected] = useState(null);
  const [gateResource, setGateResource] = useState(null);

  // Sync URL params when filters change
  useEffect(() => {
    const params = {};
    if (typeFilter !== "all") params.type = typeFilter;
    if (catFilter !== "all") params.cat = catFilter;
    setSearchParams(params, { replace: true });
  }, [typeFilter, catFilter]);

  // Compute filtered list
  const filtered = useMemo(() => {
    let pool = allResources;
    if (typeFilter === "free") pool = freeResources;
    if (typeFilter === "premium") pool = premiumResources;
    if (catFilter !== "all")
      pool = pool.filter((r) => r.categoryId === catFilter);
    return pool;
  }, [typeFilter, catFilter]);

  // Group by category for "all categories" view
  const grouped = useMemo(() => {
    if (catFilter !== "all") return null;
    const groups = {};
    for (const cat of CATEGORIES.filter((c) => c.id !== "all")) {
      const items = filtered.filter((r) => r.categoryId === cat.id);
      if (items.length > 0) groups[cat.id] = { cat, items };
    }
    return groups;
  }, [filtered, catFilter]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="container">
          <Link to="/resources" className={styles.backLink}>
            ← Back to Resources
          </Link>
          <p className="tag tag--amber" data-reveal="fade-up">
            Resource Library
          </p>
          <h1 data-reveal="fade-up">Browse the full library</h1>
          <p className={styles.heroSub} data-reveal="fade-up">
            {allResources.length} resources across {CATEGORIES.length - 1}{" "}
            categories — free tools and premium toolkits for finance and
            operations professionals.
          </p>
        </div>
      </section>

      {/* ── FILTERS ──────────────────────────────────────────── */}
      <div className={styles.filtersBar}>
        <div className="container">
          {/* Type toggle */}
          <div className={styles.typeToggle}>
            {["all", "free", "premium"].map((type) => (
              <button
                key={type}
                className={`${styles.typeBtn} ${typeFilter === type ? styles.typeBtnActive : ""}`}
                onClick={() => setTypeFilter(type)}
              >
                {type === "all"
                  ? "All resources"
                  : type === "free"
                    ? "Free"
                    : "Premium"}
              </button>
            ))}
          </div>

          {/* Category tabs */}
          <div className={styles.catTabs}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.catTab} ${catFilter === cat.id ? styles.catTabActive : ""}`}
                onClick={() => setCatFilter(cat.id)}
              >
                {cat[lang] || cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div className="container">
          <p className={styles.resultCount}>
            {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
            {catFilter !== "all"
              ? ` in ${CATEGORIES.find((c) => c.id === catFilter)?.[lang]}`
              : ""}
            {typeFilter !== "all" ? ` · ${typeFilter}` : ""}
          </p>
        </div>
      </div>

      {/* ── RESULTS ──────────────────────────────────────────── */}
      <section className={styles.results}>
        <div className="container">
          {catFilter === "all" && grouped ? (
            // Grouped by category
            Object.values(grouped).map(({ cat, items }) => {
              const freeItems = items.filter((r) => r.type === "free");
              const premiumItems = items.filter((r) => r.type === "premium");
              return (
                <div key={cat.id} className={styles.categoryBlock}>
                  <div className={styles.categoryBlockHeader}>
                    <h2 className={styles.categoryTitle}>
                      {cat[lang] || cat.en}
                    </h2>
                    <button
                      className={styles.catFilterBtn}
                      onClick={() => setCatFilter(cat.id)}
                    >
                      View all {items.length} →
                    </button>
                  </div>

                  {freeItems.length > 0 && typeFilter !== "premium" && (
                    <div className={styles.tierBlock}>
                      <p className={styles.tierLabel}>Free</p>
                      <div className={styles.libGrid}>
                        {freeItems.map((r) => (
                          <LibCard
                            key={r.id}
                            resource={r}
                            lang={lang}
                            onClick={() => setSelected(r)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {premiumItems.length > 0 && typeFilter !== "free" && (
                    <div className={styles.tierBlock}>
                      <p className={styles.tierLabel}>Premium</p>
                      <div className={styles.libGrid}>
                        {premiumItems.map((r) => (
                          <LibCard
                            key={r.id}
                            resource={r}
                            lang={lang}
                            onClick={() => setSelected(r)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            // Single category or type filter — flat grid
            <div className={styles.libGridFull}>
              {filtered.map((r) => (
                <LibCard
                  key={r.id}
                  resource={r}
                  lang={lang}
                  onClick={() => setSelected(r)}
                />
              ))}
              {filtered.length === 0 && (
                <p className={styles.empty}>
                  No resources match the current filters.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── MODAL ────────────────────────────────────────────── */}
      {selected && (
        <LibModal
          resource={selected}
          lang={lang}
          onClose={() => setSelected(null)}
          onDownload={(r) => {
            setSelected(null);
            setGateResource(r);
          }}
        />
      )}

      {gateResource && (
        <DownloadGateModal
          resource={gateResource}
          onClose={() => setGateResource(null)}
        />
      )}
    </>
  );
}

// ── LibCard ────────────────────────────────────────────────────
function LibCard({ resource, lang, onClick }) {
  const isFree = resource.type === "free";
  return (
    <button
      className={`${styles.libCard} ${isFree ? styles.libCardFree : styles.libCardPremium}`}
      style={{ "--accent": resource.color }}
      onClick={onClick}
    >
      <div className={styles.libCardTop}>
        <span className={styles.libIcon}>{resource.icon}</span>
        {isFree ? (
          <span className={styles.freeBadge}>Free</span>
        ) : (
          <span className={styles.priceBadge}>€{resource.price}</span>
        )}
      </div>
      {resource.isNew && <span className={styles.newBadge}>New</span>}
      <h3 className={styles.libCardTitle}>
        {resource.title[lang] || resource.title.en}
      </h3>
      <p className={styles.libCardDesc}>
        {resource.desc[lang] || resource.desc.en}
      </p>
      <div className={styles.libCardFooter}>
        <span className={styles.format}>{resource.format}</span>
        <span className={styles.cta}>
          {isFree ? "Download →" : "Get access →"}
        </span>
      </div>
    </button>
  );
}

// ── LibModal ───────────────────────────────────────────────────
function LibModal({ resource, lang, onClose, onDownload }) {
  const isFree = resource.type === "free";

  return (
    <div className={styles.overlay} onClick={onClose}>
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
          <span className={styles.modalCat}>
            {resource.category[lang] || resource.category.en}
          </span>
          <span
            className={`${styles.modalBadge} ${isFree ? styles.badgeFree : styles.badgePaid}`}
          >
            {isFree ? "Free" : `€${resource.price}`}
          </span>
        </div>

        {resource.isNew && (
          <span className={styles.newBadge} style={{ marginBottom: "0.5rem" }}>
            New
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
            <p className={styles.includesLabel}>What's included</p>
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
              Download →
            </button>
          ) : resource.purchaseUrl ? (
            <a
              href={resource.purchaseUrl}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              Get access →
            </a>
          ) : (
            <Link to="/contact" className="btn btn--primary" onClick={onClose}>
              Enquire →
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
