import { useScrollReveal } from "../hooks/useScrollReveal";
import { Link } from "react-router-dom";
import CaseStudy from "../components/CaseStudy";
import { projects } from "../data/projects";
import styles from "../styles/Projects.module.css";

export default function Projects() {
  useScrollReveal();

  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">Case Studies</p>
          <h1>
            Work that
            <br />
            <em className={styles.italic}>shipped</em>.
          </h1>
          <p className={styles.heroSub}>
            Programmes that were on time, adopted, and actually used. Every case
            study below represents a real delivery — not a slide deck.
          </p>
        </div>
      </section>

      {/* ── NOTE ON CONFIDENTIALITY ───────────────────────── */}
      <section className={styles.noteSection}>
        <div className="container">
          <div className={styles.note}>
            <span className={styles.noteIcon}>◎</span>
            <p>
              In line with professional confidentiality obligations, company
              names in these case studies are generalised. Full details are
              available for discussion in a private conversation. All programmes
              described are real and verifiable.
            </p>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.projectsList}>
            {projects.map((project, i) => (
              <div key={project.id} className={`reveal reveal-delay-${i + 1}`}>
                <CaseStudy project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS USED ───────────────────────────────────── */}
      <section className="section section--ivory">
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p className="section-label">Across all projects</p>
            <h2>Consistent capabilities, different contexts.</h2>
          </div>

          <div className={styles.skillsGrid}>
            {[
              {
                area: "Programme Management",
                items: [
                  "End-to-end lifecycle ownership",
                  "Multi-workstream coordination",
                  "Risk management",
                  "Phased rollout planning",
                  "Steering committee management",
                ],
              },
              {
                area: "Finance Domain",
                items: [
                  "T&E platforms (SAP Concur)",
                  "Corporate card programmes",
                  "Travel policy design",
                  "AP/AR systems",
                  "Finance shared services",
                ],
              },
              {
                area: "Stakeholder Management",
                items: [
                  "C-suite alignment (CFO/CHRO/Legal)",
                  "Vendor governance",
                  "Cross-functional coordination",
                  "Escalation management",
                  "Executive reporting",
                ],
              },
              {
                area: "Change Management",
                items: [
                  "Multilingual training (EN/ES/FR/RO)",
                  "Communication cascades",
                  "Local champion networks",
                  "Hypercare models",
                  "Adoption measurement",
                ],
              },
            ].map(({ area, items }, i) => (
              <div
                key={area}
                className={`reveal reveal-delay-${i + 1} ${styles.skillBlock}`}
              >
                <h3 className={styles.skillArea}>{area}</h3>
                <ul className={styles.skillItems}>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className={`section--dark ${styles.cta}`}>
        <div className="container--narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="tag tag--light">What's next</p>
            <h2>Running a similar programme?</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
              If your organisation is planning a T&E transformation, system
              migration, or multi-country change programme — let's talk about
              what that looks like.
            </p>
            <Link to="/contact" className="btn btn--primary">
              Start a Conversation →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
