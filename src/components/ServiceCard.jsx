import { Link } from "react-router-dom";
import styles from "../styles/ServiceCard.module.css";

export default function ServiceCard({ service, variant = "default" }) {
  const { id, icon, title, shortDesc, outcomes, color } = service;

  return (
    <article
      className={`${styles.card} ${variant === "featured" ? styles.featured : ""}`}
      style={{ "--accent": color }}
    >
      <div className={styles.iconWrap}>
        <span className={styles.icon}>{icon}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{shortDesc}</p>

      {outcomes && (
        <ul className={styles.outcomes}>
          {outcomes.slice(0, 2).map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      )}

      <Link to={`/services#${id}`} className={`btn btn--ghost ${styles.link}`}>
        Learn more →
      </Link>
    </article>
  );
}
