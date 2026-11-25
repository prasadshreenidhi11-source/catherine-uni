import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react'
import { useTranslation } from '../context/useTranslation'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { translate } = useTranslation()

  // Prevent background scrolling while full-screen navigation menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Support Escape key to close navigation menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'Our School' },
    { href: '#learning', label: 'Teaching & Learning' },
    { href: '#enrolment', label: 'Enrolment' },
    { href: '#community', label: 'Community' },
    { href: '#news', label: 'News & Events' },
    { href: '#contact', label: 'Contact Us' },
  ]

  // Render navigation modal via React Portal directly into document.body
  // This guarantees it is never clipped by .hero { overflow: hidden; isolation: isolate; }
  const navigationPortal = (
    <div
      className={`fullscreen-nav-backdrop ${menuOpen ? 'nav-active' : ''}`}
      aria-hidden={!menuOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Website Navigation Menu"
    >
      <div className="fullscreen-nav-modal">
        {/* Top bar inside navigation modal: brand identification & close button */}
        <div className="fullscreen-nav-top">
          <div className="nav-school-identity">
            <img
              src="/favicon.png"
              alt="Catherine McAuley School"
              className="nav-crest-img"
              width="40"
              height="45"
            />
            <div className="nav-school-names">
              <span className="nav-school-main">Catherine McAuley</span>
              <span className="nav-school-sub">SCHOOL</span>
            </div>
          </div>

          <button
            type="button"
            className="fullscreen-nav-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2.2} />
            <span className="close-text">{translate('Close menu')}</span>
          </button>
        </div>

        {/* Navigation Links and Information Grid */}
        <div className="fullscreen-nav-body">
          <nav className="fullscreen-nav-links" aria-label="Main Website Navigation">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                className="fullscreen-nav-item"
                onClick={closeMenu}
                style={{ '--anim-order': idx }}
              >
                <span className="item-num">0{idx + 1}</span>
                <span className="item-label">{translate(link.label)}</span>
                <ArrowUpRight size={20} className="item-arrow" />
              </a>
            ))}
          </nav>

          {/* Sidebar quick info inside menu */}
          <div className="fullscreen-nav-info">
            <div className="info-block">
              <h4 className="info-heading">{translate('A PLACE TO GROW, LEARN & BELONG')}</h4>
              <p className="info-desc">
                {translate(
                  'Every child has a unique story. We create the space, opportunities and inspiration to help every story flourish.'
                )}
              </p>
            </div>

            <div className="info-contacts">
              <div className="contact-row">
                <Phone size={15} className="contact-icon" />
                <span>(08) 8259 4700</span>
              </div>
              <div className="contact-row">
                <Mail size={15} className="contact-icon" />
                <span>info@cms.catholic.edu.au</span>
              </div>
              <div className="contact-row">
                <MapPin size={15} className="contact-icon" />
                <span>Adams Road, Craigmore SA 5114</span>
              </div>
            </div>

            <a
              href="#enrolment"
              className="fullscreen-nav-cta"
              onClick={closeMenu}
            >
              <span>{translate('Enquire Now')}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <header className="main-header" role="banner">
        {/* School Branding: Logo Crest + Catherine McAuley School Name */}
        <a href="#home" className="header-brand" aria-label="Catherine McAuley School Home">
          <img
            src="/favicon.png"
            alt="Catherine McAuley School Crest"
            className="header-brand-logo"
            width="46"
            height="51"
          />
          <div className="header-brand-text">
            <span className="header-brand-title">Catherine McAuley</span>
            <span className="header-brand-sub">SCHOOL</span>
          </div>
        </a>

        {/* Right side: Prominent Hamburger Button */}
        <button
          type="button"
          className="main-hamburger-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <div className="hamburger-bars" aria-hidden="true">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </div>
        </button>
      </header>

      {/* Render Full-Screen Navigation Overlay outside clipped container */}
      {typeof document !== 'undefined' && createPortal(navigationPortal, document.body)}
    </>
  )
}
