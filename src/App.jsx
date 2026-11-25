
import HeroSection from './components/HeroSection'
import PrincipalWelcome from './components/PrincipalWelcome'
import SchoolTimeline from './components/SchoolTimeline'
import TeachingLearning from './components/TeachingLearning'
import OurValues from './components/OurValues'
import WeatherReport from './components/WeatherReport'
import NewsStories from './components/NewsStories'
import { TranslationProvider } from './context/TranslationContext'
import { useTranslation } from './context/useTranslation'
import './App.css'

function MainContent() {
  const { translate } = useTranslation()

  return (
    <main>
      <HeroSection />

      <div className="site-body-wrapper">

        {/* Principal Welcome */}
        <PrincipalWelcome />

        <SchoolTimeline />
        <TeachingLearning />
        <OurValues />
        <WeatherReport />
        <NewsStories />

        

        
     

        {/* Footer */}
        <footer className="site-footer" id="contact">
          <div className="footer-brand">
            <img
              src="/favicon.png"
              alt="Catherine McAuley School"
              className="footer-logo"
              width="36"
              height="40"
            />
            <span>Catherine McAuley School</span>
          </div>

          <p>{translate('Building brighter futures, together.')}</p>

          <a href="mailto:info@cms.catholic.edu.au">
            {translate('Get in touch')} ↗
          </a>
        </footer>

      </div>
    </main>
  )
}

function App() {
  return (
    <TranslationProvider>
      <MainContent />
    </TranslationProvider>
  )
}

export default App
