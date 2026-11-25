
import { useTranslation } from '../context/useTranslation'
import './TeachingLearning.css'

const learningCards = [
  {
    number: '01',
    title: 'Learning Philosophy',
    subtitle: 'A strong foundation for lifelong learning',
    description:
      'We use explicit instruction and evidence-informed teaching strategies to help every child build knowledge, develop skills and grow in confidence.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85',
    alt: 'Students learning together in a bright classroom',
  },
  {
    number: '02',
    title: 'Catholic Identity',
    subtitle: 'Learning guided by faith and compassion',
    description:
      'Our Mercy tradition inspires a welcoming community where Gospel values, kindness, respect and service are part of everyday school life.',
    image:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Children enjoying a positive school learning experience',
  },
  {
    number: '03',
    title: 'Student Wellbeing',
    subtitle: 'Every child known, valued and supported',
    description:
      'We nurture a safe and caring environment where children build friendships, develop resilience and feel a strong sense of belonging.',
    image:
      'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1000&q=85',
    alt: 'Children spending time together outdoors',
  },
  {
    number: '04',
    title: 'Beyond the Classroom',
    subtitle: 'Discovering the world through experience',
    description:
      'From creative projects to outdoor exploration, students are encouraged to ask questions, try new things and connect learning with the world around them.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85',
    alt: 'Young children exploring and learning through activities',
  },
]

function TeachingLearning() {
  const { translate } = useTranslation()

  return (
    <section className="teaching-learning" id="learning">
      <div className="teaching-learning-inner">

        {/* SECTION INTRODUCTION */}
        <div className="teaching-learning-heading">
          <span className="teaching-eyebrow">
            {translate('TEACHING & LEARNING')}
          </span>

          <h2>
            {translate('Every child,')}
            <br />
            <span>{translate('a world of possibilities.')}</span>
          </h2>

          <p>
            {translate(
              'At Catherine McAuley School, learning is about more than the classroom. We create opportunities for every student to discover their strengths, build confidence and grow through meaningful experiences.'
            )}
          </p>
        </div>

        {/* INFINITE IMAGE MARQUEE */}
        <div
          className="learning-marquee"
          aria-label="Our teaching and learning approach"
        >
          <div className="learning-marquee-track">

            {[0, 1].map((copy) => (
              <div
                className="learning-marquee-group"
                key={copy}
                aria-hidden={copy === 1 ? 'true' : undefined}
              >
                {learningCards.map((card) => (
                  <article
                    className="learning-card"
                    key={card.number}
                  >
                    <div className="learning-card-image">
                      <img
                        src={card.image}
                        alt={copy === 0 ? card.alt : ''}
                        loading="lazy"
                      />

                      <span className="learning-card-number">
                        {card.number}
                      </span>

                      <span className="learning-card-image-arrow">
                        ↗
                      </span>
                    </div>

                    <div className="learning-card-content">
                      <span className="learning-card-subtitle">
                        {translate(card.subtitle)}
                      </span>

                      <h3>{translate(card.title)}</h3>

                      <p>{translate(card.description)}</p>

                      <span className="learning-card-line" />
                    </div>
                  </article>
                ))}
              </div>
            ))}

          </div>
        </div>

        {/* BOTTOM NOTE */}
        <div className="learning-bottom-note">
          <span className="learning-bottom-line" />
          <p>
            {translate('A place to learn, belong and flourish.')}
          </p>
          <span className="learning-bottom-line" />
        </div>

      </div>
    </section>
  )
}

export default TeachingLearning
