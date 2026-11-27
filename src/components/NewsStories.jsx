
import { ArrowRight, ArrowUpRight } from 'lucide-react'
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
      '/images/school-building.webp',
    link: null
  },
  {
    number: '02',
    category: 'Mini Macs · Birth to 5 years',
    title: 'Little Steps, Big Discoveries',
    description:
      'A safe and friendly place for children to play, explore, learn and make new friends.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=700&q=70',
    link: null
  },
  {
    number: '03',
    category: 'Beyond the Classroom',
    title: 'Growing Tomorrow’s Leaders',
    description:
      'Our Student Leadership group gives students opportunities to develop their skills and share their voices.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=70',
    link: null
  },
  {
    number: '04',
    category: 'Our Community',
    title: 'Supporting Our Defence Families',
    description:
      'We support children and families through postings, deployments and times of absence.',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=700&q=70',
    link: null
  }
]

// Set to the news archive address to show the "Explore all news" button
const ALL_NEWS_URL = null

function StoryCard({ story, translate, position }) {
  const Card = story.link ? 'a' : 'article'

  return (
    <Card
      href={story.link || undefined}
      className={`news-story-card ${position}`}
    >
      <div className="news-story-visual">
        <img
          src={story.image}
          alt={translate(story.title)}
          className="news-story-image"
          loading="lazy"
        />

        <span className="news-story-number">
          {story.number}
        </span>
      </div>

      <div className="news-story-details">
        <span className="news-story-category">
          {translate(story.category)}
        </span>

        <h3>{translate(story.title)}</h3>

        <p>{translate(story.description)}</p>

        {story.link && (
          <span className="news-story-read">
            {translate('Read Story')}
            <ArrowRight size={16} />
          </span>
        )}
      </div>
    </Card>
  )
}

function NewsStories() {
  const { translate } = useTranslation()

  return (
    <section id="news-stories" className="news-stories">

      <div className="news-stories-heading">
        <div className="news-heading-label">
          <span />
          {translate('CATHERINE MCAULEY')}
          <span />
        </div>

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

        <div className="news-stories-column news-stories-left">
          <StoryCard
            story={stories[0]}
            translate={translate}
            position="story-top-left"
          />

          <StoryCard
            story={stories[2]}
            translate={translate}
            position="story-bottom-left"
          />
        </div>

        <div className="news-school-image">
          <div className="news-school-frame">
            <img
              src="/images/logo.webp"
              alt="Catherine McAuley School"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="news-school-caption">
            <span>{translate('A PLACE TO BELONG')}</span>
            <h3>{translate('Growing Together')}</h3>
          </div>
        </div>

        <div className="news-stories-column news-stories-right">
          <StoryCard
            story={stories[1]}
            translate={translate}
            position="story-top-right"
          />

          <StoryCard
            story={stories[3]}
            translate={translate}
            position="story-bottom-right"
          />
        </div>

      </div>

      {ALL_NEWS_URL && (
        <a href={ALL_NEWS_URL} className="news-all-link">
          {translate('Explore all news')}
          <ArrowUpRight size={18} />
        </a>
      )}

    </section>
  )
}

export default NewsStories
