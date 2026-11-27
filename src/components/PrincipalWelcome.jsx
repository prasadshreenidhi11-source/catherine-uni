import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/useTranslation'
import './PrincipalWelcome.css'

function PrincipalWelcome() {
  const { translate } = useTranslation()
  const videoRef = useRef(null)

  // Download and play the video only once it is on screen
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  return (
   <section className="principal-welcome" id="principal-welcome">
      <div className="principal-welcome-inner">

        <div className="principal-video-column">
          <div className="principal-video-frame">
            <video
              ref={videoRef}
              className="principal-video"
              src="/videos/principal.mp4"
              poster="/images/principal-poster.webp"
              muted
              loop
              playsInline
              preload="none"
            />
          </div>
        </div>

        <div className="principal-content-column">

          <span className="principal-eyebrow">
            {translate('A MESSAGE FROM OUR PRINCIPAL')}
          </span>

          <h2 className="principal-heading">
            {translate('Welcome to')}
            <br />
            {translate('Catherine')}
            <br />
            {translate('McAuley School')}
          </h2>

          <p className="principal-description">
            {translate(
              'At Catherine McAuley, we pride ourselves on knowing every student by name and by heart. Our commitment is to deliver an exceptional education from Reception to Year 6, deeply rooted in the rich Catholic tradition and values of our patron, Catherine McAuley, founder of the Sisters of Mercy.'
            )}
          </p>

          <div className="principal-quote">
            <div className="principal-quote-icon">
              <span>❞</span>
            </div>

            <p className="principal-quote-text">
              {translate(
                'Catherine McAuley is more than just a school. It’s a thriving community grounded in faith and a determination to leave nobody behind.'
              )}
            </p>

            <div className="principal-quote-bottom">
              <div className="principal-signature">
                <strong>Marc Forster</strong>
                <span>{translate('Principal')}</span>
              </div>

              <a href="#teaching-learning" className="principal-cta">
                {translate('Read the Principal’s welcome')}
                <span>→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PrincipalWelcome
