
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from '../context/useTranslation'
import './NewsStories.css'

const stories = [
  {
    number: '01',
    category: 'Coming 2027',
    title: 'A New Chapter for Catherine McAuley School',
    description:
      'We are excited to share plans for a multimillion-dollar two-storey building upgrade.',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85',
    link: '#'
  },
  {
    number: '02',
    category: 'Mini Macs · Birth to 5 years',
    title: 'Little Steps, Big Discoveries',
    description:
      'A safe and friendly place for children to play, explore, learn and make new friends.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=85',
    link: '#'
  },
  {
    number: '03',
    category: 'Beyond the Classroom',
    title: 'Growing Tomorrow’s Leaders',
    description:
      'Our Student Leadership group gives students opportunities to develop their skills and share their voices.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85',
    link: '#'
  },
  {
    number: '04',
    category: 'Our Community',
    title: 'Supporting Our Defence Families',
    description:
      'We support children and families through postings, deployments and times of absence.',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85',
    link: '#'
  }
]

function StoryCard({ story, translate, position }) {
  return (
    <a
      href={story.link}
      className={`news-story-card ${position}`}
    >
      <img
        src={story.image}
        alt={translate(story.title)}
        className="news-story-image"
      />

      <div className="news-story-overlay" />

      <div className="news-story-content">
        <span className="news-story-number">{story.number}</span>

        <div className="news-story-details">
          <span className="news-story-category">
            {translate(story.category)}
          </span>

          <h3>{translate(story.title)}</h3>

          <p>{translate(story.description)}</p>
        </div>

        <span className="news-story-arrow">
          <ArrowUpRight size={21} />
        </span>
      </div>
    </a>
  )
}

function NewsStories() {
  const { translate } = useTranslation()

  return (
    <section className="news-stories-section" id="news-stories">
      <div className="news-stories-heading">
        <span className="news-stories-eyebrow">
          {translate('NEWS & STORIES')}
        </span>

        <h2>{translate('Latest news & events')}</h2>

        <p>
          {translate(
            'Discover the moments, milestones and stories that bring our school community together.'
          )}
        </p>
      </div>

      <div className="news-stories-layout">
        <StoryCard
          story={stories[0]}
          translate={translate}
          position="story-top-left"
        />

        <StoryCard
          story={stories[1]}
          translate={translate}
          position="story-top-right"
        />

        <div className="news-school-image">
          <img
            src="/images/uni.png"
            alt="Catherine McAuley School"
          />
        </div>

        <StoryCard
          story={stories[2]}
          translate={translate}
          position="story-bottom-left"
        />

        <StoryCard
          story={stories[3]}
          translate={translate}
          position="story-bottom-right"
        />
      </div>

      <a href="#all-news" className="news-all-link">
        {translate('Explore all news')}
        <ArrowUpRight size={18} />
      </a>
    </section>
  )
}

export default NewsStories
