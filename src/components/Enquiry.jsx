import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/Enquiry.module.css";
import emailjs from "@emailjs/browser";

const INITIAL = {
  org: "",
  role: "",
  email: "",
  challenge: "",
  budget: "",
};

export default function Enquiry() {
  useScrollReveal();
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.org.trim()) e.org = "Required";
    if (!form.role.trim()) e.role = "Required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "A valid email is required";
    if (form.challenge.trim().length < 40)
      e.challenge = "Please describe the challenge in at least a few sentences";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.role,
          from_email: form.email,
          org: form.org,
          role: form.role,
          message: form.challenge,
          budget: form.budget,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      setForm(INITIAL);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={styles.successPage}>
        <div className={styles.successInner}>
          <span className={styles.successIcon}>✓</span>
          <h2>{t("enquiry", "successTitle")}</h2>
          <p>{t("enquiry", "successSub")}</p>
          <Link
            to="/"
            className="btn btn--outline"
            style={{ marginTop: "2rem" }}
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── HERO ──*/}
      <section className={styles.pageHero}>
        <div className="container">
          <p className="tag tag--ivory">{t("enquiry", "tag")}</p>
          <h1>{t("enquiry", "heading")}</h1>
          <p className={styles.heroSub}>{t("enquiry", "sub")}</p>
        </div>
      </section>

      {/* ── SCOPE + FORM ──*/}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {/* ── LEFT: scope context ── */}
            <div className={`reveal ${styles.scopePanel}`}>
              <div className={styles.scopeBlock}>
                <p className="section-label">{t("enquiry", "scopeLabel")}</p>
                <div className="divider" />
                <p>{t("enquiry", "scopeBody")}</p>
              </div>

              <div className={styles.notSuited}>
                <p className={styles.notSuitedLabel}>
                  {t("enquiry", "notSuitedLabel")}
                </p>
                <ul>
                  <li>{t("enquiry", "notSuited1")}</li>
                  <li>{t("enquiry", "notSuited2")}</li>
                  <li>{t("enquiry", "notSuited3")}</li>
                </ul>
              </div>

              <div className={styles.trustSignals}>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>◎</span>
                  <span>Response within one business day</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>◎</span>
                  <span>No commitment at the enquiry stage</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>◎</span>
                  <span>All information treated in strict confidence</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: form ── */}
            <div className={`reveal reveal-delay-2 ${styles.formPanel}`}>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>
                  {t("enquiry", "formTitle")}
                </h3>
                <p className={styles.formSub}>{t("enquiry", "formSub")}</p>

                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={styles.row}>
                    <Field
                      label={t("enquiry", "orgLabel")}
                      name="org"
                      type="text"
                      value={form.org}
                      onChange={handleChange}
                      error={errors.org}
                      placeholder={t("enquiry", "orgPlaceholder")}
                    />
                    <Field
                      label={t("enquiry", "roleLabel")}
                      name="role"
                      type="text"
                      value={form.role}
                      onChange={handleChange}
                      error={errors.role}
                      placeholder={t("enquiry", "rolePlaceholder")}
                    />
                  </div>

                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="your@organisation.com"
                  />

                  <Field
                    label={t("enquiry", "challengeLabel")}
                    name="challenge"
                    type="textarea"
                    value={form.challenge}
                    onChange={handleChange}
                    error={errors.challenge}
                    placeholder={t("enquiry", "challengePlaceholder")}
                    rows={6}
                  />

                  {/* Budget select */}
                  <div className={styles.field}>
                    <label className={styles.label}>
                      {t("enquiry", "budgetLabel")}
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={styles.input}
                    >
                      <option value="">—</option>
                      <option value="u10k">{t("enquiry", "budgetOpt1")}</option>
                      <option value="10-25k">
                        {t("enquiry", "budgetOpt2")}
                      </option>
                      <option value="25-75k">
                        {t("enquiry", "budgetOpt3")}
                      </option>
                      <option value="75k+">{t("enquiry", "budgetOpt4")}</option>
                      <option value="discuss">
                        {t("enquiry", "budgetOpt5")}
                      </option>
                    </select>
                  </div>

                  <div className={styles.formFooter}>
                    <button
                      type="submit"
                      className={`btn btn--primary ${styles.submit}`}
                      disabled={status === "sending"}
                    >
                      {status === "sending"
                        ? "Sending…"
                        : t("enquiry", "submitBtn")}
                    </button>
                    {status === "error" && (
                      <p
                        style={{
                          color: "#e53e3e",
                          fontSize: "0.85rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        Something went wrong. Please try emailing directly.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  rows,
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        />
      )}
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
