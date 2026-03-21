import { createContext, useContext, useState } from "react";

// ─── TRANSLATIONS ────────────────────────────────────────────────
export const translations = {
  en: {
    // Navbar
    nav: {
      about: "About",
      services: "Services",
      projects: "Case Studies",
      resources: "Resources",
      contact: "Contact",
      cta: "Get In Touch",
    },
    // Home
    home: {
      tag: "Finance Transformation · Project Management",
      heading: "I make complex European finance programmes land.",
      sub: "9+ years delivering cross-border T&E implementations, corporate card rollouts, and change management programmes — across 10+ countries, in four languages, at C-suite level.",
      cta1: "See What I Do →",
      cta2: "View Case Studies",
      whyTitle: "Finance transformation is about people, not just platforms.",
      whyBody1:
        "The technology is rarely the hard part. The hard part is getting a CFO in Germany, an HR Director in France, and a Procurement team in Spain to agree on the same process — and then actually use it.",
      whyBody2:
        "I've spent 9 years sitting in those rooms. I know how to manage the stakeholder politics, run the change programme, and deliver the system — all at once, across borders, in multiple languages.",
      aboutBtn: "About Me →",
      servicesLabel: "What I do",
      servicesTitle: "Services",
      servicesAll: "All services →",
      caseLabel: "Proof of work",
      caseTitle: "Case Studies",
      caseAll: "All case studies →",
      ctaBandTag: "Let's work together",
      ctaBandTitle: "Running a finance transformation project in Europe?",
      ctaBandBody:
        "Whether you need someone to lead the programme, manage the vendor, design the change strategy — or all three — let's talk.",
      ctaBandBtn1: "Start a Conversation",
      ctaBandBtn2: "See My Work First",
    },
    // Resources
    resources: {
      tag: "Resources",
      heading: "Practical tools for finance transformation.",
      sub: "Free and premium guides, checklists, and insights built from 9+ years delivering cross-border T&E and finance programmes across Europe.",
      freeLabel: "Free resources",
      freeTitle: "Download & use immediately.",
      premLabel: "Premium materials",
      premTitle: "Go deeper.",
      artLabel: "Insights",
      artTitle: "Perspectives from the field.",
      ctaTag: "Work with me",
      ctaTitle: "Need more than a checklist?",
      ctaBody:
        "If you are running a T&E or finance transformation programme and need an experienced pair of hands, let's talk.",
      ctaBtn1: "Get In Touch",
      ctaBtn2: "See My Services",
      free: "Free",
      premium: "Premium",
      download: "Download Free →",
      buy: "Buy Now →",
      readMore: "Read more →",
      readTime: "min read",
      new: "New",
    },
    // Contact
    contact: {
      tag: "Contact",
      heading: "Let's talk about your project.",
      sub: "Whether you're planning a T&E transformation, need a programme manager for a multi-country rollout, or want to explore what a consulting engagement could look like — I'd like to hear about it.",
    },
    // Footer
    footer: {
      tagline: "Finance Transformation · Project Management",
      nav: "Navigation",
      connect: "Connect",
      rights: "All rights reserved.",
      location: "Barcelona, Spain",
    },
  },

  es: {
    nav: {
      about: "Sobre mí",
      services: "Servicios",
      projects: "Proyectos",
      resources: "Recursos",
      contact: "Contacto",
      cta: "Contactar",
    },
    home: {
      tag: "Transformación Financiera · Gestión de Proyectos",
      heading:
        "Hago que los programas financieros europeos más complejos funcionen.",
      sub: "Más de 9 años entregando implementaciones T&E transfronterizas, programas de tarjetas corporativas y gestión del cambio — en más de 10 países, en cuatro idiomas, a nivel de C-suite.",
      cta1: "Ver mis servicios →",
      cta2: "Ver proyectos",
      whyTitle:
        "La transformación financiera es sobre personas, no solo plataformas.",
      whyBody1:
        "La tecnología rara vez es la parte difícil. Lo difícil es lograr que un CFO en Alemania, un Director de RRHH en Francia y un equipo de Compras en España acuerden el mismo proceso — y luego lo usen.",
      whyBody2:
        "He pasado 9 años en esas reuniones. Sé cómo gestionar la política de stakeholders, ejecutar el programa de cambio y entregar el sistema — todo a la vez, sin fronteras, en múltiples idiomas.",
      aboutBtn: "Sobre mí →",
      servicesLabel: "Qué hago",
      servicesTitle: "Servicios",
      servicesAll: "Todos los servicios →",
      caseLabel: "Prueba de trabajo",
      caseTitle: "Casos de Estudio",
      caseAll: "Todos los casos →",
      ctaBandTag: "Trabajemos juntos",
      ctaBandTitle:
        "¿Tienes un proyecto de transformación financiera en Europa?",
      ctaBandBody:
        "Si necesitas a alguien que lidere el programa, gestione al proveedor o diseñe la estrategia de cambio — hablemos.",
      ctaBandBtn1: "Empezar una conversación",
      ctaBandBtn2: "Ver mis proyectos primero",
    },
    resources: {
      tag: "Recursos",
      heading: "Herramientas prácticas para la transformación financiera.",
      sub: "Guías, checklists e insights gratuitos y premium, elaborados con más de 9 años entregando programas T&E y financieros en toda Europa.",
      freeLabel: "Recursos gratuitos",
      freeTitle: "Descarga y usa de inmediato.",
      premLabel: "Materiales premium",
      premTitle: "Profundiza más.",
      artLabel: "Perspectivas",
      artTitle: "Desde el terreno.",
      ctaTag: "Trabaja conmigo",
      ctaTitle: "¿Necesitas más que un checklist?",
      ctaBody:
        "Si estás ejecutando un programa de transformación T&E o financiera y necesitas manos expertas, hablemos.",
      ctaBtn1: "Contactar",
      ctaBtn2: "Ver mis servicios",
      free: "Gratis",
      premium: "Premium",
      download: "Descargar gratis →",
      buy: "Comprar →",
      readMore: "Leer más →",
      readTime: "min de lectura",
      new: "Nuevo",
    },
    contact: {
      tag: "Contacto",
      heading: "Hablemos sobre tu proyecto.",
      sub: "Si estás planificando una transformación T&E, necesitas un gestor de programas para un despliegue multi-país, o quieres explorar cómo podría ser una consultoría — me encantaría escucharte.",
    },
    footer: {
      tagline: "Transformación Financiera · Gestión de Proyectos",
      nav: "Navegación",
      connect: "Conectar",
      rights: "Todos los derechos reservados.",
      location: "Barcelona, España",
    },
  },

  fr: {
    nav: {
      about: "À propos",
      services: "Services",
      projects: "Études de cas",
      resources: "Ressources",
      contact: "Contact",
      cta: "Me contacter",
    },
    home: {
      tag: "Transformation financière · Gestion de projet",
      heading: "Je fais aboutir les programmes financiers européens complexes.",
      sub: "Plus de 9 ans à délivrer des implémentations T&E transfrontalières, des programmes de cartes d'entreprise et des programmes de conduite du changement — dans plus de 10 pays, en quatre langues, au niveau direction.",
      cta1: "Voir mes services →",
      cta2: "Voir les études de cas",
      whyTitle:
        "La transformation financière concerne les personnes, pas seulement les plateformes.",
      whyBody1:
        "La technologie est rarement la partie difficile. Ce qui est difficile, c'est d'amener un CFO en Allemagne, un DRH en France et une équipe achats en Espagne à s'accorder sur le même processus — et à l'utiliser réellement.",
      whyBody2:
        "J'ai passé 9 ans dans ces réunions. Je sais gérer la politique des parties prenantes, piloter le programme de changement et délivrer le système — simultanément, sans frontières, en plusieurs langues.",
      aboutBtn: "À propos →",
      servicesLabel: "Ce que je fais",
      servicesTitle: "Services",
      servicesAll: "Tous les services →",
      caseLabel: "Preuves concrètes",
      caseTitle: "Études de cas",
      caseAll: "Toutes les études →",
      ctaBandTag: "Travaillons ensemble",
      ctaBandTitle:
        "Vous menez un projet de transformation financière en Europe ?",
      ctaBandBody:
        "Si vous avez besoin de quelqu'un pour piloter le programme, gérer le fournisseur ou concevoir la stratégie de changement — parlons-en.",
      ctaBandBtn1: "Démarrer une conversation",
      ctaBandBtn2: "Voir mes travaux d'abord",
    },
    resources: {
      tag: "Ressources",
      heading: "Outils pratiques pour la transformation financière.",
      sub: "Guides, checklists et analyses gratuits et premium, issus de 9+ ans à délivrer des programmes T&E et financiers dans toute l'Europe.",
      freeLabel: "Ressources gratuites",
      freeTitle: "Téléchargez et utilisez immédiatement.",
      premLabel: "Ressources premium",
      premTitle: "Pour aller plus loin.",
      artLabel: "Perspectives",
      artTitle: "Du terrain.",
      ctaTag: "Travaillons ensemble",
      ctaTitle: "Vous avez besoin de plus qu'une checklist ?",
      ctaBody:
        "Si vous pilotez un programme de transformation T&E ou financière et avez besoin d'une main expérimentée, parlons-en.",
      ctaBtn1: "Me contacter",
      ctaBtn2: "Voir mes services",
      free: "Gratuit",
      premium: "Premium",
      download: "Télécharger gratuitement →",
      buy: "Acheter →",
      readMore: "Lire la suite →",
      readTime: "min de lecture",
      new: "Nouveau",
    },
    contact: {
      tag: "Contact",
      heading: "Parlons de votre projet.",
      sub: "Que vous planifiiez une transformation T&E, ayez besoin d'un chef de programme pour un déploiement multi-pays, ou souhaitiez explorer ce que pourrait être une mission de conseil — je serais ravi d'en discuter.",
    },
    footer: {
      tagline: "Transformation Financière · Gestion de Projet",
      nav: "Navigation",
      connect: "Connecter",
      rights: "Tous droits réservés.",
      location: "Barcelone, Espagne",
    },
  },
};

// ─── CONTEXT ─────────────────────────────────────────────────────
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const t = (section, key) => {
    return (
      translations[lang]?.[section]?.[key] ??
      translations["en"]?.[section]?.[key] ??
      key
    );
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── HOOK ────────────────────────────────────────────────────────
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
