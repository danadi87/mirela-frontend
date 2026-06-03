import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import ContactForm from "../components/ContactForm";
import styles from "../styles/Contact.module.css";

const contactDetails = [
  {
    icon: "📧",
    labelKey: "Email",
    value: "business.mdconsulting@gmail.com",
    href: "mailto:business.mdconsulting@gmail.com",
  },
  {
    icon: "📞",
    labelKey: "Phone",
    value: "+34 642 251 466",
    href: "tel:+34642251466",
  },
  {
    icon: "🔗",
    labelKey: "LinkedIn",
    value: "linkedin.com/in/mirela-daniela-dragulescu",
    href: "https://linkedin.com/in/mirela-daniela-dragulescu",
  },
  { icon: "📍", labelKey: "Location", value: "Barcelona, Spain", href: null },
];

export default function Contact() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">{t("contact", "tag")}</p>
          <h1>{t("contact", "heading")}</h1>
          <p className={styles.heroSub}>{t("contact", "sub")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            <div className="reveal">
              <p className="section-label">{t("contact", "getInTouch")}</p>
              <h2>{t("contact", "howTitle")}</h2>
              <div className="divider" />
              <ul className={styles.detailsList}>
                {contactDetails.map(({ icon, labelKey, value, href }) => (
                  <li key={labelKey} className={styles.detailItem}>
                    <span className={styles.detailIcon}>{icon}</span>
                    <div>
                      <p className={styles.detailLabel}>{labelKey}</p>
                      {href ? (
                        <a
                          href={href}
                          className={styles.detailValue}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {value}
                        </a>
                      ) : (
                        <p className={styles.detailValue}>{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.availability}>
                <p className={styles.availLabel}>
                  {t("contact", "availLabel")}
                </p>
                <p>{t("contact", "availText")}</p>
              </div>
              <div className={styles.languages}>
                <p className={styles.availLabel}>{t("contact", "worksIn")}</p>
                <div className={styles.langBadges}>
                  {["🇬🇧 English", "🇪🇸 Spanish", "🇫🇷 French", "🇷🇴 Romanian"].map(
                    (l) => (
                      <span key={l} className={styles.langBadge}>
                        {l}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className={`reveal reveal-delay-2 ${styles.formWrap}`}>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>
                  {t("contact", "formTitle")}
                </h3>
                <p className={styles.formSub}>{t("contact", "formSub")}</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p className="section-label">{t("contact", "nextLabel")}</p>
            <h2>{t("contact", "nextTitle")}</h2>
          </div>
          <div className={styles.nextSteps}>
            {[
              { hKey: "step1h", bKey: "step1b" },
              { hKey: "step2h", bKey: "step2b" },
              { hKey: "step3h", bKey: "step3b" },
              { hKey: "step4h", bKey: "step4b" },
            ].map(({ hKey, bKey }, i) => (
              <div
                key={hKey}
                className={`reveal reveal-delay-${i + 1} ${styles.nextStep}`}
              >
                <span className={styles.stepNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className={styles.stepHeading}>{t("contact", hKey)}</h4>
                <p>{t("contact", bKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
