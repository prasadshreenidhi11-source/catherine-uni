import { useEffect, useState, useMemo, useCallback } from 'react'
import { SUPPORTED_LANGUAGES, FALLBACK_DICTIONARY } from './translationConstants'
import { TranslationContext } from './translationInstance'

export function TranslationProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      return localStorage.getItem('cms_selected_language') || 'en'
    } catch {
      return 'en'
    }
  })

  // Dynamic live cache for text translated via Google Cloud API endpoint
  const [dynamicCache, setDynamicCache] = useState({})
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState(null)

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
    document.documentElement.lang = currentLanguage
  }, [currentLanguage])

  // Synchronous translation lookup function with fallback
  const translate = useCallback((text) => {
    if (!text || typeof text !== 'string') return text
    if (currentLanguage === 'en') return text

    // 1. Check live Google Cloud dynamic cache
    const cacheKey = `${currentLanguage}:${text}`
    if (dynamicCache[cacheKey]) {
      return dynamicCache[cacheKey]
    }

    // 2. Check local high-fidelity dictionary
    const dict = FALLBACK_DICTIONARY[currentLanguage]
    if (dict && dict[text]) {
      return dict[text]
    }

    return text
  }, [currentLanguage, dynamicCache])

  // Batch translate any new or uncached texts from the backend Google Cloud endpoint
  const translateBatch = useCallback(async (textArray) => {
    if (!textArray || textArray.length === 0 || currentLanguage === 'en') return

    const uncached = textArray.filter(t => {
      const cacheKey = `${currentLanguage}:${t}`
      const hasDynamic = !!dynamicCache[cacheKey]
      const hasStatic = !!FALLBACK_DICTIONARY[currentLanguage]?.[t]
      return !hasDynamic && !hasStatic
    })

    if (uncached.length === 0) return

    setIsTranslating(true)
    setError(null)

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: uncached,
          targetLang: currentLanguage,
          sourceLang: 'en'
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.translations && Array.isArray(data.translations)) {
          setDynamicCache(prev => {
            const next = { ...prev }
            uncached.forEach((original, idx) => {
              const translated = data.translations[idx]
              if (translated) {
                next[`${currentLanguage}:${original}`] = translated
              }
            })
            return next
          })
        }
      }
    } catch (err) {
      console.warn('Google Translation API request failed:', err.message)
      setError(err.message)
    } finally {
      setIsTranslating(false)
    }
  }, [currentLanguage, dynamicCache])

  const value = useMemo(() => ({
    currentLanguage,
    setLanguage: (lang) => {
      setCurrentLanguage(lang)
    },
    translate,
    translateBatch,
    isTranslating,
    error,
    languages: SUPPORTED_LANGUAGES,
  }), [currentLanguage, translate, translateBatch, isTranslating, error])

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}
