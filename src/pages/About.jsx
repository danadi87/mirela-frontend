import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "../styles/About.module.css";

const credentials = [
  { year: "2025", label: "Full Stack Development Bootcamp", org: "Ironhack" },
  {
    year: "2024",
    label: "DASM — Disciplined Agile Scrum Master",
    org: "Project Management Institute (PMI)",
  },
  {
    year: "2023",
    label: "DDI Facilitator Certification",
    org: "Development Dimensions International",
  },
  { year: "2020", label: "CGMA Finance Leadership Programme", org: "CIMA" },
  {
    year: "2013",
    label: "Master's Degree — Accounting & Audit",
    org: "Universitat de Barcelona IL3",
  },
];

const languages = [
  { lang: "English", level: "C1/C2 — Fluent", pct: 95 },
  { lang: "Spanish", level: "C1/C2 — Fluent", pct: 95 },
  { lang: "French", level: "B2 — Professional", pct: 75 },
  { lang: "Romanian", level: "Native", pct: 100 },
];

export default function About() {
  useScrollReveal();

  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">About</p>
          <h1>
            The person behind
            <br />
            the <em className={styles.italic}>programme</em>.
          </h1>
          <p className={styles.heroSub}>
            Finance transformation specialist based in Barcelona, Spain. 9+
            years. 10+ countries. 4 languages. One very clear focus: making
            complex, cross-border finance programmes actually work.
          </p>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={`reveal ${styles.storyLeft}`}>
              <p className="section-label">My story</p>
              <h2>I've been on both sides of the table.</h2>
              <div className="divider" />
            </div>

            <div className={`reveal reveal-delay-2 ${styles.storyRight}`}>
              <p>
                I started my career in finance operations at Hanesbrands — a
                Fortune 500 global apparel company — where I spent six years
                coordinating multi-country T&E system deployments across
                European markets. That's where I learned what makes these
                projects hard: it's almost never the technology.
              </p>
              <p>
                What makes them hard is the CFO who hasn't been briefed
                properly. The country manager who thinks the policy doesn't
                apply to their team. The vendor who overpromised on the
                timeline. The training that was delivered once and then
                forgotten.
              </p>
              <p>
                In 2022 I moved to DIM Brands International — a leading European
                apparel group — as Europe T&E Manager, where I took on full
                programme ownership: vendor selection, contract negotiation,
                multi-country rollout, change management, stakeholder alignment
                at C-suite level, and ongoing hypercare.
              </p>
              <p>
                In 2025 I completed a Full Stack Development bootcamp at
                Ironhack, because I wanted to understand the technical side of
                the systems I'd been deploying for years. It makes me a better
                programme manager — I can challenge vendor decisions, have real
                conversations with development teams, and bridge the gap between
                business requirements and technical delivery in a way that
                pure-business PMs often can't.
              </p>
              <p>
                I'm based in Barcelona, open to hybrid and remote engagements
                across Europe, and available for both consulting projects and
                senior employment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT I BRING ──────────────────────────────────── */}
      <section className="section section--ivory">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "3rem" }}>
            <p className="section-label">What I bring</p>
            <h2>Three things most programme managers don't offer.</h2>
          </div>

          <div className={styles.pillarsGrid}>
            {[
              {
                num: "01",
                heading: "Real European scope",
                body: "I have delivered in Germany, France, Spain, Italy, the Netherlands, Romania, and more — navigating local regulatory requirements, cultural nuance, and language barriers without needing a local consultant in every market.",
              },
              {
                num: "02",
                heading: "Change management built in",
                body: "I design the training, write the communications, build the local champion networks, and measure adoption. Change management is not a bolt-on for me — it is core to how I run programmes.",
              },
              {
                num: "03",
                heading: "Business and technical fluency",
                body: "Having coded full-stack applications, I can read a technical specification, challenge a vendor estimate, and translate requirements between finance leadership and IT delivery teams without losing meaning in translation.",
              },
            ].map(({ num, heading, body }, i) => (
              <div
                key={num}
                className={`reveal reveal-delay-${i + 1} ${styles.pillar}`}
              >
                <span className={styles.pillarNum}>{num}</span>
                <h3 className={styles.pillarHeading}>{heading}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.credGrid}>
            <div className="reveal">
              <p className="section-label">Credentials</p>
              <h2>Education &amp; Certifications</h2>
              <div className="divider" />
              <ul className={styles.credList}>
                {credentials.map(({ year, label, org }) => (
                  <li key={label} className={styles.credItem}>
                    <span className={styles.credYear}>{year}</span>
                    <div>
                      <p className={styles.credLabel}>{label}</p>
                      <p className={styles.credOrg}>{org}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal reveal-delay-2">
              <p className="section-label">Languages</p>
              <h2>Working in 4 Languages</h2>
              <div className="divider" />
              <div className={styles.langList}>
                {languages.map(({ lang, level, pct }) => (
                  <div key={lang} className={styles.langItem}>
                    <div className={styles.langHeader}>
                      <span className={styles.langName}>{lang}</span>
                      <span className={styles.langLevel}>{level}</span>
                    </div>
                    <div className={styles.langBar}>
                      <div
                        className={styles.langFill}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.langNote}>
                <p>
                  Having delivered change management programmes in four
                  languages isn't just a line on a CV — it's what makes
                  pan-European programmes genuinely adoptable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className={`section--dark ${styles.cta}`}>
        <div className="container--narrow">
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="tag tag--light">Let's talk</p>
            <h2>Open to consulting projects and senior roles across Europe.</h2>
            <p
              style={{ color: "rgba(255,255,255,0.65)", marginBottom: "2rem" }}
            >
              Hybrid and remote. Available to travel within Europe as needed.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className="btn btn--primary">
                Get In Touch
              </Link>
              <Link to="/services" className="btn btn--outline-light">
                See My Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
