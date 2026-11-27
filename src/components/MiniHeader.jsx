
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Phone,
  Search,
  Globe,
  ChevronDown,
  Check,
  ArrowUpRight,
  X
} from 'lucide-react'

import { useTranslation } from '../context/useTranslation'
import './MiniHeader.css'

function FacebookIcon(props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

// All searchable school sections
const searchSections = [
  {
    title: 'Principal Welcome',
    category: 'Our School',
    id: 'principal-welcome',
    keywords: 'principal welcome message leadership'
  },
  {
    title: 'School Timeline',
    category: 'Our School',
    id: 'school-timeline',
    keywords: 'history timeline school journey'
  },
  {
    title: 'Teaching & Learning',
    category: 'Learning',
    id: 'teaching-learning',
    keywords: 'teaching education learning curriculum'
  },
  {
    title: 'News & Stories',
    category: 'News & Events',
    id: 'news-stories',
    keywords: 'news stories updates articles'
  },
  {
    title: 'Our Values',
    category: 'Our School',
    id: 'our-values',
    keywords: 'values school community'
  },
  {
    title: 'Visit Us',
    category: 'Contact & Location',
    id: 'visit-us',
    keywords: 'visit location address directions'
  },
  {
    title: 'Enrolment',
    category: 'Join Our School',
    id: 'enrolment',
    keywords: 'enrolment enrol enrollment apply prospectus reception transition'
  },
  {
    title: 'Contact Us',
    category: 'Contact & Location',
    id: 'contact',
    keywords: 'contact phone email enquiry'
  },
  {
    title: 'Weather Report',
    category: 'School Information',
    id: 'weather-report',
    keywords: 'weather forecast temperature'
  }
]

export default function MiniHeader() {
  const {
    currentLanguage,
    setLanguage,
    languages,
    translate
  } = useTranslation()

  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const dropdownRef = useRef(null)
  const searchPanelRef = useRef(null)
  const searchInputRef = useRef(null)

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setLangMenuOpen(false)
      }

      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(e.target) &&
        !e.target.closest('.mini-action-btn')
      ) {
        setSearchOpen(false)
      }
    }

    function handleEscape(e) {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setLangMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [searchOpen])

  const currentLangObj =
    languages.find(lang => lang.code === currentLanguage) || languages[0]

  // Language selection
  const handleSelectLanguage = (code) => {
    setLanguage(code)
    setLangMenuOpen(false)
  }

  // Search filtering
  const filteredSections = searchSections.filter(section => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) return true

    const searchableText = [
      section.title,
      section.category,
      section.keywords
    ].join(' ').toLowerCase()

    return searchableText.includes(query)
  })

  // Navigate to the actual section on the page
  const handleSectionClick = (section) => {
    const target = document.getElementById(section.id)

    if (!target) {
      console.error(
        `Cannot find section with ID "${section.id}". Add this ID to the section's outermost element.`
      )
      return
    }

    setSearchOpen(false)
    setSearchQuery('')
    setLangMenuOpen(false)

    // Wait for the search panel to close before scrolling
    requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  // Press Enter to open the first matching result
  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if (filteredSections.length > 0) {
      handleSectionClick(filteredSections[0])
    }
  }

  // The bar is pinned to the screen, so it is rendered outside #root (the hero
  // would otherwise trap it) and a spacer keeps its place at the top of the hero.
  const barRef = useRef(null)
  const [barHeight, setBarHeight] = useState(48)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const observer = new ResizeObserver(() => setBarHeight(bar.offsetHeight))
    observer.observe(bar)

    return () => observer.disconnect()
  }, [])

  const bar = (
    <div ref={barRef} className="mini-header" role="region" aria-label="Utility Header">

      <div className="mini-header-inner">

        {/* LEFT SIDE */}
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
            <Phone
              size={13}
              strokeWidth={2}
              className="mini-phone-icon"
            />

            <span className="mini-phone-text">
              (08) 8259 4700
            </span>
          </a>

        </div>

        {/* RIGHT SIDE */}
        <div className="mini-header-right">

          {/* SEARCH BUTTON */}
          <button
            type="button"
            className={`mini-action-btn ${searchOpen ? 'active' : ''}`}
            onClick={() => {
              setSearchOpen(prev => !prev)
              setLangMenuOpen(false)
            }}
            aria-label="Open website search"
            aria-expanded={searchOpen}
          >
            <Search size={15} strokeWidth={2} />

            <span className="mini-action-label">
              {translate('Search')}
            </span>
          </button>

          <span className="mini-separator" aria-hidden="true" />

          {/* LANGUAGE SELECTOR */}
          <div className="mini-lang-dropdown notranslate" translate="no" ref={dropdownRef}>

            <button
              type="button"
              className={`mini-lang-btn ${langMenuOpen ? 'active' : ''}`}
              onClick={() => {
                setLangMenuOpen(prev => !prev)
                setSearchOpen(false)
              }}
              aria-haspopup="true"
              aria-expanded={langMenuOpen}
              aria-label="Select website language"
            >
              <Globe
                size={14}
                strokeWidth={1.8}
                className="mini-globe-icon"
              />

              <span className="mini-lang-label">
                {currentLanguage === 'en'
                  ? translate('Select language')
                  : currentLangObj.nativeName}
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
                        <span className="mini-lang-name">
                          {lang.name}
                        </span>

                        <span className="mini-lang-native">
                          ({lang.nativeName})
                        </span>

                        {isSelected && (
                          <Check
                            size={13}
                            className="mini-check-icon"
                          />
                        )}
                      </button>

                    </li>
                  )
                })}

              </ul>
            )}

          </div>
        </div>
      </div>

      {/* SEARCH PANEL */}
      {searchOpen && (
        <div className="school-search-panel" ref={searchPanelRef}>

          <form
            className="school-search-form"
            onSubmit={handleSearchSubmit}
          >
            <Search
              size={20}
              className="school-search-icon"
            />

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search pages, e.g. school timeline"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search school website"
            />

            {searchQuery && (
              <button
                type="button"
                className="school-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </form>

          <div className="school-search-content">

            <div className="school-search-heading">
              {searchQuery.trim() ? 'SEARCH RESULTS' : 'POPULAR'}
            </div>

            {filteredSections.length > 0 ? (

              <div className="school-search-results">

                {filteredSections.map(section => (
                  <button
                    type="button"
                    className="school-search-result"
                    key={section.id}
                    onClick={() => handleSectionClick(section)}
                  >
                    <span className="school-search-result-text">

                      <span className="school-search-result-title">
                        {section.title}
                      </span>

                      <span className="school-search-result-category">
                        {section.category}
                      </span>

                    </span>

                    <ArrowUpRight
                      size={19}
                      className="school-search-result-arrow"
                    />
                  </button>
                ))}

              </div>

            ) : (

              <div className="school-search-empty">
                <Search size={23} />
                <p>No matching sections found.</p>
                <span>Try another search term.</span>
              </div>

            )}

          </div>
        </div>
      )}

    </div>
  )

  return (
    <>
      <div className="mini-header-spacer" style={{ height: barHeight }} />
      {createPortal(bar, document.getElementById('utility-bar') || document.body)}
    </>
  )
}
