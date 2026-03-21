import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { services } from "../data/services";
import styles from "../styles/Services.module.css";

export default function Services() {
  useScrollReveal();

  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">Services</p>
          <h1>
            What I do,
            <br />
            and how I do it.
          </h1>
          <p className={styles.heroSub}>
            Everything I offer is built around the same core capability: taking
            complex, cross-border finance transformation programmes from concept
            to fully adopted reality — without the chaos that usually comes with
            them.
          </p>
        </div>
      </section>

      {/* ── SERVICES DETAIL ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.servicesList}>
            {services.map((svc, i) => (
              <article
                key={svc.id}
                id={svc.id}
                className={`reveal ${styles.serviceItem} ${i % 2 !== 0 ? styles.reversed : ""}`}
                style={{ "--accent": svc.color }}
              >
                <div className={styles.serviceVisual}>
                  <div className={styles.serviceIcon}>{svc.icon}</div>
                  <div className={styles.serviceTools}>
                    <p className={styles.toolsLabel}>Tools & Platforms</p>
                    <div className={styles.toolsList}>
                      {svc.tools.map((t) => (
                        <span key={t} className={styles.tool}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.serviceContent}>
                  <h2 className={styles.serviceTitle}>{svc.title}</h2>
                  <p className={styles.serviceDesc}>{svc.description}</p>

                  <div className={styles.outcomesWrap}>
                    <p className={styles.outcomesLabel}>What you get</p>
                    <ul className={styles.outcomes}>
                      {svc.outcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className={`btn btn--primary ${styles.serviceBtn}`}
                  >
                    Talk About Your Project →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW I WORK ────────────────────────────────────── */}
      <section className="section section--ivory">
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <p className="section-label">Process</p>
            <h2>How I work</h2>
            <p
              style={{
                maxWidth: "500px",
                margin: "1rem auto 0",
                color: "var(--gray-md)",
                fontSize: "0.95rem",
              }}
            >
              Every engagement starts with understanding the actual problem, not
              the one in the brief.
            </p>
          </div>

          <div className={styles.processGrid}>
            {[
              {
                step: "01",
                heading: "Discovery",
                body: "I start by understanding your current state, stakeholder landscape, constraints, and timeline. This shapes everything that follows.",
              },
              {
                step: "02",
                heading: "Programme Design",
                body: "I build the plan: phases, risks, dependencies, vendor approach, and change management strategy — in one integrated document.",
              },
              {
                step: "03",
                heading: "Delivery",
                body: "I run the programme. Stakeholder updates, vendor management, UAT coordination, issue resolution. I own the outcome, not just the tasks.",
              },
              {
                step: "04",
                heading: "Adoption & Handover",
                body: "Training, hypercare, and embedded capability — so your team can own the system independently after go-live.",
              },
            ].map(({ step, heading, body }, i) => (
              <div
                key={step}
                className={`reveal reveal-delay-${i + 1} ${styles.processStep}`}
              >
                <span className={styles.stepNum}>{step}</span>
                <h3 className={styles.stepHeading}>{heading}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p className="section-label">Engagement</p>
            <h2>How we can work together</h2>
          </div>

          <div className={styles.engagementGrid}>
            {[
              {
                model: "Consulting / Freelance",
                desc: "Project-based engagements for organisations that need senior programme management expertise without a permanent hire. Ideal for specific implementations, vendor transitions, or change programmes.",
                ideal: "SMEs, European multinationals, transformation projects",
              },
              {
                model: "Senior Employment",
                desc: "Open to permanent or fixed-term senior roles where I can own a programme or a function. Looking for organisations with genuine transformation ambition and European scope.",
                ideal:
                  "Finance, operations, and technology transformation roles",
              },
              {
                model: "Advisory / Coaching",
                desc: "Available to advise internal programme teams on vendor selection, change management strategy, or multi-country delivery approaches. Structured as short-term advisory retainers.",
                ideal: "Heads of finance, transformation leads, internal PMs",
              },
            ].map(({ model, desc, ideal }, i) => (
              <div
                key={model}
                className={`reveal reveal-delay-${i + 1} ${styles.engagementCard}`}
              >
                <h3 className={styles.engagementModel}>{model}</h3>
                <p className={styles.engagementDesc}>{desc}</p>
                <p className={styles.engagementIdeal}>
                  <strong>Ideal for:</strong> {ideal}
                </p>
                <Link to="/contact" className="btn btn--ghost">
                  Enquire →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className={`section--dark ${styles.cta}`}>
        <div className="container--narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="tag tag--light">Ready to start?</p>
            <h2>Tell me about your project.</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>
              I'll respond within one business day to discuss whether and how I
              can help.
            </p>
            <Link to="/contact" className="btn btn--primary">
              Get In Touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
