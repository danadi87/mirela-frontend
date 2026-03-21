import { useState } from "react";
import styles from "../styles/ContactForm.module.css";

const INITIAL = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Please add a subject.";
    if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters.";
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
    // Simulate async send — replace with Formspree / EmailJS / Resend
    await new Promise((res) => setTimeout(res, 1400));
    setStatus("sent");
    setForm(INITIAL);
  };

  if (status === "sent") {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <h3>Message sent — thank you.</h3>
        <p>I'll get back to you within one business day.</p>
        <button
          className={`btn btn--outline ${styles.resetBtn}`}
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <Field
          label="Full Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g. Jane Smith"
        />
        <Field
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@company.com"
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        type="text"
        value={form.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder="e.g. T&E programme consulting"
      />

      <Field
        label="Message"
        name="message"
        type="textarea"
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Tell me about your project, timeline, and what you're looking to achieve…"
        rows={6}
      />

      <div className={styles.footer}>
        <p className={styles.note}>
          I respond to all enquiries within one business day.
        </p>
        <button
          type="submit"
          className={`btn btn--primary ${styles.submit}`}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send Message →"}
        </button>
      </div>
    </form>
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
          aria-describedby={error ? `${name}-error` : undefined}
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
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      {error && (
        <span id={`${name}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
