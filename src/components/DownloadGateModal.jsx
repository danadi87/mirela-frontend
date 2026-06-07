import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import styles from "../styles/DownloadGateModal.module.css";

// ─── Copy by language ───
const copy = {
  en: {
    heading: "Download your free resource",
    sub: "Please provide a few details to access the download.",
    nameLabel: "Full name",
    namePlaceholder: "e.g. Jane Smith",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    positionLabel: "Job title",
    positionPlaceholder: "e.g. Finance Director",
    companyLabel: "Company name",
    companyPlaceholder: "Your organisation",
    submitBtn: "Download now →",
    sending: "Preparing…",
    successHeading: "Your download is ready.",
    successSub: "Thank you — click below to download the resource.",
    downloadBtn: "Download →",
    closeBtn: "Close",
    nameError: "Please enter your full name.",
    emailError: "Please enter a valid work email.",
    positionError: "Please enter your job title.",
    companyError: "Please enter your company name.",
    privacy:
      "Details are used only to send you the resource and relevant updates. Unsubscribe at any time.",
  },
  es: {
    heading: "Descarga tu recurso gratuito",
    sub: "Por favor, proporciona algunos datos para acceder a la descarga.",
    nameLabel: "Nombre completo",
    namePlaceholder: "p.ej. Ana García",
    emailLabel: "Email profesional",
    emailPlaceholder: "tu@empresa.com",
    positionLabel: "Cargo",
    positionPlaceholder: "p.ej. Director/a Financiero/a",
    companyLabel: "Empresa",
    companyPlaceholder: "Tu organización",
    submitBtn: "Descargar ahora →",
    sending: "Preparando…",
    successHeading: "Tu descarga está lista.",
    successSub: "Gracias — haz clic abajo para descargar el recurso.",
    downloadBtn: "Descargar →",
    closeBtn: "Cerrar",
    nameError: "Por favor, introduce tu nombre completo.",
    emailError: "Por favor, introduce un email profesional válido.",
    positionError: "Por favor, introduce tu cargo.",
    companyError: "Por favor, introduce el nombre de tu empresa.",
    privacy:
      "Los datos se usan únicamente para enviarte el recurso y actualizaciones relevantes. Cancela cuando quieras.",
  },
  fr: {
    heading: "Téléchargez votre ressource gratuite",
    sub: "Veuillez fournir quelques informations pour accéder au téléchargement.",
    nameLabel: "Nom complet",
    namePlaceholder: "ex. Marie Dupont",
    emailLabel: "E-mail professionnel",
    emailPlaceholder: "vous@entreprise.com",
    positionLabel: "Intitulé de poste",
    positionPlaceholder: "ex. Directeur/Directrice Financier(e)",
    companyLabel: "Entreprise",
    companyPlaceholder: "Votre organisation",
    submitBtn: "Télécharger maintenant →",
    sending: "Préparation…",
    successHeading: "Votre téléchargement est prêt.",
    successSub: "Merci — cliquez ci-dessous pour télécharger la ressource.",
    downloadBtn: "Télécharger →",
    closeBtn: "Fermer",
    nameError: "Veuillez entrer votre nom complet.",
    emailError: "Veuillez entrer un e-mail professionnel valide.",
    positionError: "Veuillez entrer votre intitulé de poste.",
    companyError: "Veuillez entrer le nom de votre entreprise.",
    privacy:
      "Vos informations sont utilisées uniquement pour vous envoyer la ressource et des mises à jour pertinentes. Désinscription possible à tout moment.",
  },
};

const INITIAL = { name: "", email: "", position: "", company: "" };

