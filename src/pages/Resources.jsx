import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/Resources.module.css";

// ─── DATA ────────────────────────────────────────────────────────
const freeResources = [
  {
    id: "te-checklist",
    icon: "◈",
    category: {
      en: "T&E Implementation",
      es: "Implementación T&E",
      fr: "Implémentation T&E",
    },
    title: {
      en: "European T&E Implementation Checklist",
      es: "Checklist de Implementación T&E Europea",
      fr: "Checklist d'Implémentation T&E Européenne",
    },
    desc: {
      en: "47 things most organisations miss before go-live — from vendor evaluation to hypercare planning. Built from real programme experience across 10+ European markets.",
      es: "47 puntos que la mayoría de las organizaciones pasan por alto antes del lanzamiento — desde la evaluación del proveedor hasta la planificación del hypercare. Basado en experiencia real en más de 10 mercados europeos.",
      fr: "47 points que la plupart des organisations manquent avant le go-live — de l'évaluation fournisseur à la planification du hypercare. Issu d'une expérience réelle sur 10+ marchés européens.",
    },
    format: "PDF · 8 pages",
    color: "#1A3C5E",
  },
  {
    id: "change-framework",
    icon: "◎",
    category: {
      en: "Change Management",
      es: "Gestión del Cambio",
      fr: "Conduite du Changement",
    },
    title: {
      en: "Multilingual Change Management Framework",
      es: "Marco de Gestión del Cambio Multilingüe",
      fr: "Cadre de Conduite du Changement Multilingue",
    },
    desc: {
      en: "A practical framework for designing change programmes that work across European markets — covering communication strategy, training design, and adoption measurement.",
      es: "Un marco práctico para diseñar programas de cambio que funcionen en los mercados europeos — comunicación, formación y medición de la adopción.",
      fr: "Un cadre pratique pour concevoir des programmes de changement efficaces sur les marchés européens — stratégie de communication, conception de formation et mesure de l'adoption.",
    },
    format: "PDF · 12 pages",
    color: "#1E6B4A",
  },
  {
    id: "vendor-scorecard",
    icon: "◉",
    category: {
      en: "Vendor Management",
      es: "Gestión de Proveedores",
      fr: "Gestion des Fournisseurs",
    },
    title: {
      en: "T&E Vendor Evaluation Scorecard",
      es: "Scorecard de Evaluación de Proveedores T&E",
      fr: "Scorecard d'Évaluation Fournisseurs T&E",
    },
    desc: {
      en: "A structured RFP scoring template for evaluating T&E platform vendors — covering functionality, implementation support, commercial terms, and European compliance.",
      es: "Una plantilla estructurada para evaluar proveedores de plataformas T&E — funcionalidad, soporte de implementación, términos comerciales y cumplimiento europeo.",
      fr: "Un modèle structuré de scoring RFP pour évaluer les fournisseurs de plateformes T&E — fonctionnalité, support à l'implémentation, termes commerciaux et conformité européenne.",
    },
    format: "Excel + PDF",
    color: "#C07A2D",
  },
];

