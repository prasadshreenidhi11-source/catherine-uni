import { useEffect, useState, useMemo, useCallback } from 'react'
import { loadGoogleTranslate, saveTranslateCookie } from './googleTranslate'
import { SUPPORTED_LANGUAGES } from './translationConstants'
import { TranslationContext } from './translationInstance'

export function TranslationProvider({ children }) {
  const [currentLanguage] = useState(() => {
    try {
      return localStorage.getItem('cms_selected_language') || 'en'
    } catch {
      return 'en'
    }
  })

  // Save selection across page navigations / reloads
  useEffect(() => {
    try {
      localStorage.setItem('cms_selected_language', currentLanguage)
    } catch {
      // Ignore localStorage errors
    }

    const selectedConfig = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)
    if (selectedConfig?.dir === 'rtl') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
    // lang stays "en" (the source language); Google updates it once translated
  }, [currentLanguage])

  // Google translates the rendered page, so components keep their English text.
  // Translating here as well would hand Google text that is no longer English.
  const translate = useCallback((text) => text, [])

  useEffect(() => {
    saveTranslateCookie(currentLanguage)
    if (currentLanguage !== 'en') {
      loadGoogleTranslate(
        SUPPORTED_LANGUAGES.map((l) => l.code).filter((code) => code !== 'en')
      )
    }
  }, [currentLanguage])

  const value = useMemo(() => ({
    currentLanguage,
    // A reload is the reliable way to switch or restore a translated page
    setLanguage: (language) => {
      if (language === currentLanguage) return
      try {
        localStorage.setItem('cms_selected_language', language)
      } catch {
        // Ignore localStorage errors
      }
      saveTranslateCookie(language)
      window.location.reload()
    },
    translate,
    languages: SUPPORTED_LANGUAGES,
  }), [currentLanguage, translate])

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}
