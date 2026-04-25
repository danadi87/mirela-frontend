import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import ServiceCard from "../components/ServiceCard";
import CaseStudy from "../components/CaseStudy";
import Stats from "../components/Stats";
import { services } from "../data/services";
import { projects } from "../data/projects";
import styles from "../styles/Home.module.css";

export default function Home() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroNoise} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className="tag tag--ivory">{t("home", "tag")}</p>
            <h1 className={styles.heroHeading}>{t("home", "heading")}</h1>
            <p className={styles.heroSub}>{t("home", "sub")}</p>
            <div className={styles.heroBadges}>
              {["badge1", "badge2", "badge3", "badge4"].map((k) => (
                <span key={k} className={styles.badge}>
                  {t("home", k)}
                </span>
              ))}
            </div>
            <div className={styles.heroCtas}>
              <Link to="/services" className="btn btn--primary">
                {t("home", "cta1")}
              </Link>
              <Link to="/projects" className="btn btn--outline-light">
                {t("home", "cta2")}
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroCard}>
              <div className={styles.heroCardTag}>{t("home", "cardTag")}</div>
              <div className={styles.heroCardTitle}>
                {t("home", "cardTitle")}
              </div>
              <div className={styles.heroCardMeta}>{t("home", "cardMeta")}</div>
              <div className={styles.heroCardBar}>
                <div
                  className={styles.heroCardProgress}
                  style={{ width: "65%" }}
                />
              </div>
              <div className={styles.heroCardSkills}>
                {["cardSkill1", "cardSkill2", "cardSkill3"].map((k) => (
                  <span key={k} className={styles.heroCardSkill}>
                    {t("home", k)}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.heroFloatA}>
              <span className={styles.heroFloatIcon}>✓</span>
              <span>{t("home", "float1")}</span>
            </div>
            <div className={styles.heroFloatB}>
              <span className={styles.heroFloatIcon}>◎</span>
              <span>{t("home", "float2")}</span>
            </div>
          </div>
        </div>
        <div className={styles.heroScroll} aria-hidden="true">
          <span />
        </div>
      </section>

      <Stats />

      <section className={`section section--ivory ${styles.intro}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={`reveal ${styles.introLeft}`}>
              <p className="section-label">{t("home", "whyLabel")}</p>
              <h2>{t("home", "whyTitle")}</h2>
              <div className="divider" />
              <p>{t("home", "whyBody1")}</p>
              <p style={{ marginTop: "1rem" }}>{t("home", "whyBody2")}</p>
              <Link
                to="/about"
                className="btn btn--outline"
                style={{ marginTop: "2rem" }}
              >
                {t("home", "aboutBtn")}
              </Link>
            </div>
            <div className={`reveal reveal-delay-2 ${styles.introRight}`}>
              {[
                { icon: "◈", hKey: "feat1Title", bKey: "feat1Body" },
                { icon: "◉", hKey: "feat2Title", bKey: "feat2Body" },
                { icon: "◎", hKey: "feat3Title", bKey: "feat3Body" },
              ].map(({ icon, hKey, bKey }) => (
                <div key={hKey} className={styles.introFeature}>
                  <span className={styles.introIcon}>{icon}</span>
                  <div>
                    <h4>{t("home", hKey)}</h4>
                    <p>{t("home", bKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="reveal">
              <p className="section-label">{t("home", "svcLabel")}</p>
              <h2>{t("home", "svcTitle")}</h2>
            </div>
            <Link
              to="/services"
              className={`btn btn--ghost reveal reveal-delay-2 ${styles.seeAll}`}
            >
              {t("home", "svcAll")}
            </Link>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((svc, i) => (
              <div key={svc.id} className={`reveal reveal-delay-${i + 1}`}>
                <ServiceCard service={svc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="reveal">
              <p className="section-label">{t("home", "caseLabel")}</p>
              <h2>{t("home", "caseTitle")}</h2>
            </div>
            <Link
              to="/projects"
              className={`btn btn--ghost reveal reveal-delay-2 ${styles.seeAll}`}
            >
              {t("home", "caseAll")}
            </Link>
          </div>
          <div className={styles.caseGrid}>
            {projects.map((p, i) => (
              <div key={p.id} className={`reveal reveal-delay-${i + 1}`}>
                <CaseStudy project={p} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section--dark ${styles.ctaBand}`}>
        <div className={`container ${styles.ctaInner}`}>
          <div className="reveal">
            <p className="tag tag--light">{t("home", "ctaTag")}</p>
            <h2>{t("home", "ctaTitle")}</h2>
            <p>{t("home", "ctaBody")}</p>
          </div>
          <div className={`reveal reveal-delay-2 ${styles.ctaActions}`}>
            <Link to="/contact" className="btn btn--primary">
              {t("home", "ctaBtn1")}
            </Link>
            <Link to="/projects" className="btn btn--outline-light">
              {t("home", "ctaBtn2")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
