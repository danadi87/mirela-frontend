import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/ContactForm.module.css";
import emailjs from "@emailjs/browser";

const INITIAL = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const { tc } = useLanguage();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = tc("contactForm", "nameError");
    if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = tc("contactForm", "emailError");
    if (!form.subject.trim()) e.subject = tc("contactForm", "subjectError");
    if (form.message.trim().length < 20)
      e.message = tc("contactForm", "messageError");
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
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
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
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <h3>{tc("contactForm", "successTitle")}</h3>
        <p>{tc("contactForm", "successSub")}</p>
        <button
          className={`btn btn--outline ${styles.resetBtn}`}
          onClick={() => setStatus("idle")}
        >
          {tc("contactForm", "sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <Field
          label={tc("contactForm", "nameLabel")}
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder={tc("contactForm", "namePlaceholder")}
        />
        <Field
          label={tc("contactForm", "emailLabel")}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder={tc("contactForm", "emailPlaceholder")}
        />
      </div>
      <Field
        label={tc("contactForm", "subjectLabel")}
        name="subject"
        type="text"
        value={form.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder={tc("contactForm", "subjectPlaceholder")}
      />
      <Field
        label={tc("contactForm", "messageLabel")}
        name="message"
        type="textarea"
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        placeholder={tc("contactForm", "messagePlaceholder")}
        rows={6}
      />
      <div className={styles.footer}>
        <p className={styles.note}>{tc("contactForm", "note")}</p>
        <button
          type="submit"
          className={`btn btn--primary ${styles.submit}`}
          disabled={status === "sending"}
        >
          {status === "sending"
            ? tc("contactForm", "sending")
            : tc("contactForm", "send")}
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
