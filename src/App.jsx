
import HeroSection from './components/HeroSection'
import PrincipalWelcome from './components/PrincipalWelcome'
import SchoolTimeline from './components/SchoolTimeline'
import TeachingLearning from './components/TeachingLearning'
import OurValues from './components/OurValues'
import WeatherReport from './components/WeatherReport'
import NewsStories from './components/NewsStories'
import Enrolment from './components/Enrolment'
import VisitUs from './components/VisitUs'
import Acknowledgement from './components/Acknowledgement'
import Footer from './components/Footer'
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
        <Enrolment />
        <VisitUs/>
        <Acknowledgement />
         <Footer />

        

        
     

     

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