export default function DownloadGateModal({ resource, onClose }) {
  const { lang } = useLanguage();
  const c = copy[lang] || copy.en;

  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | ready | error

  const resourceTitle = resource?.title?.[lang] || resource?.title?.en || "";
  const downloadUrl = resource?.downloadUrl || null;

  // ── Validation ───────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = c.nameError;
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = c.emailError;
    if (!form.position.trim()) e.position = c.positionError;
    if (!form.company.trim()) e.company = c.companyError;
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Submit: write to Airtable, then reveal download ──────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("sending");

    // ── 1. Write lead to Airtable ──
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${encodeURIComponent(import.meta.env.VITE_AIRTABLE_TABLE)}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              Name: form.name,
              Email: form.email,
              Position: form.position,
              Company: form.company,
              Resource: resourceTitle,
              Timestamp: new Date().toISOString(),
              Status: "New",
            },
          }),
        },
      );

      if (!response.ok) {
        // Log the error detail but do not block the user
        const detail = await response.text();
        console.warn("Airtable write failed:", response.status, detail);
      }
    } catch (err) {
      // Network failure — non-blocking, download still proceeds
      console.warn("Airtable request error:", err);
    }

    // ── 2. Optional EmailJS notification ──
    // Remove this block if you no longer want individual emails.
    // The Airtable record is the source of truth either way.
    try {
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          position: form.position,
          company: form.company,
          resource_title: resourceTitle,
          subject: `New download — ${resourceTitle}`,
          message: `${form.name} (${form.position} at ${form.company}) downloaded: ${resourceTitle}`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
    } catch (err) {
      // EmailJS failure is non-blocking
      console.warn("EmailJS notification failed:", err);
    }

    // ── 3. Reveal the download button ───
    setStatus("ready");
  };

  // ── Trigger the actual file download ───
  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = downloadUrl.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={c.heading}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Resource identity strip */}
        <div
          className={styles.resourceStrip}
          style={{ "--accent": resource?.color }}
        >
          <span className={styles.stripIcon}>{resource?.icon}</span>
          <span className={styles.stripTitle}>{resourceTitle}</span>
          <span className={styles.stripFormat}>{resource?.format}</span>
        </div>

        {/* ── SUCCESS STATE ─── */}
        {status === "ready" ? (
          <div className={styles.success}>
            <span className={styles.successIcon}>✓</span>
            <h2 className={styles.successHeading}>{c.successHeading}</h2>
            <p className={styles.successSub}>{c.successSub}</p>
            {downloadUrl ? (
              <button
                className={`btn btn--primary ${styles.downloadBtn}`}
                onClick={handleDownload}
              >
                {c.downloadBtn}
              </button>
            ) : (
              <p className={styles.noFileFallback}>
                {lang === "fr"
                  ? "Le fichier sera disponible prochainement. Un e-mail vous sera envoyé dès qu'il sera prêt."
                  : lang === "es"
                    ? "El archivo estará disponible próximamente. Recibirás un email cuando esté listo."
                    : "The file will be available shortly. You will receive an email when it is ready."}
              </p>
            )}
            <button
              className={`btn btn--outline ${styles.closeAfter}`}
              onClick={onClose}
            >
              {c.closeBtn}
            </button>
          </div>
        ) : (
          /* ── FORM STATE ─── */
          <>
            <div className={styles.header}>
              <h2 className={styles.heading}>{c.heading}</h2>
              <p className={styles.sub}>{c.sub}</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <Field
                  label={c.nameLabel}
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder={c.namePlaceholder}
                  styles={styles}
                />
                <Field
                  label={c.emailLabel}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder={c.emailPlaceholder}
                  styles={styles}
                />
              </div>

              <div className={styles.row}>
                <Field
                  label={c.positionLabel}
                  name="position"
                  type="text"
                  value={form.position}
                  onChange={handleChange}
                  error={errors.position}
                  placeholder={c.positionPlaceholder}
                  styles={styles}
                />
                <Field
                  label={c.companyLabel}
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  error={errors.company}
                  placeholder={c.companyPlaceholder}
                  styles={styles}
                />
              </div>

              <p className={styles.privacy}>{c.privacy}</p>

              <button
                type="submit"
                className={`btn btn--primary ${styles.submitBtn}`}
                disabled={status === "sending"}
              >
                {status === "sending" ? c.sending : c.submitBtn}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Reusable field ──
function Field({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  styles,
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={`gate-${name}`} className={styles.label}>
        {label}
      </label>
      <input
        id={`gate-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        autoComplete={
          name === "email"
            ? "email"
            : name === "name"
              ? "name"
              : name === "company"
                ? "organization"
                : "off"
        }
      />
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
