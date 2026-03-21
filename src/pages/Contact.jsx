import { useScrollReveal } from "../hooks/useScrollReveal";
import ContactForm from "../components/ContactForm";
import styles from "../styles/Contact.module.css";

const contactDetails = [
  {
    icon: "📧",
    label: "Email",
    value: "dragulescumirela@gmail.com",
    href: "mailto:dragulescumirela@gmail.com",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+34 642 251 466",
    href: "tel:+34642251466",
  },
  {
    icon: "🔗",
    label: "LinkedIn",
    value: "linkedin.com/in/mirela-dragulescu",
    href: "https://linkedin.com/in/mirela-dragulescu",
  },
  { icon: "📍", label: "Location", value: "Barcelona, Spain", href: null },
];

export default function Contact() {
  useScrollReveal();

  return (
    <>
      {/* ── PAGE HERO ─────────────────────────────────────── */}
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">Contact</p>
          <h1>
            Let's talk about
            <br />
            your <em className={styles.italic}>project</em>.
          </h1>
          <p className={styles.heroSub}>
            Whether you're planning a T&E transformation, need a programme
            manager for a multi-country rollout, or want to explore what a
            consulting engagement could look like — I'd like to hear about it.
          </p>
        </div>
      </section>

      {/* ── CONTACT CONTENT ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Left col — info */}
            <div className="reveal">
              <p className="section-label">Get in touch</p>
              <h2>How to reach me</h2>
              <div className="divider" />

              <ul className={styles.detailsList}>
                {contactDetails.map(({ icon, label, value, href }) => (
                  <li key={label} className={styles.detailItem}>
                    <span className={styles.detailIcon}>{icon}</span>
                    <div>
                      <p className={styles.detailLabel}>{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className={styles.detailValue}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {value}
                        </a>
                      ) : (
                        <p className={styles.detailValue}>{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.availability}>
                <p className={styles.availLabel}>Availability</p>
                <p>
                  Open to consulting engagements and senior roles. Available for
                  hybrid and remote work across Europe. Response time: within
                  one business day.
                </p>
              </div>

              <div className={styles.languages}>
                <p className={styles.availLabel}>I work in</p>
                <div className={styles.langBadges}>
                  {["🇬🇧 English", "🇪🇸 Spanish", "🇫🇷 French", "🇷🇴 Romanian"].map(
                    (l) => (
                      <span key={l} className={styles.langBadge}>
                        {l}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Right col — form */}
            <div className={`reveal reveal-delay-2 ${styles.formWrap}`}>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>Send a message</h3>
                <p className={styles.formSub}>
                  Tell me about your project and I'll get back to you within one
                  business day.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ─────────────────────────────── */}
      <section className="section section--ivory">
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p className="section-label">Process</p>
            <h2>What happens after you reach out</h2>
          </div>

          <div className={styles.nextSteps}>
            {[
              {
                step: "01",
                heading: "I respond",
                body: "Within one business day — with a brief summary of how I understand your need and whether I think I can help.",
              },
              {
                step: "02",
                heading: "We talk",
                body: "A 30-minute call to understand your project in detail: scope, timeline, constraints, budget, and what success looks like.",
              },
              {
                step: "03",
                heading: "I propose",
                body: "A clear, written proposal outlining the engagement model, deliverables, timeline, and investment.",
              },
              {
                step: "04",
                heading: "We start",
                body: "If the proposal works for you, we agree the terms and begin. No complicated procurement process, no unnecessary delay.",
              },
            ].map(({ step, heading, body }, i) => (
              <div
                key={step}
                className={`reveal reveal-delay-${i + 1} ${styles.nextStep}`}
              >
                <span className={styles.stepNum}>{step}</span>
                <h4 className={styles.stepHeading}>{heading}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
