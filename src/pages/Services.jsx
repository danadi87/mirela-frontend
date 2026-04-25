import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import { services } from "../data/services";
import styles from "../styles/Services.module.css";

export default function Services() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">{t("services", "tag")}</p>
          <h1>{t("services", "heading")}</h1>
          <p className={styles.heroSub}>{t("services", "sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.servicesList}>
            {services.map((svc, i) => (
              <article
                key={svc.id}
                id={svc.id}
                className={`reveal ${styles.serviceItem} ${i % 2 !== 0 ? styles.reversed : ""}`}
                style={{ "--accent": svc.color }}
              >
                <div className={styles.serviceVisual}>
                  <div className={styles.serviceIcon}>{svc.icon}</div>
                  <div className={styles.serviceTools}>
                    <p className={styles.toolsLabel}>
                      {t("services", "toolsLabel")}
                    </p>
                    <div className={styles.toolsList}>
                      {svc.tools.map((tool) => (
                        <span key={tool} className={styles.tool}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.serviceContent}>
                  <h2 className={styles.serviceTitle}>{svc.title}</h2>
                  <p className={styles.serviceDesc}>{svc.description}</p>
                  <div className={styles.outcomesWrap}>
                    <p className={styles.outcomesLabel}>
                      {t("services", "outcomesLabel")}
                    </p>
                    <ul className={styles.outcomes}>
                      {svc.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/contact"
                    className={`btn btn--primary ${styles.serviceBtn}`}
                  >
                    {t("services", "talkBtn")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <p className="section-label">{t("services", "processLabel")}</p>
            <h2>{t("services", "processTitle")}</h2>
            <p
              style={{
                maxWidth: "500px",
                margin: "1rem auto 0",
                color: "var(--gray-md)",
                fontSize: "0.95rem",
              }}
            >
              {t("services", "processSub")}
            </p>
          </div>
          <div className={styles.processGrid}>
            {[
              { step: "01", hKey: "step1h", bKey: "step1b" },
              { step: "02", hKey: "step2h", bKey: "step2b" },
              { step: "03", hKey: "step3h", bKey: "step3b" },
              { step: "04", hKey: "step4h", bKey: "step4b" },
            ].map(({ step, hKey, bKey }, i) => (
              <div
                key={step}
                className={`reveal reveal-delay-${i + 1} ${styles.processStep}`}
              >
                <span className={styles.stepNum}>{step}</span>
                <h3 className={styles.stepHeading}>{t("services", hKey)}</h3>
                <p>{t("services", bKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p className="section-label">{t("services", "engLabel")}</p>
            <h2>{t("services", "engTitle")}</h2>
          </div>
          <div className={styles.engagementGrid}>
            {[
              { hKey: "eng1h", dKey: "eng1d", iKey: "eng1i" },
              { hKey: "eng2h", dKey: "eng2d", iKey: "eng2i" },
              { hKey: "eng3h", dKey: "eng3d", iKey: "eng3i" },
            ].map(({ hKey, dKey, iKey }, i) => (
              <div
                key={hKey}
                className={`reveal reveal-delay-${i + 1} ${styles.engagementCard}`}
              >
                <h3 className={styles.engagementModel}>
                  {t("services", hKey)}
                </h3>
                <p className={styles.engagementDesc}>{t("services", dKey)}</p>
                <p className={styles.engagementIdeal}>
                  <strong>{t("services", "engIdeal")}</strong>{" "}
                  {t("services", iKey)}
                </p>
                <Link to="/contact" className="btn btn--ghost">
                  {t("services", "engEnquire")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section--dark ${styles.cta}`}>
        <div className="container--narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="tag tag--light">{t("services", "ctaTag")}</p>
            <h2>{t("services", "ctaTitle")}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
              {t("services", "ctaSub")}
            </p>
            <Link to="/contact" className="btn btn--primary">
              {t("services", "ctaBtn")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
