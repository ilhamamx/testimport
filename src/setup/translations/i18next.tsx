import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

const fallbackLng = ['id'];
const availableLanguages = ['en', 'id'];

//init i18next
i18next
  .use(Backend) // load translation using xhr -> see /public/locales.
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    // debug: true,
    supportedLngs: availableLanguages,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18next;