const premiumResources = [
  {
    id: "te-playbook",
    icon: "◆",
    category: {
      en: "Complete Playbook",
      es: "Guía Completa",
      fr: "Guide Complet",
    },
    badge: { en: "New", es: "Nuevo", fr: "Nouveau" },
    title: {
      en: "The European T&E Transformation Playbook",
      es: "La Guía Completa de Transformación T&E Europea",
      fr: "Le Guide Complet de Transformation T&E Européenne",
    },
    desc: {
      en: "The complete end-to-end guide to running a T&E platform implementation across European markets. Covers vendor selection, stakeholder management, change management, country-by-country considerations, and go-live planning. 80+ pages of actionable content.",
      es: "La guía completa de principio a fin para ejecutar una implementación de plataforma T&E en mercados europeos. Selección de proveedor, gestión de stakeholders, gestión del cambio, consideraciones por país y planificación del go-live. Más de 80 páginas de contenido práctico.",
      fr: "Le guide complet de bout en bout pour piloter une implémentation de plateforme T&E sur les marchés européens. Sélection fournisseur, gestion des parties prenantes, conduite du changement, considérations par pays et planification du go-live. Plus de 80 pages de contenu actionnable.",
    },
    includes: {
      en: [
        "80+ page guide",
        "5 ready-to-use templates",
        "Country-specific compliance notes",
        "Stakeholder RACI matrix",
        "Go-live readiness checklist",
      ],
      es: [
        "Guía de más de 80 páginas",
        "5 plantillas listas para usar",
        "Notas de cumplimiento por país",
        "Matriz RACI de stakeholders",
        "Checklist de preparación para go-live",
      ],
      fr: [
        "Guide de plus de 80 pages",
        "5 modèles prêts à utiliser",
        "Notes de conformité par pays",
        "Matrice RACI des parties prenantes",
        "Checklist de préparation au go-live",
      ],
    },
    price: "€149",
    format: "PDF + Excel templates",
    color: "#1A3C5E",
  },
  {
    id: "change-toolkit",
    icon: "◇",
    category: {
      en: "Toolkit",
      es: "Kit de Herramientas",
      fr: "Boîte à outils",
    },
    title: {
      en: "Change Management Toolkit for European Rollouts",
      es: "Kit de Herramientas de Gestión del Cambio para Despliegues Europeos",
      fr: "Boîte à Outils de Conduite du Changement pour Déploiements Européens",
    },
    desc: {
      en: "A complete toolkit of ready-to-adapt templates for managing change in multilingual, multi-country implementations. Includes communication templates in EN/ES/FR, training guides, adoption dashboards, and stakeholder engagement plans.",
      es: "Un completo kit de plantillas listas para adaptar para gestionar el cambio en implementaciones multilingües y multinacionales. Incluye plantillas de comunicación en EN/ES/FR, guías de formación, dashboards de adopción y planes de engagement.",
      fr: "Une boîte à outils complète de modèles prêts à adapter pour gérer le changement dans des implémentations multilingues et multi-pays. Inclut des modèles de communication EN/ES/FR, guides de formation, tableaux de bord d'adoption et plans d'engagement.",
    },
    includes: {
      en: [
        "Communication templates (EN/ES/FR)",
        "Training session guides",
        "Adoption measurement dashboard",
        "Local champion programme guide",
        "Resistance management playbook",
      ],
      es: [
        "Plantillas de comunicación (EN/ES/FR)",
        "Guías de sesiones de formación",
        "Dashboard de medición de adopción",
        "Guía del programa de campeones locales",
        "Playbook de gestión de resistencias",
      ],
      fr: [
        "Modèles de communication (EN/ES/FR)",
        "Guides de sessions de formation",
        "Tableau de bord de mesure d'adoption",
        "Guide du programme de champions locaux",
        "Playbook de gestion des résistances",
      ],
    },
    price: "€99",
    format: "Word + PowerPoint + Excel",
    color: "#1E6B4A",
  },
  {
    id: "consulting-session",
    icon: "○",
    category: {
      en: "1:1 Session",
      es: "Sesión Individual",
      fr: "Session Individuelle",
    },
    title: {
      en: "90-Minute Programme Review Session",
      es: "Sesión de Revisión de Programa de 90 Minutos",
      fr: "Session de Revue de Programme de 90 Minutes",
    },
    desc: {
      en: "A focused 90-minute working session where I review your current T&E or finance transformation programme and give you specific, actionable recommendations. Includes a written summary and priority action list delivered within 48 hours.",
      es: "Una sesión de trabajo de 90 minutos donde reviso tu programa T&E o de transformación financiera y te doy recomendaciones específicas y accionables. Incluye resumen escrito y lista de acciones prioritarias entregadas en 48 horas.",
      fr: "Une session de travail de 90 minutes où je passe en revue votre programme T&E ou de transformation financière et vous donne des recommandations spécifiques et actionnables. Inclut un résumé écrit et une liste d'actions prioritaires livré sous 48 heures.",
    },
    includes: {
      en: [
        "90-min video call",
        "Pre-session questionnaire",
        "Programme review framework",
        "Written recommendations (48h)",
        "Priority action list",
      ],
      es: [
        "Llamada de vídeo de 90 min",
        "Cuestionario previo a la sesión",
        "Marco de revisión del programa",
        "Recomendaciones escritas (48h)",
        "Lista de acciones prioritarias",
      ],
      fr: [
        "Appel vidéo de 90 min",
        "Questionnaire pré-session",
        "Cadre de revue du programme",
        "Recommandations écrites (48h)",
        "Liste d'actions prioritaires",
      ],
    },
    price: "€299",
    format: "Video call + Written deliverable",
    color: "#C07A2D",
  },
];

