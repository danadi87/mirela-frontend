import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logoMark}>MD</div>
          <div>
            <p className={styles.name}>Mirela Dragulescu</p>
            <p className={styles.tagline}>{t("footer", "tagline")}</p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <p className={styles.navHeading}>{t("footer", "nav")}</p>
          <ul>
            {[
              { to: "/", key: "Home" },
              { to: "/about", key: t("nav", "about") },
              { to: "/services", key: t("nav", "services") },
              { to: "/projects", key: t("nav", "projects") },
              { to: "/resources", key: t("nav", "resources") },
              { to: "/contact", key: t("nav", "contact") },
            ].map(({ to, key }) => (
              <li key={to}>
                <Link to={to} className={styles.footerLink}>
                  {key}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contact}>
          <p className={styles.navHeading}>{t("footer", "connect")}</p>
          <ul>
            <li>
              <a
                href="https://linkedin.com/in/mirela-dragulescu"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:dragulescumirela@gmail.com"
                className={styles.footerLink}
              >
                dragulescumirela@gmail.com
              </a>
            </li>
            <li>
              <span className={styles.location}>
                📍 {t("footer", "location")}
              </span>
            </li>
            <li>
              <span className={styles.location}>EN · ES · FR · RO</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>
            © {year} Mirela Dragulescu. {t("footer", "rights")}
          </p>
          <p className={styles.bottomRight}>
            Finance Transformation Specialist · Barcelona
          </p>
        </div>
      </div>
    </footer>
  );
}
