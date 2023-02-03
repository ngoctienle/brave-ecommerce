import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_CONFIG_EN from 'src/locales/en/header.json'
import PRODUCT_CONFIG_EN from 'src/locales/en/product.json'
import ERROR_CONFIG_EN from 'src/locales/en/error.json'
import GENERAL_CONFIG_EN from 'src/locales/en/common.json'

import HOME_CONFIG_VI from 'src/locales/vi/header.json'
import PRODUCT_CONFIG_VI from 'src/locales/vi/product.json'
import ERROR_CONFIG_VI from 'src/locales/vi/error.json'
import GENERAL_CONFIG_VI from 'src/locales/vi/common.json'

const resources = {
  en: {
    home: HOME_CONFIG_EN,
    product: PRODUCT_CONFIG_EN,
    error: ERROR_CONFIG_EN,
    general: GENERAL_CONFIG_EN
  },
  vi: {
    home: HOME_CONFIG_VI,
    product: PRODUCT_CONFIG_VI,
    error: ERROR_CONFIG_VI,
    general: GENERAL_CONFIG_VI
  }
}

const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['home', 'general', 'product', 'error'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})
