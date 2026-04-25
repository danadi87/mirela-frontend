import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/Stats.module.css";

export default function Stats() {
  const { t } = useLanguage();
  const stats = [
    { value: t("stats", "s1v"), label: t("stats", "s1l") },
    { value: t("stats", "s2v"), label: t("stats", "s2l") },
    { value: t("stats", "s3v"), label: t("stats", "s3l") },
    { value: t("stats", "s4v"), label: t("stats", "s4l") },
  ];
  return (
    <section className={styles.wrapper}>
      <div className={`container ${styles.grid}`}>
        {stats.map(({ value, label }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
