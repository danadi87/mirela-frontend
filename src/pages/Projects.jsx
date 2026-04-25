import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import CaseStudy from "../components/CaseStudy";
import { projects } from "../data/projects";
import styles from "../styles/Projects.module.css";

export default function Projects() {
  useScrollReveal();
  const { t } = useLanguage();

  const skillBlocks = [
    {
      key: "skill1",
      items: [
        "End-to-end lifecycle ownership",
        "Multi-workstream coordination",
        "Risk management",
        "Phased rollout planning",
        "Steering committee management",
      ],
    },
    {
      key: "skill2",
      items: [
        "T&E platforms (SAP Concur)",
        "Corporate card programmes",
        "Travel policy design",
        "AP/AR systems",
        "Finance shared services",
      ],
    },
    {
      key: "skill3",
      items: [
        "C-suite alignment (CFO/CHRO/Legal)",
        "Vendor governance",
        "Cross-functional coordination",
        "Escalation management",
        "Executive reporting",
      ],
    },
    {
      key: "skill4",
      items: [
        "Multilingual training (EN/ES/FR/RO)",
        "Communication cascades",
        "Local champion networks",
        "Hypercare models",
        "Adoption measurement",
      ],
    },
  ];

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">{t("projects", "tag")}</p>
          <h1>
            <em className={styles.italic}>{t("projects", "heading")}</em>
          </h1>
          <p className={styles.heroSub}>{t("projects", "sub")}</p>
        </div>
      </section>

      <section className={styles.noteSection}>
        <div className="container">
          <div className={styles.note}>
            <span className={styles.noteIcon}>◎</span>
            <p>{t("projects", "confidential")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.projectsList}>
            {projects.map((project, i) => (
              <div key={project.id} className={`reveal reveal-delay-${i + 1}`}>
                <CaseStudy project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p className="section-label">{t("projects", "acrossLabel")}</p>
            <h2>{t("projects", "acrossTitle")}</h2>
          </div>
          <div className={styles.skillsGrid}>
            {skillBlocks.map(({ key, items }, i) => (
              <div
                key={key}
                className={`reveal reveal-delay-${i + 1} ${styles.skillBlock}`}
              >
                <h3 className={styles.skillArea}>{t("projects", key)}</h3>
                <ul className={styles.skillItems}>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section--dark ${styles.cta}`}>
        <div className="container--narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="tag tag--light">{t("projects", "ctaTag")}</p>
            <h2>{t("projects", "ctaTitle")}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
              {t("projects", "ctaSub")}
            </p>
            <Link to="/contact" className="btn btn--primary">
              {t("projects", "ctaBtn")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
