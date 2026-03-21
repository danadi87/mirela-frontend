import styles from "../styles/CaseStudy.module.css";

export default function CaseStudy({ project, compact = false }) {
  const { tag, title, company, scope, challenge, outcomes, skills, color } =
    project;

  if (compact) {
    return (
      <article className={styles.compact} style={{ "--accent": color }}>
        <div className={styles.compactTag}>{tag}</div>
        <h3 className={styles.compactTitle}>{title}</h3>
        <p className={styles.compactScope}>{scope}</p>
        <div className={styles.compactSkills}>
          {skills.slice(0, 3).map((s) => (
            <span key={s} className={styles.skill}>
              {s}
            </span>
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className={styles.card} style={{ "--accent": color }}>
      <div className={styles.header}>
        <span className={styles.tag}>{tag}</span>
        <p className={styles.company}>{company}</p>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.scope}>{scope}</p>
      <div className={styles.body}>
        <div className={styles.section}>
          <h4 className={styles.label}>The Challenge</h4>
          <p>{challenge}</p>
        </div>
        <div className={styles.section}>
          <h4 className={styles.label}>Key Outcomes</h4>
          <ul className={styles.outcomes}>
            {outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.skills}>
        {skills.map((s) => (
          <span key={s} className={styles.skill}>
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}
