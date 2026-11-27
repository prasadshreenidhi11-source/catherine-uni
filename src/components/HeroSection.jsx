import { useEffect, useRef, useState } from 'react'
import MiniHeader from './MiniHeader'
import Header from './Header'
import { useTranslation } from '../context/useTranslation'
import './HeroSection.css'

export default function HeroSection() {
  const videoRefA = useRef(null)
  const videoRefB = useRef(null)
  const sectionRef = useRef(null)
  const { translate } = useTranslation()

  // Track active layer ('A' or 'B') for crossfading
  const [activeLayer, setActiveLayer] = useState('A')

  useEffect(() => {
    const vidA = videoRefA.current
    const vidB = videoRefB.current
    const hero = sectionRef.current
    if (!vidA || !vidB || !hero) return

    // We trigger the crossfade slightly before the video finishes (~1.1s offset)
    const FADE_START_OFFSET = 1.1
    let current = vidA
    let switching = false

    const crossfade = (from, to, layer) => () => {
      if (from !== current || switching || !from.duration) return
      if (from.currentTime < from.duration - FADE_START_OFFSET) return

      switching = true
      to.currentTime = 0
      to.play()
        .then(() => {
          current = to
          setActiveLayer(layer)
        })
        .catch(() => {})
        .finally(() => { switching = false })
    }

    const handleTimeUpdateA = crossfade(vidA, vidB, 'B')
    const handleTimeUpdateB = crossfade(vidB, vidA, 'A')

    vidA.addEventListener('timeupdate', handleTimeUpdateA)
    vidB.addEventListener('timeupdate', handleTimeUpdateB)

    // Only decode video while the hero is on screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        current.play().catch(() => {})
      } else {
        vidA.pause()
        vidB.pause()
      }
    })
    observer.observe(hero)

    return () => {
      observer.disconnect()
      vidA.removeEventListener('timeupdate', handleTimeUpdateA)
      vidB.removeEventListener('timeupdate', handleTimeUpdateB)
    }
  }, [])

  return (
    <section ref={sectionRef} className="hero" id="home">
      {/* 1. Thin Navy Blue Utility Header at the very top */}
      <MiniHeader />

      {/* 2. Dual Synchronized Video Layers for Seamless Looping */}
      <div className="hero-video-wrapper" aria-hidden="true">
        <video
          ref={videoRefA}
          className={`hero-video ${activeLayer === 'A' ? 'video-visible' : 'video-hidden'}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/images/hero-poster.webp"
        >
          <source src="/videos/school.mp4" type="video/mp4" />
        </video>

        <video
          ref={videoRefB}
          className={`hero-video ${activeLayer === 'B' ? 'video-visible' : 'video-hidden'}`}
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/school.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 3. Strategic Subtle Overlays - Natural, Bright, Non-distorting */}
      <div className="hero-gradient-vignette" aria-hidden="true"></div>
      <div className="hero-bottom-shade" aria-hidden="true"></div>

      {/* 4. Minimalist Main Header with Prominent Hamburger Button */}
      <Header />

      {/* 5. Hero Content: Typography, spacing, readability */}
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow-accent" aria-hidden="true">
            <img src="/favicon.png" alt="" className="eyebrow-mini-crest" />
          </span>
          <span className="eyebrow-line" aria-hidden="true"></span>
          <span className="eyebrow-text">{translate('A PLACE TO GROW, LEARN & BELONG')}</span>
        </div>

        <h1 className="hero-title">
          {translate('Growing Together.')}
          <br />
          <span className="hero-title-italic">{translate('Shaping Tomorrow.')}</span>
        </h1>

        <p className="hero-description">
          {translate(
            'Every child has a unique story. We create the space, opportunities and inspiration to help every story flourish.'
          )}
        </p>

        <div className="hero-actions">
          <a href="#principal-welcome" className="primary-button">
            <span>{translate('Discover Our School')}</span>
            <span className="btn-arrow" aria-hidden="true">↗</span>
          </a>

          <a href="#teaching-learning" className="secondary-button">
            <span>{translate('Explore Learning')}</span>
            <span className="btn-arrow-right" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* 6. Bottom Information Bar */}
      <div className="hero-footer">
        <div className="hero-location">
          <span className="location-dot" aria-hidden="true"></span>
          <span>{translate('A COMMUNITY BUILT ON POSSIBILITY')}</span>
        </div>

        <a href="#principal-welcome" className="scroll-indicator" aria-label="Scroll down to explore">
          <span className="scroll-text">{translate('SCROLL TO EXPLORE')}</span>
          <span className="scroll-arrow" aria-hidden="true">↓</span>
        </a>

        <div className="hero-index">
          <span className="index-num">01</span>
          <span className="index-line" aria-hidden="true"></span>
          <span className="index-label">{translate('WELCOME')}</span>
        </div>
      </div>
    </section>
  )
}