const articles = [
  {
    id: "art-1",
    tag: { en: "Implementation", es: "Implementación", fr: "Implémentation" },
    title: {
      en: "5 reasons T&E implementations fail in Europe",
      es: "5 razones por las que las implementaciones T&E fracasan en Europa",
      fr: "5 raisons pour lesquelles les implémentations T&E échouent en Europe",
    },
    excerpt: {
      en: "The technology is rarely the problem. The CFO who wasn't briefed, the country manager who opted out, the training that happened once — these are the real risks in any European programme.",
      es: "La tecnología rara vez es el problema. El CFO que no fue informado, el director de país que se desvinculó, la formación que ocurrió una sola vez — estos son los riesgos reales en cualquier programa europeo.",
      fr: "La technologie est rarement le problème. Le CFO qui n'a pas été briefé, le directeur pays qui s'est retiré, la formation qui n'a eu lieu qu'une fois — ce sont les vrais risques dans tout programme européen.",
    },
    readTime: 4,
    color: "#1A3C5E",
  },
  {
    id: "art-2",
    tag: {
      en: "Change Management",
      es: "Gestión del Cambio",
      fr: "Conduite du Changement",
    },
    title: {
      en: "What multilingual change management actually looks like",
      es: "Cómo es realmente la gestión del cambio multilingüe",
      fr: "À quoi ressemble vraiment la conduite du changement multilingue",
    },
    excerpt: {
      en: "Running a change programme across 5 countries in 4 languages is not just translation. It requires different timing, different tone, and different local champions in each market.",
      es: "Ejecutar un programa de cambio en 5 países en 4 idiomas no es solo traducir. Requiere tiempos diferentes, un tono diferente y diferentes campeones locales en cada mercado.",
      fr: "Piloter un programme de changement dans 5 pays en 4 langues, ce n'est pas que de la traduction. Cela demande des délais différents, un ton différent et des champions locaux différents dans chaque marché.",
    },
    readTime: 5,
    color: "#1E6B4A",
  },
  {
    id: "art-3",
    tag: {
      en: "Business & Tech",
      es: "Negocio y Tecnología",
      fr: "Business & Tech",
    },
    title: {
      en: "Why programme managers should understand code",
      es: "Por qué los gestores de programas deberían entender de código",
      fr: "Pourquoi les chefs de programme devraient comprendre le code",
    },
    excerpt: {
      en: "I spent 9 years on the business side of software implementations. Then I learned to code. Here's the specific difference it makes when managing vendors and technical delivery teams.",
      es: "Pasé 9 años en el lado de negocio de las implementaciones de software. Luego aprendí a programar. Aquí está la diferencia específica que hace al gestionar proveedores y equipos de entrega técnica.",
      fr: "J'ai passé 9 ans du côté métier des implémentations logicielles. Puis j'ai appris à coder. Voici la différence concrète que cela fait pour gérer les fournisseurs et les équipes de livraison technique.",
    },
    readTime: 6,
    color: "#6B21A8",
  },
];

