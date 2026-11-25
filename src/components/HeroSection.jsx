import { useEffect, useRef, useState } from 'react'
import MiniHeader from './MiniHeader'
import Header from './Header'
import { useTranslation } from '../context/useTranslation'
import './HeroSection.css'

export default function HeroSection() {
  const videoRefA = useRef(null)
  const videoRefB = useRef(null)
  const { translate } = useTranslation()

  // Track active layer ('A' or 'B') for crossfading
  const [activeLayer, setActiveLayer] = useState('A')

  useEffect(() => {
    const vidA = videoRefA.current
    const vidB = videoRefB.current
    if (!vidA || !vidB) return

    // Safely attempt autoplay
    vidA.play().catch(() => {})

    // We trigger the crossfade slightly before the video finishes (~1.1s offset)
    const FADE_START_OFFSET = 1.1
    let crossfadeTriggered = false

    const handleTimeUpdateA = () => {
      if (vidA.duration && vidA.currentTime >= vidA.duration - FADE_START_OFFSET && !crossfadeTriggered) {
        crossfadeTriggered = true
        vidB.currentTime = 0
        vidB.play().then(() => {
          setActiveLayer('B')
        }).catch(() => {})
      }
    }

    const handleTimeUpdateB = () => {
      if (vidB.duration && vidB.currentTime >= vidB.duration - FADE_START_OFFSET && !crossfadeTriggered) {
        crossfadeTriggered = true
        vidA.currentTime = 0
        vidA.play().then(() => {
          setActiveLayer('A')
        }).catch(() => {})
      }
    }

    const handleEndedA = () => {
      crossfadeTriggered = false
      vidA.pause()
    }

    const handleEndedB = () => {
      crossfadeTriggered = false
      vidB.pause()
    }

    vidA.addEventListener('timeupdate', handleTimeUpdateA)
    vidB.addEventListener('timeupdate', handleTimeUpdateB)
    vidA.addEventListener('ended', handleEndedA)
    vidB.addEventListener('ended', handleEndedB)

    return () => {
      vidA.removeEventListener('timeupdate', handleTimeUpdateA)
      vidB.removeEventListener('timeupdate', handleTimeUpdateB)
      vidA.removeEventListener('ended', handleEndedA)
      vidB.removeEventListener('ended', handleEndedB)
    }
  }, [])

  return (
    <section className="hero" id="home">
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
        >
          <source src="/videos/school.mp4" type="video/mp4" />
        </video>

        <video
          ref={videoRefB}
          className={`hero-video ${activeLayer === 'B' ? 'video-visible' : 'video-hidden'}`}
          muted
          playsInline
          preload="auto"
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
          <a href="#about" className="primary-button">
            <span>{translate('Discover Our School')}</span>
            <span className="btn-arrow" aria-hidden="true">↗</span>
          </a>

          <a href="#learning" className="secondary-button">
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

        <a href="#about" className="scroll-indicator" aria-label="Scroll down to explore">
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
