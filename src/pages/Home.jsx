import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ServiceCard from "../components/ServiceCard";
import CaseStudy from "../components/CaseStudy";
import Stats from "../components/Stats";
import { services } from "../data/services";
import { projects } from "../data/projects";
import styles from "../styles/Home.module.css";

export default function Home() {
  useScrollReveal();

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroNoise} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className="tag tag--ivory">
              Finance Transformation · Project Management
            </p>

            <h1 className={styles.heroHeading}>
              I make complex
              <em className={styles.heroItalic}> European</em> finance
              programmes land.
            </h1>

            <p className={styles.heroSub}>
              9+ years delivering cross-border T&E implementations, corporate
              card rollouts, and change management programmes — across 10+
              countries, in four languages, at C-suite stakeholder level.
            </p>

            <div className={styles.heroBadges}>
              {[
                "SAP Concur",
                "DASM (PMI)",
                "EN · ES · FR · RO",
                "Barcelona, Spain",
              ].map((b) => (
                <span key={b} className={styles.badge}>
                  {b}
                </span>
              ))}
            </div>

            <div className={styles.heroCtas}>
              <Link to="/services" className="btn btn--primary">
                See What I Do →
              </Link>
              <Link to="/projects" className="btn btn--outline-light">
                View Case Studies
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.heroCard}>
              <div className={styles.heroCardTag}>Current focus</div>
              <div className={styles.heroCardTitle}>
                Pan-European
                <br />
                Travel Agency Transition
              </div>
              <div className={styles.heroCardMeta}>10+ entities · Ongoing</div>
              <div className={styles.heroCardBar}>
                <div
                  className={styles.heroCardProgress}
                  style={{ width: "65%" }}
                />
              </div>
              <div className={styles.heroCardSkills}>
                {[
                  "Vendor Management",
                  "Change Mgmt",
                  "Contract Negotiation",
                ].map((s) => (
                  <span key={s} className={styles.heroCardSkill}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.heroFloatA}>
              <span className={styles.heroFloatIcon}>✓</span>
              <span>Go-live complete — 4 markets</span>
            </div>
            <div className={styles.heroFloatB}>
              <span className={styles.heroFloatIcon}>◎</span>
              <span>4 languages delivered</span>
            </div>
          </div>
        </div>

        <div className={styles.heroScroll} aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <Stats />

      {/* ── INTRO ─────────────────────────────────────────── */}
      <section className={`section section--ivory ${styles.intro}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={`reveal ${styles.introLeft}`}>
              <p className="section-label">Why it works</p>
              <h2>
                Finance transformation is about people, not just platforms.
              </h2>
              <div className="divider" />
              <p>
                The technology is rarely the hard part. The hard part is getting
                a CFO in Germany, an HR Director in France, and a Procurement
                team in Spain to agree on the same process — and then actually
                use it.
              </p>
              <p style={{ marginTop: "1rem" }}>
                I've spent 9 years sitting in those rooms. I know how to manage
                the stakeholder politics, run the change programme, and deliver
                the system — all at once, across borders, in multiple languages.
              </p>
              <Link
                to="/about"
                className="btn btn--outline"
                style={{ marginTop: "2rem" }}
              >
                About Me →
              </Link>
            </div>

            <div className={`reveal reveal-delay-2 ${styles.introRight}`}>
              {[
                {
                  icon: "◈",
                  heading: "End-to-end ownership",
                  text: "I don't hand off deliverables. I own the programme from vendor selection through post-go-live stabilisation.",
                },
                {
                  icon: "◉",
                  heading: "Cross-border by design",
                  text: "10+ European markets delivered. I build localisation and regulatory compliance in from day one, not as an afterthought.",
                },
                {
                  icon: "◎",
                  heading: "Business and tech fluency",
                  text: "I translate between finance leadership and technical teams — accelerating decisions that would otherwise stall for weeks.",
                },
              ].map(({ icon, heading, text }) => (
                <div key={heading} className={styles.introFeature}>
                  <span className={styles.introIcon}>{icon}</span>
                  <div>
                    <h4>{heading}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="reveal">
              <p className="section-label">What I do</p>
              <h2>Services</h2>
            </div>
            <Link
              to="/services"
              className={`btn btn--ghost reveal reveal-delay-2 ${styles.seeAll}`}
            >
              All services →
            </Link>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((svc, i) => (
              <div key={svc.id} className={`reveal reveal-delay-${i + 1}`}>
                <ServiceCard service={svc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────────── */}
      <section className="section section--ivory">
        <div className="container">
          <div className={styles.sectionHead}>
            <div className="reveal">
              <p className="section-label">Proof of work</p>
              <h2>Case Studies</h2>
            </div>
            <Link
              to="/projects"
              className={`btn btn--ghost reveal reveal-delay-2 ${styles.seeAll}`}
            >
              All case studies →
            </Link>
          </div>

          <div className={styles.caseGrid}>
            {projects.map((p, i) => (
              <div key={p.id} className={`reveal reveal-delay-${i + 1}`}>
                <CaseStudy project={p} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────── */}
      <section className={`section--dark ${styles.ctaBand}`}>
        <div className={`container ${styles.ctaInner}`}>
          <div className="reveal">
            <p className="tag tag--light">Let's work together</p>
            <h2>Running a finance transformation project in Europe?</h2>
            <p>
              Whether you need someone to lead the programme, manage the vendor,
              design the change strategy — or all three — let's talk about how I
              can help.
            </p>
          </div>
          <div className={`reveal reveal-delay-2 ${styles.ctaActions}`}>
            <Link to="/contact" className="btn btn--primary">
              Start a Conversation
            </Link>
            <Link to="/projects" className="btn btn--outline-light">
              See My Work First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
