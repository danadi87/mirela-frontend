import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/LanguageSwitcher.module.css";

const LANGS = [
  { code: "en", label: "EN", full: "English" },
  { code: "es", label: "ES", full: "Español" },
  { code: "fr", label: "FR", full: "Français" },
];

export default function LanguageSwitcher({ variant = "default" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`${styles.switcher} ${variant === "mobile" ? styles.mobile : ""}`}
      role="group"
      aria-label="Select language"
    >
      {LANGS.map(({ code, label, full }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`${styles.btn} ${lang === code ? styles.active : ""}`}
          aria-label={`Switch to ${full}`}
          aria-pressed={lang === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
