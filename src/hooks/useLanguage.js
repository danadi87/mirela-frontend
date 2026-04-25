import { createContext, useContext, useState, createElement } from "react";
import { translations, componentTranslations } from "./translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const t = (section, key) =>
    translations[lang]?.[section]?.[key] ??
    translations["en"]?.[section]?.[key] ??
    key;

  const tc = (component, key) =>
    componentTranslations[lang]?.[component]?.[key] ??
    componentTranslations["en"]?.[component]?.[key] ??
    key;

  return createElement(
    LanguageContext.Provider,
    { value: { lang, setLang, t, tc } },
    children,
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
