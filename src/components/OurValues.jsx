
import { useTranslation } from '../context/useTranslation'
import './OurValues.css'

const values = [
  {
    number: '01',
    title: 'Compassion',
    icon: '♡',
    description:
      'We care for others with kindness, empathy and understanding. We recognise the needs of those around us and strive to make every person feel valued, supported and included.',
  },
  {
    number: '02',
    title: 'Justice',
    icon: '⚖',
    description:
      'We believe in fairness, equality and standing up for what is right. We encourage our students to respect the dignity of every person and contribute to a more just world.',
  },
  {
    number: '03',
    title: 'Respect',
    icon: '✧',
    description:
      'We value the uniqueness of every individual. Through our words and actions, we build relationships founded on respect, responsibility and appreciation for one another.',
  },
  {
    number: '04',
    title: 'Hospitality',
    icon: '⌂',
    description:
      'We welcome everyone with open hearts. We create a warm and inclusive school community where every student, family and visitor feels a sense of belonging.',
  },
  {
    number: '05',
    title: 'Service',
    icon: '♡',
    description:
      'We encourage a generous spirit and a willingness to help others. Our students learn to make a positive difference through thoughtful actions and service to their community.',
  },
  {
    number: '06',
    title: 'Courage',
    icon: '✦',
    description:
      'We inspire students to be brave, embrace challenges and stand by their values. We help every child develop the confidence to try, grow and make a difference.',
  },
]

function OurValues() {
  const { translate } = useTranslation()

  return (
   <section id="our-values" className="our-values">
      <div className="our-values-inner">

        {/* SECTION HEADING */}
        <div className="our-values-heading">
          <span className="values-eyebrow">
            {translate('THE MERCY VALUES')}
          </span>

          <h2>
            {translate('The values that')}
            <br />
            <span>{translate('shape who we are.')}</span>
          </h2>

          <p>
            {translate(
              'Our values guide the way we learn, grow and care for one another. They shape our identity and inspire us to build a community where everyone belongs.'
            )}
          </p>
        </div>

        {/* VALUES GRID */}
        <div className="values-grid">
          {values.map((value) => (
            <article className="value-card" key={value.number}>

              <div className="value-card-top">
                <span className="value-number">
                  {value.number}
                </span>

                <span className="value-icon" aria-hidden="true">
                  {value.icon}
                </span>
              </div>

              <div className="value-card-content">
                <h3>{translate(value.title)}</h3>

                <span className="value-card-line" />

                <p>
                  {translate(value.description)}
                </p>
              </div>

              <span className="value-card-decoration" aria-hidden="true">
                ✦
              </span>

            </article>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div className="values-bottom-note">
          <span />
          <p>{translate('Faith · Growth · Unity')}</p>
          <span />
        </div>

      </div>
    </section>
  )
}

export default OurValues
