
import {
  Cloud,
  CloudRain,
  CloudSun,
  Sun,
  Droplets,
  Wind,
} from 'lucide-react'

import { useTranslation } from '../context/useTranslation'
import './WeatherReport.css'

const weeklyForecast = [
  { day: 'SAT', high: '22°', low: '15°', Icon: CloudRain },
  { day: 'SUN', high: '19°', low: '13°', Icon: CloudRain },
  { day: 'MON', high: '22°', low: '12°', Icon: Cloud },
  { day: 'TUE', high: '29°', low: '11°', Icon: Cloud },
  { day: 'WED', high: '34°', low: '18°', Icon: CloudSun },
  { day: 'TODAY', high: '24°', low: '18°', Icon: CloudSun },
  { day: 'FRI', high: '26°', low: '18°', Icon: CloudRain },
]

const weatherTickerItems = [
  { label: 'Sunset 8.08pm', Icon: Sun },
  { label: 'Feels like 24°', Icon: ThermometerIcon },
  { label: 'Wind 14 km/h', Icon: Wind },
  { label: 'Humidity 62%', Icon: Droplets },
  { label: 'UV Index 6', Icon: Sun },
  { label: 'Sunrise 5.56am', Icon: Sun },
]

function ThermometerIcon() {
  return <span className="weather-ticker-thermometer">°</span>
}

function WeatherTicker({ translate }) {
  return (
    <div className="weather-marquee">
      <div className="weather-marquee-track">
        {[0, 1].map((copy) => (
          <div
            className="weather-marquee-group"
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {weatherTickerItems.map(({ label, Icon }, index) => (
              <div
                className="weather-marquee-item"
                key={`${copy}-${index}`}
              >
                <span className="weather-marquee-diamond">◆</span>
                <Icon size={17} strokeWidth={1.7} />
                <span>{translate(label)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function WeatherReport() {
  const { translate } = useTranslation()

  return (
    <section id="weather-report" className="weather-report">
      <div className="weather-panel">

        {/* CURRENT WEATHER */}

        <div className="weather-current">

          <div className="weather-current-location">
            <span className="weather-live-dot" />
            <span>{translate('CRAIGMORE · RIGHT NOW')}</span>
          </div>

          <div className="weather-current-condition">
            <CloudSun
              className="weather-current-icon"
              strokeWidth={1.5}
            />

            <span className="weather-current-temperature">
              24°
            </span>

            <span className="weather-current-description">
              {translate('Partly cloudy')}
            </span>
          </div>

          <span className="weather-source">
            {translate('Sample weather for Craigmore, South Australia')}
          </span>

        </div>

        {/* SEVEN-DAY FORECAST */}

        <div className="weather-forecast">

          {weeklyForecast.map(({ day, high, low, Icon }) => (
            <div
              className={`weather-forecast-day ${
                day === 'TODAY' ? 'weather-forecast-today' : ''
              }`}
              key={day}
            >
              <span className="weather-forecast-name">
                {translate(day)}
              </span>

              <Icon
                className="weather-forecast-icon"
                strokeWidth={1.6}
              />

              <div className="weather-forecast-temperatures">
                <strong>{high}</strong>
                <span>{low}</span>
              </div>
            </div>
          ))}

        </div>

        {/* WEATHER INFORMATION MARQUEE */}

        <WeatherTicker translate={translate} />

      </div>
    </section>
  )
}

export default WeatherReport