// ─── MODAL COMPONENT ─────────────────────────────────────────────
function ResourceModal({ resource, lang, t, onClose }) {
  if (!resource) return null;

  const isFree = !resource.price;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div
          className={styles.modalHeader}
          style={{ "--accent": resource.color }}
        >
          <span className={styles.modalIcon}>{resource.icon}</span>
          <span className={styles.modalCategory}>
            {resource.category[lang] || resource.category.en}
          </span>
          <span
            className={`${styles.modalBadge} ${isFree ? styles.free : styles.paid}`}
          >
            {isFree ? t("resources", "free") : resource.price}
          </span>
        </div>

        <h2 className={styles.modalTitle}>
          {resource.title[lang] || resource.title.en}
        </h2>
        <p className={styles.modalDesc}>
          {resource.desc[lang] || resource.desc.en}
        </p>

        {resource.includes && (
          <div className={styles.modalIncludes}>
            <p className={styles.modalIncludesLabel}>
              {lang === "fr"
                ? "Contenu inclus"
                : lang === "es"
                  ? "Incluye"
                  : "What's included"}
            </p>
            <ul>
              {(resource.includes[lang] || resource.includes.en).map(
                (item, i) => (
                  <li key={i}>{item}</li>
                ),
              )}
            </ul>
          </div>
        )}

        <p className={styles.modalFormat}>{resource.format}</p>

        <div className={styles.modalActions}>
          {isFree ? (
            <Link to="/contact" className="btn btn--primary" onClick={onClose}>
              {t("resources", "download")}
            </Link>
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

// ─── PAGE ───
export default function Resources() {
  useScrollReveal();
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState(null);

  return (
    <>
      {selected && (
        <ResourceModal
          resource={selected}
          lang={lang}
          t={t}
          onClose={() => setSelected(null)}
        />
      )}

      {/* ── HERO ── */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">{t("resources", "tag")}</p>
          <h1>{t("resources", "heading")}</h1>
          <p className={styles.heroSub}>{t("resources", "sub")}</p>
        </div>
      </section>

      {/* ── FREE RESOURCES ────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <p className="section-label">{t("resources", "freeLabel")}</p>
            <h2>{t("resources", "freeTitle")}</h2>
          </div>
          <div className={styles.resourcesGrid}>
            {freeResources.map((r, i) => (
              <button
                key={r.id}
                className={`reveal reveal-delay-${i + 1} ${styles.resourceCard} ${styles.freeCard}`}
                style={{ "--accent": r.color }}
                onClick={() => setSelected(r)}
                aria-label={`Open ${r.title.en}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.resourceIcon}>{r.icon}</div>
                  <span className={styles.freeBadge}>
                    {t("resources", "free")}
                  </span>
                </div>
                <span className={styles.resourceCategory}>
                  {r.category[lang] || r.category.en}
                </span>
                <h3 className={styles.resourceTitle}>
                  {r.title[lang] || r.title.en}
                </h3>
                <p className={styles.resourceDesc}>
                  {r.desc[lang] || r.desc.en}
                </p>
                <div className={styles.cardFooter}>
                  <span className={styles.format}>{r.format}</span>
                  <span className={styles.cardCta}>
                    {t("resources", "download")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM RESOURCES ──*/}
      <section className="section section--ivory">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <p className="section-label">{t("resources", "premLabel")}</p>
            <h2>{t("resources", "premTitle")}</h2>
          </div>
          <div className={styles.premiumGrid}>
            {premiumResources.map((r, i) => (
              <button
                key={r.id}
                className={`reveal reveal-delay-${i + 1} ${styles.resourceCard} ${styles.premiumCard}`}
                style={{ "--accent": r.color }}
                onClick={() => setSelected(r)}
                aria-label={`Open ${r.title.en}`}
              >
                <div className={styles.cardTop}>
                  <div
                    className={styles.resourceIcon}
                    style={{ color: r.color }}
                  >
                    {r.icon}
                  </div>
                  <div className={styles.priceBadge}>{r.price}</div>
                </div>
                <span className={styles.resourceCategory}>
                  {r.category[lang] || r.category.en}
                </span>
                {r.badge && (
                  <span className={styles.newBadge}>
                    {r.badge[lang] || r.badge.en}
                  </span>
                )}
                <h3 className={styles.resourceTitle}>
                  {r.title[lang] || r.title.en}
                </h3>
                <p className={styles.resourceDesc}>
                  {r.desc[lang] || r.desc.en}
                </p>
                <ul className={styles.includesList}>
                  {(r.includes[lang] || r.includes.en)
                    .slice(0, 3)
                    .map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                </ul>
                <div className={styles.cardFooter}>
                  <span className={styles.format}>{r.format}</span>
                  <span className={styles.cardCta}>
                    {t("resources", "buy")}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLES ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <p className="section-label">{t("resources", "artLabel")}</p>
            <h2>{t("resources", "artTitle")}</h2>
          </div>
          <div className={styles.articlesGrid}>
            {articles.map((a, i) => (
              <article
                key={a.id}
                className={`reveal reveal-delay-${i + 1} ${styles.articleCard}`}
                style={{ "--accent": a.color }}
              >
                <span className={styles.articleTag}>
                  {a.tag[lang] || a.tag.en}
                </span>
                <h3 className={styles.articleTitle}>
                  {a.title[lang] || a.title.en}
                </h3>
                <p className={styles.articleExcerpt}>
                  {a.excerpt[lang] || a.excerpt.en}
                </p>
                <div className={styles.articleFooter}>
                  <span className={styles.readTime}>
                    {a.readTime} {t("resources", "readTime")}
                  </span>
                  <Link
                    to="/contact"
                    className={`btn btn--ghost ${styles.articleCta}`}
                  >
                    {t("resources", "readMore")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className={`section--dark ${styles.cta}`}>
        <div className="container--narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="tag tag--light">{t("resources", "ctaTag")}</p>
            <h2>{t("resources", "ctaTitle")}</h2>
            <p
              style={{ color: "rgba(255,255,255,0.65)", marginBottom: "2rem" }}
            >
              {t("resources", "ctaBody")}
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link to="/contact" className="btn btn--primary">
                {t("resources", "ctaBtn1")}
              </Link>
              <Link to="/services" className="btn btn--outline-light">
                {t("resources", "ctaBtn2")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
