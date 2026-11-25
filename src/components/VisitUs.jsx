import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  BookOpen,
  Users,
  Star,
  Map,
} from 'lucide-react'

import { useTranslation } from '../context/useTranslation'
import './VisitUs.css'

const MAP_DIRECTIONS =
  'https://www.google.com/maps/dir/12.972973,77.5283786/Catherine+McAuley+School,+210+Adams+Rd,+Craigmore+SA+5114,+Australia/@-7.1742678,59.134004,3z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x6ab0acc532a30233:0x13053e203ff873b0!2m2!1d138.7119181!2d-34.6889302?entry=ttu&g_ep=EgoyMDI2MTEyMi4wIKXMDSoASAFQAw%3D%3D'

function VisitUs() {
  const { translate } = useTranslation()

  const features = [
    {
      icon: BookOpen,
      title: 'Modern',
      subtitle: 'Learning Spaces',
    },
    {
      icon: Users,
      title: 'Caring',
      subtitle: 'Community',
    },
    {
      icon: Star,
      title: 'Academic',
      subtitle: 'Excellence',
    },
  ]

  return (
    <section className="visit-us-section" id="visit-us">

      {/* CLASSROOM IMAGE */}
      <div className="visit-visual">

        <img
          src="/images/baby.png"
          alt={translate('Students learning at Catherine McAuley School')}
          className="visit-hero-image"
        />

        <div className="visit-image-overlay" />

        <div className="visit-image-label">
          <span className="visit-live-dot" />
          {translate('A PLACE TO LEARN AND GROW')}
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="visit-content-panel">

        <div className="visit-content-left">

          <div className="visit-eyebrow">
            <span />
            {translate('VISIT US')}
          </div>

          <h2>
            {translate('Discover')}
            {' '}
            <span>{translate('Catherine')}</span>
            <br />
            {translate('McAuley School')}
          </h2>

          <p className="visit-description">
            {translate(
              'Step inside and experience our vibrant, community-focused school. Our tours offer a sneak peek into our dynamic learning spaces and the values that shape our teaching.'
            )}
          </p>

          <div className="visit-actions">

            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-tour-button"
            >
              {translate('Book a Tour')}
              <span>
                <ArrowRight size={19} />
              </span>
            </a>

            <div className="visit-features">

              {features.map((feature, index) => {
                const Icon = feature.icon

                return (
                  <div className="visit-feature" key={index}>
                    <Icon size={25} strokeWidth={1.6} />

                    <div>
                      <span>{translate(feature.title)}</span>
                      <span>{translate(feature.subtitle)}</span>
                    </div>
                  </div>
                )
              })}

            </div>

          </div>

        </div>

        {/* LOCATION CARD */}
        <div className="visit-location-card">

          <div className="visit-location-info">

            <div className="visit-location-icon">
              <MapPin size={23} />
            </div>

            <span className="visit-location-label">
              {translate('FIND OUR SCHOOL')}
            </span>

            <h3>{translate('Catherine McAuley School')}</h3>

            <p>
              210 Adams Rd,
              <br />
              Craigmore SA 5114,
              <br />
              Australia
            </p>

            <div className="visit-location-divider" />

            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-map-button"
            >
              <Map size={19} />
              {translate('Open in Maps')}
              <ArrowUpRight size={17} />
            </a>

          </div>

          <a
            href={MAP_DIRECTIONS}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-map-preview"
            aria-label={translate('Open school location in Google Maps')}
          >
            <iframe
              title="Catherine McAuley School location map"
              src="https://www.google.com/maps?q=Catherine%20McAuley%20School%2C%20210%20Adams%20Rd%2C%20Craigmore%20SA%205114%2C%20Australia&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <span className="visit-map-open">
              <ArrowUpRight size={18} />
            </span>
          </a>

        </div>

      </div>

    </section>
  )
}

export default VisitUs