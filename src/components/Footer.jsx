import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoMark}>MD</div>
          <div>
            <p className={styles.name}>Mirela Dragulescu</p>
            <p className={styles.tagline}>
              Finance Transformation · Project Management
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <p className={styles.navHeading}>Navigation</p>
          <ul>
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/projects", label: "Case Studies" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.footerLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className={styles.contact}>
          <p className={styles.navHeading}>Connect</p>
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
              <span className={styles.location}>📍 Barcelona, Spain</span>
            </li>
            <li>
              <span className={styles.location}>EN · ES · FR · RO</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p>© {year} Mirela Dragulescu. All rights reserved.</p>
          <p className={styles.bottomRight}>
            Finance Transformation Specialist · Based in Barcelona
          </p>
        </div>
      </div>
    </footer>
  );
}
