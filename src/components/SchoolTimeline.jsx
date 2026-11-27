
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
    target: '#principal-welcome',
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
    target: '#principal-welcome',
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
    target: '#news-stories',
  },
]

function SchoolTimeline() {
  const { translate } = useTranslation()
  const sectionRef = useRef(null)
  const touchStart = useRef(null)

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

  const step = (offset) => {
    const index = timelineItems.findIndex((item) => item.id === activeItem.id)
    const next = (index + offset + timelineItems.length) % timelineItems.length
    setActiveItem(timelineItems[next])
    return next
  }

  const handleTabKeys = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = step(event.key === 'ArrowRight' ? 1 : -1)
    event.currentTarget.children[next].focus()
  }

  const handleSwipe = (event) => {
    if (!touchStart.current) return
    const dx = event.changedTouches[0].clientX - touchStart.current.x
    const dy = event.changedTouches[0].clientY - touchStart.current.y
    touchStart.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
  }

  return (
   <section
  ref={sectionRef}
  className={`school-timeline ${isVisible ? 'timeline-visible' : ''}`}
  id="school-timeline"
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

        {/* STORY CARD */}
        <div className="ourstory-card">

          <div className="ourstory-top">
            <span className="ourstory-eyebrow">
              {translate('DISCOVER OUR STORY')}
            </span>

            <div className="ourstory-tabs" role="tablist" onKeyDown={handleTabKeys}>
              {timelineItems.map((item) => {
                const selected = activeItem.id === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`ourstory-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls="ourstory-panel"
                    tabIndex={selected ? 0 : -1}
                    className={`ourstory-tab ${selected ? 'active' : ''}`}
                    onClick={() => setActiveItem(item)}
                  >
                    <span className="ourstory-tab-number">{item.number}</span>
                    <span className="ourstory-tab-label">{translate(item.label)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            className="ourstory-panel"
            id="ourstory-panel"
            role="tabpanel"
            aria-labelledby={`ourstory-tab-${activeItem.id}`}
            onTouchStart={(event) => {
              touchStart.current = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              }
            }}
            onTouchEnd={handleSwipe}
          >
            <div className="ourstory-mark">
              <span className="ourstory-year" key={activeItem.id}>
                {activeItem.number}
              </span>

              <span className="ourstory-crest">
                <img src="/images/logo.webp" alt="Catherine McAuley School" loading="lazy" decoding="async" />
              </span>
            </div>

            <div className="ourstory-copy" key={activeItem.id}>
              <span className="ourstory-category">
                {translate(activeItem.label)}
              </span>

              <h3>{translate(activeItem.title)}</h3>

              <p className="ourstory-lead">{translate(activeItem.description)}</p>

              <p className="ourstory-detail">{translate(activeItem.detail)}</p>

              <a href={activeItem.target} className="ourstory-link">
                {translate(activeItem.link)}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SchoolTimeline
