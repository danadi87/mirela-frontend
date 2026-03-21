import styles from "../styles/Stats.module.css";

const stats = [
  { value: "9+", label: "Years in Finance Transformation" },
  { value: "10+", label: "European Markets Delivered" },
  { value: "4", label: "Working Languages" },
  { value: "3", label: "Major Certifications" },
];

export default function Stats() {
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
