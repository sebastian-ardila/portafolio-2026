import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import enHero from './locales/en/hero.json'
import enAbout from './locales/en/about.json'
import enSkills from './locales/en/skills.json'
import enExperience from './locales/en/experience.json'
import enProjects from './locales/en/projects.json'
import enBlog from './locales/en/blog.json'
import enContact from './locales/en/contact.json'
import enTerminal from './locales/en/terminal.json'
import enProfile from './locales/en/profile.json'

import esCommon from './locales/es/common.json'
import esHero from './locales/es/hero.json'
import esAbout from './locales/es/about.json'
import esSkills from './locales/es/skills.json'
import esExperience from './locales/es/experience.json'
import esProjects from './locales/es/projects.json'
import esBlog from './locales/es/blog.json'
import esContact from './locales/es/contact.json'
import esTerminal from './locales/es/terminal.json'
import esProfile from './locales/es/profile.json'

const resources = {
  en: {
    common: enCommon,
    hero: enHero,
    about: enAbout,
    skills: enSkills,
    experience: enExperience,
    projects: enProjects,
    blog: enBlog,
    contact: enContact,
    terminal: enTerminal,
    profile: enProfile,
  },
  es: {
    common: esCommon,
    hero: esHero,
    about: esAbout,
    skills: esSkills,
    experience: esExperience,
    projects: esProjects,
    blog: esBlog,
    contact: esContact,
    terminal: esTerminal,
    profile: esProfile,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    ns: [
      'common',
      'hero',
      'about',
      'skills',
      'experience',
      'projects',
      'blog',
      'contact',
      'terminal',
      'profile',
    ],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
