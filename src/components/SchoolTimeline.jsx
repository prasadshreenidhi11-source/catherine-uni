
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../context/useTranslation'
import './SchoolTimeline.css'

const timelineItems = [
  {
    id: '1957',
    number: '1957',
    label: 'OUR HISTORY',
    title: 'A legacy of service begins.',
    description:
      'The Sisters of Mercy begin serving the Elizabeth area.',
    detail:
      'This marks an important part of the story behind Catherine McAuley School. Inspired by the Mercy tradition, a commitment to education, service and community continues to shape our identity.',
    link: 'Discover our school',
    target: '#about',
  },
  {
    id: '1996',
    number: '1996',
    label: 'OUR HISTORY',
    title: 'A new school community.',
    description:
      'Catherine McAuley School opens its doors in Craigmore.',
    detail:
      'The opening of Catherine McAuley School in Craigmore marks an important milestone in our journey. It brings the school community together around a shared commitment to learning, faith and opportunity.',
    link: 'Discover our school',
    target: '#about',
  },
  {
    id: 'r6',
    number: 'R–6',
    label: 'ENROLMENT',
    title: 'Learning and growing together.',
    description:
      'High quality education from Reception to Year 6, supporting children throughout their primary school journey.',
    detail:
      'Our school welcomes students from Reception through Year 6. Reception intakes are available in Term 1 and Term 3, providing opportunities for families to begin their school journey with us.',
    link: 'Explore enrolment',
    target: '#enrolment',
  },
  {
    id: '05',
    number: '0–5',
    label: 'MINI MACS',
    title: 'Little beginnings. Big possibilities.',
    description:
      'Mini Macs offers playgroups and early years learning for children from birth to 5 years.',
    detail:
      'Our Mini Macs program provides opportunities for young children to experience playgroups and early years learning. It is open to all eligible children and their families.',
    link: 'Discover Mini Macs',
    target: '#community',
  },
]

function SchoolTimeline() {
  const { translate } = useTranslation()
  const sectionRef = useRef(null)

  const [activeItem, setActiveItem] = useState(timelineItems[0])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(section)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`school-timeline ${isVisible ? 'timeline-visible' : ''}`}
      id="school-history"
    >
      <div className="school-timeline-inner">

        {/* SECTION HEADING */}
        <div className="timeline-section-heading">
          <span className="timeline-main-eyebrow">
            {translate('OUR JOURNEY')}
          </span>

          <h2>
            {translate('A story of faith,')}
            <br />
            <span>{translate('growth and opportunity.')}</span>
          </h2>

          <p>
            {translate(
              'From our beginnings to the learning community we are today, discover the milestones that have shaped Catherine McAuley School.'
            )}
          </p>
        </div>

        {/* MAIN INTERACTIVE AREA */}
        <div className="school-timeline-content">

          {/* LEFT: FOUR POINTS AND CENTRAL LOGO */}
          <div className="timeline-visual">

            <div className="timeline-logo">
              <img
                src="/images/logo.png"
                alt="Catherine McAuley School"
              />
            </div>

            {timelineItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`timeline-point timeline-point-${index + 1} ${
                  activeItem.id === item.id ? 'active' : ''
                }`}
                onMouseEnter={() => setActiveItem(item)}
                onFocus={() => setActiveItem(item)}
                onClick={() => setActiveItem(item)}
                aria-pressed={activeItem.id === item.id}
              >
                <span className="timeline-point-number">
                  {item.number}
                </span>

                <span className="timeline-point-label">
                  {translate(item.label)}
                </span>

                <span className="timeline-point-arrow">↗</span>
              </button>
            ))}

          </div>

          {/* RIGHT: DETAILED INFORMATION */}
          <div className="timeline-description-panel">

            <span className="timeline-panel-eyebrow">
              {translate('DISCOVER OUR STORY')}
            </span>

            <div className="timeline-panel-content" key={activeItem.id}>

              <span className="timeline-panel-number">
                {activeItem.number}
              </span>

              <span className="timeline-panel-category">
                {translate(activeItem.label)}
              </span>

              <h3 className="timeline-panel-heading">
                {translate(activeItem.title)}
              </h3>

              <p className="timeline-panel-description">
                {translate(activeItem.description)}
              </p>

              <p className="timeline-panel-detail">
                {translate(activeItem.detail)}
              </p>

              <a
                href={activeItem.target}
                className="timeline-panel-link"
              >
                {translate(activeItem.link)}
                <span>↗</span>
              </a>

            </div>

            {/* NAVIGATION INDICATORS */}
            <div className="timeline-panel-indicator">
              {timelineItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`timeline-indicator ${
                    activeItem.id === item.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveItem(item)}
                  aria-label={`Show ${item.number} information`}
                  aria-pressed={activeItem.id === item.id}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default SchoolTimeline
