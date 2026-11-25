import { useState, useRef, useEffect } from 'react'
import { Phone, Search, Globe, ChevronDown, Check } from 'lucide-react'
import { useTranslation } from '../context/useTranslation'
import './MiniHeader.css'

function FacebookIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function MiniHeader() {
  const { currentLanguage, setLanguage, languages, translate } = useTranslation()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLangObj = languages.find(l => l.code === currentLanguage) || languages[0]

  const handleSelectLanguage = (code) => {
    setLanguage(code)
    setLangMenuOpen(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      alert(`Search for "${searchQuery}"`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <div className="mini-header" role="region" aria-label="Utility Header">
      <div className="mini-header-inner">
        {/* Left Side: Socials, Separator, Phone */}
        <div className="mini-header-left">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mini-icon-btn"
            aria-label="Facebook"
            title="Facebook"
          >
            <FacebookIcon />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mini-icon-btn"
            aria-label="Instagram"
            title="Instagram"
          >
            <InstagramIcon />
          </a>

          <span className="mini-separator" aria-hidden="true" />

          <a
            href="tel:0882594700"
            className="mini-phone-link"
            aria-label="Call Catherine McAuley School (08) 8259 4700"
          >
            <Phone size={13} strokeWidth={2} className="mini-phone-icon" />
            <span className="mini-phone-text">(08) 8259 4700</span>
          </a>
        </div>

        {/* Right Side: Search, Separator, Language Selector */}
        <div className="mini-header-right">
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="mini-search-form">
              <input
                type="text"
                placeholder={translate('Search') + '...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="mini-search-input"
              />
              <button type="submit" className="mini-search-submit" aria-label="Submit search">
                <Search size={13} />
              </button>
              <button
                type="button"
                className="mini-search-close"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              type="button"
              className="mini-action-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search input"
            >
              <Search size={13} strokeWidth={2} />
              <span className="mini-action-label">{translate('Search')}</span>
            </button>
          )}

          <span className="mini-separator" aria-hidden="true" />

          {/* Language Selector Dropdown */}
          <div className="mini-lang-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className={`mini-lang-btn ${langMenuOpen ? 'active' : ''}`}
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-haspopup="true"
              aria-expanded={langMenuOpen}
              aria-label="Select website language"
            >
              <Globe size={14} strokeWidth={1.8} className="mini-globe-icon" />
              <span className="mini-lang-label">
                {currentLanguage === 'en' ? translate('Select language') : currentLangObj.nativeName}
              </span>
              <ChevronDown
                size={12}
                strokeWidth={2.2}
                className={`mini-chevron ${langMenuOpen ? 'rotate' : ''}`}
              />
            </button>

            {langMenuOpen && (
              <ul className="mini-lang-menu" role="menu">
                {languages.map(lang => {
                  const isSelected = lang.code === currentLanguage
                  return (
                    <li key={lang.code} role="none">
                      <button
                        type="button"
                        className={`mini-lang-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelectLanguage(lang.code)}
                        role="menuitem"
                      >
                        <span className="mini-lang-name">{lang.name}</span>
                        <span className="mini-lang-native">({lang.nativeName})</span>
                        {isSelected && <Check size={13} className="mini-check-icon" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
