import { createContext } from 'react'
import { SUPPORTED_LANGUAGES } from './translationConstants'

export const TranslationContext = createContext({
  currentLanguage: 'en',
  setLanguage: () => {},
  translate: (text) => text,
  isTranslating: false,
  error: null,
  languages: SUPPORTED_LANGUAGES,
})
