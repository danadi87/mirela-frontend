import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/ResourceTeaser.module.css";

export default function ResourceTeaser({ resource }) {
  const { lang, t } = useLanguage();

  const title = resource.title[lang] || resource.title.en;
  const category = resource.category[lang] || resource.category.en;
  const isFree = !resource.price;

  return (
    <Link
      to="/resources"
      className={`${styles.card} ${!isFree ? styles.premium : ""}`}
      style={{ "--accent": resource.color }}
    >
      <div className={styles.top}>
        <span className={styles.icon}>{resource.icon}</span>
        <span
          className={`${styles.badge} ${isFree ? styles.free : styles.paid}`}
        >
          {isFree ? t("resources", "free") : resource.price}
        </span>
      </div>
      <span className={styles.category}>{category}</span>
      <h4 className={styles.title}>{title}</h4>
      <span className={styles.format}>{resource.format}</span>
      <div className={styles.footer}>
        {resource.isNew && (
          <span className={styles.newBadge}>{t("resources", "new")}</span>
        )}
        <span className={styles.cta}>
          {isFree ? t("resources", "download") : t("resources", "buy")}
        </span>
      </div>
    </Link>
  );
}
