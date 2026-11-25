import { ArrowRight, Phone } from 'lucide-react'

import { useTranslation } from '../context/useTranslation'
import './Footer.css'

function Footer() {
  const { translate } = useTranslation()

  const navigation = [
    {
      title: 'Our School',
      links: [
        { label: "Principal's Welcome", href: '#principal' },
        { label: 'Kaurna Acknowledgement', href: '#acknowledgement' },
        { label: 'Our History', href: '#history' },
        { label: 'Our Mission & Identity', href: '#mission' },
        { label: 'Meet Our Staff', href: '#staff' },
      ],
      secondTitle: 'Community',
      secondLinks: [
        { label: 'Parish', href: '#community' },
        { label: 'Mini Macs (Birth to 5 years)', href: '#community' },
        { label: 'School Ready Program', href: '#community' },
        { label: 'Out of School Hours Care', href: '#community' },
      ],
    },
    {
      title: 'Teaching & Learning',
      links: [
        { label: 'Catholic Identity', href: '#learning' },
        { label: 'Learning Philosophy', href: '#learning' },
        { label: 'Learning Areas', href: '#learning' },
        { label: 'Beyond the Classroom', href: '#learning' },
        { label: 'Wellbeing', href: '#learning' },
      ],
      secondTitle: 'News & Events',
      secondLinks: [
        { label: 'eNewsletters', href: '#news' },
        { label: 'News', href: '#news' },
        { label: 'Term Dates', href: '#events' },
        { label: 'Upcoming Events', href: '#events' },
        { label: 'The Southern Cross', href: '#news' },
      ],
    },
    {
      title: 'Enrolment',
      links: [
        { label: 'Come Visit Our Community', href: '#visit-us' },
        { label: 'School Prospectus', href: '#enrolment' },
        { label: 'Enrol Now', href: '#enrolment' },
        { label: 'Enrolment for Reception Students', href: '#enrolment' },
        { label: 'Transition to School', href: '#enrolment' },
      ],
      secondTitle: 'Contact Us',
      secondLinks: [
        { label: 'Employment Opportunities', href: '#contact' },
        { label: 'Volunteer Opportunities', href: '#contact' },
        { label: 'Grievance, Compliment or Suggestion', href: '#contact' },
        { label: 'Service Providers', href: '#contact' },
      ],
    },
  ]

  return (
    <footer className="school-footer">

      <div className="footer-main">

        {/* LEFT BRAND COLUMN */}
        <div className="footer-brand">

          <span className="footer-eyebrow">
            {translate('VISIT US')}
          </span>

          <h2>
            {translate('Discover')}
            {' '}
            <span>{translate('Catherine')}</span>
            <br />
            <span>{translate('McAuley School.')}</span>
          </h2>

          <div className="footer-buttons">

            <a href="#visit-us" className="footer-tour-button">
              {translate('Book a school tour')}
              <ArrowRight size={18} />
            </a>

            <a href="tel:0882594700" className="footer-phone-button">
              <Phone size={18} />
              <span>(08) 8259 4700</span>
            </a>

          </div>

          
<div className="footer-socials">

  {/* FACEBOOK */}
  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.093 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.955.931-1.955 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.1 24 12.073Z" />
    </svg>
  </a>

  {/* INSTAGRAM */}
  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  </a>

</div>


        </div>

        {/* NAVIGATION COLUMNS */}
        <div className="footer-navigation">

          {navigation.map((column, index) => (
            <div className="footer-nav-column" key={index}>

              <div className="footer-nav-group">

                <h3>{translate(column.title)}</h3>

                <ul>
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href}>
                        {translate(link.label)}
                      </a>
                    </li>
                  ))}
                </ul>

              </div>

              <div className="footer-nav-group footer-second-group">

                <h3>{translate(column.secondTitle)}</h3>

                <ul>
                  {column.secondLinks.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.href}>
                        {translate(link.label)}
                      </a>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">

        <div className="footer-acknowledgement">
          {translate(
            'Catherine McAuley School, Craigmore acknowledges the Kaurna People as the traditional custodians of the land on which we work. We pay our respects to Elders past, present and future.'
          )}
        </div>

        <div className="footer-copyright">
          <span>
            © {new Date().getFullYear()} Catherine McAuley School
          </span>

          <span className="footer-copyright-divider">|</span>

          <span>
            {translate('Developed by')}{' '}
            <a
              href="https://shopamarketing.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shopa Marketing
            </a>
          </span>
        </div>

      </div>

      {/* LARGE BACKGROUND BRAND TEXT */}
      <div className="footer-watermark" aria-hidden="true">
        Catherine McAuley
      </div>

    </footer>
  )
}

export default Footer