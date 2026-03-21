import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/about", label: t("nav", "about") },
    { to: "/services", label: t("nav", "services") },
    { to: "/projects", label: t("nav", "projects") },
    { to: "/resources", label: t("nav", "resources") },
    { to: "/contact", label: t("nav", "contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoInitials}>MD</span>
          <span className={styles.logoText}>Mirela Dragulescu</span>
        </Link>

        <ul className={styles.links}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.navRight}>
          <LanguageSwitcher />
          <Link to="/contact" className={`btn btn--primary ${styles.cta}`}>
            {t("nav", "cta")}
          </Link>
        </div>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <ul className={styles.drawerLinks}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${styles.drawerLink} ${isActive ? styles.active : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className={styles.drawerLangRow}>
            <LanguageSwitcher variant="mobile" />
          </li>
          <li>
            <Link
              to="/contact"
              className={`btn btn--primary ${styles.drawerCta}`}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav", "cta")}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
