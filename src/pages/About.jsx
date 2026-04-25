import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/About.module.css";

const credentials = [
  {
    year: "2025",
    labelKey: "Full Stack Development Bootcamp",
    org: "Ironhack",
  },
  {
    year: "2024",
    labelKey: "DASM — Disciplined Agile Scrum Master",
    org: "Project Management Institute (PMI)",
  },
  {
    year: "2023",
    labelKey: "DDI Facilitator Certification",
    org: "Development Dimensions International",
  },
  { year: "2020", labelKey: "CGMA Finance Leadership Programme", org: "CIMA" },
  {
    year: "2013",
    labelKey: "Master's Degree — Accounting & Audit",
    org: "Universitat de Barcelona IL3",
  },
];

const languages = [
  { lang: "English", level: "C1/C2", pct: 95 },
  { lang: "Spanish", level: "C1/C2", pct: 95 },
  { lang: "French", level: "B2", pct: 75 },
  { lang: "Romanian", level: "—", pct: 100 },
];

export default function About() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">{t("about", "tag")}</p>
          <h1>{t("about", "heading")}</h1>
          <p className={styles.heroSub}>{t("about", "sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={`reveal ${styles.storyLeft}`}>
              <p className="section-label">{t("about", "storyLabel")}</p>
              <h2>{t("about", "storyTitle")}</h2>
              <div className="divider" />
            </div>
            <div className={`reveal reveal-delay-2 ${styles.storyRight}`}>
              {["p1", "p2", "p3", "p4", "p5"].map((k) => (
                <p key={k}>{t("about", k)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <p className="section-label">{t("about", "bringLabel")}</p>
            <h2>{t("about", "bringTitle")}</h2>
          </div>
          <div className={styles.pillarsGrid}>
            {[
              { num: "pill1num", h: "pill1h", b: "pill1b" },
              { num: "pill2num", h: "pill2h", b: "pill2b" },
              { num: "pill3num", h: "pill3h", b: "pill3b" },
            ].map(({ num, h, b }, i) => (
              <div
                key={num}
                className={`reveal reveal-delay-${i + 1} ${styles.pillar}`}
              >
                <span className={styles.pillarNum}>{t("about", num)}</span>
                <h3 className={styles.pillarHeading}>{t("about", h)}</h3>
                <p>{t("about", b)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.credGrid}>
            <div className="reveal">
              <p className="section-label">{t("about", "credLabel")}</p>
              <h2>{t("about", "credTitle")}</h2>
              <div className="divider" />
              <ul className={styles.credList}>
                {credentials.map(({ year, labelKey, org }) => (
                  <li key={labelKey} className={styles.credItem}>
                    <span className={styles.credYear}>{year}</span>
                    <div>
                      <p className={styles.credLabel}>{labelKey}</p>
                      <p className={styles.credOrg}>{org}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal reveal-delay-2">
              <p className="section-label">{t("about", "langLabel")}</p>
              <h2>{t("about", "langTitle")}</h2>
              <div className="divider" />
              <div className={styles.langList}>
                {languages.map(({ lang, level, pct }) => (
                  <div key={lang} className={styles.langItem}>
                    <div className={styles.langHeader}>
                      <span className={styles.langName}>{lang}</span>
                      <span className={styles.langLevel}>{level}</span>
                    </div>
                    <div className={styles.langBar}>
                      <div
                        className={styles.langFill}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.langNote}>
                <p>{t("about", "langNote")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section--dark ${styles.cta}`}>
        <div className="container--narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="tag tag--light">{t("about", "ctaTag")}</p>
            <h2>{t("about", "ctaTitle")}</h2>
            <p
              style={{ color: "rgba(255,255,255,0.65)", marginBottom: "2rem" }}
            >
              {t("about", "ctaSub")}
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className="btn btn--primary">
                {t("about", "ctaBtn1")}
              </Link>
              <Link to="/services" className="btn btn--outline-light">
                {t("about", "ctaBtn2")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
