import { ArrowRight } from 'lucide-react'
import { useTranslation } from '../context/useTranslation'
import { emailSchool } from '../siteLinks'
import './Enrolment.css'

const enrolmentSteps = [
  {
    number: '1',
    title: 'Visit us',
    linkText: 'Book a tour',
    href: '#visit-us',
    description:
      'Come and experience our welcoming school community. Meet our teachers, explore our learning spaces and discover what makes Catherine McAuley special.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=70',
  },
  {
    number: '2',
    title: 'Read the prospectus',
    linkText: 'View the prospectus',
    href: emailSchool('Prospectus request'),
    description:
      'Explore our school prospectus to learn more about our educational approach, learning opportunities, school values and the experiences we offer.',
    image:
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&q=70',
  },
  {
    number: '3',
    title: 'Apply',
    linkText: 'Start an application',
    href: emailSchool('Enrolment application'),
    description:
      'Take the next step towards joining our school community. Find out about the enrolment process and begin your application.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=70',
  },
  {
    number: '4',
    title: 'Start school',
    linkText: 'How transition works',
    href: emailSchool('Transition to school'),
    description:
      'Starting school is an exciting milestone. Discover how we help children and families feel comfortable, confident and ready for their new journey.',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=70',
  },
]

function Enrolment() {
  const { translate } = useTranslation()

  return (
    <section className="enrolment-section" id="enrolment">

      {/* HEADING */}
      <div className="enrolment-heading">

        <div className="enrolment-label">
          <span />
          <p>{translate('ENROLMENT')}</p>
          <span />
        </div>

        <h2>
          {translate('Starting school is an')}
          <br />
          <span>{translate('exciting new chapter')}</span>
        </h2>

        <p className="enrolment-subtitle">
          {translate(
            'Catholic schools offer Reception intakes in Term 1 and Term 3.'
          )}
        </p>

      </div>

      {/* FOUR ENROLMENT CARDS */}
      <div className="enrolment-cards">

        {enrolmentSteps.map((step) => (
          <a
            href={step.href}
            className="enrolment-card"
            key={step.number}
          >

            <img
              src={step.image}
              alt={translate(step.title)}
              className="enrolment-card-image"
              loading="lazy"
              decoding="async"
            />

            <div className="enrolment-card-overlay" />

            <span className="enrolment-number">
              {step.number}
            </span>

            <div className="enrolment-card-content">

              <div className="enrolment-card-description">
                <p>{translate(step.description)}</p>
              </div>

              <h3>{translate(step.title)}</h3>

              <div className="enrolment-card-link">
                <span>{translate(step.linkText)}</span>
                <ArrowRight size={17} />
              </div>

            </div>

          </a>
        ))}

      </div>

    </section>
  )
}

export default Enrolment