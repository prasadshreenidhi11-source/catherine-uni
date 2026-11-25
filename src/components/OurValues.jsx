
import { useTranslation } from '../context/useTranslation'
import './OurValues.css'

const values = [
  {
    
    title: 'Compassion',
    icon: '♡',
    description:
      'We care for others with kindness, empathy and understanding. We recognise the needs of those around us and strive to make every person feel valued, supported and included.',
  },
  {
    
    title: 'Justice',
    icon: '⚖',
    description:
      'We believe in fairness, equality and standing up for what is right. We encourage our students to respect the dignity of every person and contribute to a more just world.',
  },
  {
    
    title: 'Respect',
    icon: '✧',
    description:
      'We value the uniqueness of every individual. Through our words and actions, we build relationships founded on respect, responsibility and appreciation for one another.',
  },
  {
    
    title: 'Hospitality',
    icon: '⌂',
    description:
      'We welcome everyone with open hearts. We create a warm and inclusive school community where every student, family and visitor feels a sense of belonging.',
  },
  {
  
    title: 'Service',
    icon: '♡',
    description:
      'We encourage a generous spirit and a willingness to help others. Our students learn to make a positive difference through thoughtful actions and service to their community.',
  },
  {
    
    title: 'Courage',
    icon: '✦',
    description:
      'We inspire students to be brave, embrace challenges and stand by their values. We help every child develop the confidence to try, grow and make a difference.',
  },
]

function OurValues() {
  const { translate } = useTranslation()

  return (
    <section className="our-values" id="values">
      <div className="our-values-inner">

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

        <div className="values-arc">
          <div className="values-cards">
            {values.map((value) => (
              <article className="value-card" key={value.number}>
                <div className="value-card-inner">

                  <div className="value-card-face value-card-front">
                    <span className="value-number">{value.number}</span>

                    <span className="value-icon" aria-hidden="true">
                      {value.icon}
                    </span>

                    <h3>{translate(value.title)}</h3>

                    <span className="value-card-hint">
                      {translate('HOVER TO DISCOVER')}
                    </span>
                  </div>

                  <div className="value-card-face value-card-back">
                    <span className="value-number">{value.number}</span>

                    <h3>{translate(value.title)}</h3>

                    <p>{translate(value.description)}</p>

                    <span className="value-back-decoration">✦</span>
                  </div>

                </div>
              </article>
            ))}
          </div>

          <div className="values-center-logo">
            <img
              src="/images/logo.png"
              alt="Catherine McAuley School crest"
            />
          </div>
        </div>

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
