import 'intl-pluralrules'; // Polyfill für Intl.PluralRules
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Importiere die Übersetzungsdateien
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import it from './locales/it.json';
import ru from './locales/ru.json';
import nl from './locales/nl.json';
import sv from './locales/sv.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import he from './locales/he.json';
import pl from './locales/pl.json';
import hi from './locales/hi.json';
import tr from './locales/tr.json';
import id from './locales/id.json';
import fa from './locales/fa.json';
import uk from './locales/uk.json';
import romanes from './locales/romanes.json';



i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
      es: { translation: es },
      pt: { translation: pt },
      it: { translation: it },
      ru: { translation: ru },
      nl: { translation: nl },
      sv: { translation: sv },
      ja: { translation: ja },
      ko: { translation: ko },
      zh: { translation: zh },
      ar: { translation: ar },
      he: { translation: he },
      pl: { translation: pl },
      hi: { translation: hi },
      tr: { translation: tr },
      id: { translation: id },
      fa: { translation: fa },
      uk: { translation: uk },
      romanes: { translation: romanes },
    },
    lng: Localization.getLocales()[0].languageCode || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
