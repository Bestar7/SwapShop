import { createI18n, type I18n } from 'vue-i18n';
import fr from '~/locales/fr.json';
import en from '~/locales/en.json';
import xx from '~/locales/xx.json';

const availableLanguages = {fr:fr, en:en, xx:xx}

const i18n: I18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages: availableLanguages,
  globalInjection: true, // inject $t function in Vue app
})

export default i18n;