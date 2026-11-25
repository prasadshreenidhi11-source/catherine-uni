
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  Cloud,
  ThermometerSun,
} from 'lucide-react'

import { useTranslation } from '../context/useTranslation'
import './WeatherReport.css'

const hourlyForecast = [
  { time: '9 AM', temperature: '19°', Icon: CloudSun },
  { time: '12 PM', temperature: '24°', Icon: Sun },
  { time: '3 PM', temperature: '23°', Icon: CloudSun },
  { time: '6 PM', temperature: '18°', Icon: Cloud },
]

const weatherDetails = [
  { label: 'Humidity', value: '62%', Icon: Droplets },
  { label: 'Wind', value: '14 km/h', Icon: Wind },
  { label: 'UV Index', value: '6', Icon: Sun },
]

const tickerItems = [
  'CRAIGMORE WEATHER',
  '24°C PARTLY CLOUDY',
  'HUMIDITY 62%',
  'WIND 14 KM/H',
  'UV INDEX 6',
  'A BEAUTIFUL DAY TO LEARN',
]

function WeatherTicker() {
  return (
    <div className="weather-ticker" aria-label="Sample weather information">
      <div className="weather-ticker-track">
        {[0, 1].map((copy) => (
          <div
            className="weather-ticker-group"
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {tickerItems.map((item, index) => (
              <span className="weather-ticker-item" key={`${copy}-${index}`}>
                {item}
                <span className="weather-ticker-star">✦</span>
              </span>
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
    <section className="weather-report" id="weather">
      <div className="weather-report-inner">

        {/* SECTION HEADING */}
        <div className="weather-heading">
          <span className="weather-eyebrow">
            {translate('A LITTLE LOOK OUTSIDE')}
          </span>

          <h2>
            {translate('The weather')}
            <br />
            <span>{translate('around our school.')}</span>
          </h2>

          <p>
            {translate(
              'A snapshot of the weather in our local community, helping our school family plan for the day ahead.'
            )}
          </p>
        </div>

        {/* WEATHER DISPLAY */}
        <div className="weather-dashboard">

          {/* MAIN WEATHER */}
          <div className="weather-main-card">
            <div className="weather-location">
              <span className="weather-location-dot" />
              <span>{translate('CRAIGMORE, SOUTH AUSTRALIA')}</span>
            </div>

            <div className="weather-main-content">
              <div className="weather-temperature">
                <span className="weather-degree">24°</span>
                <span className="weather-condition">
                  {translate('Partly cloudy')}
                </span>
              </div>

              <div className="weather-main-icon">
                <CloudSun strokeWidth={1.1} />
              </div>
            </div>

            <div className="weather-sample-note">
              <span>✦</span>
              {translate('SAMPLE WEATHER REPORT · NOT LIVE DATA')}
            </div>
          </div>

          {/* WEATHER DETAILS */}
          <div className="weather-details-card">
            <span className="weather-card-heading">
              {translate('TODAY AT A GLANCE')}
            </span>

            <div className="weather-details-list">
              {weatherDetails.map(({ label, value, Icon }) => (
                <div className="weather-detail-row" key={label}>
                  <div className="weather-detail-label">
                    <Icon size={20} strokeWidth={1.6} />
                    <span>{translate(label)}</span>
                  </div>

                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="weather-day-note">
              <ThermometerSun size={19} strokeWidth={1.6} />
              <span>{translate('A pleasant day for learning and play.')}</span>
            </div>
          </div>
        </div>

        {/* HOURLY FORECAST */}
        <div className="weather-hourly">
          <div className="weather-hourly-heading">
            <span>{translate('A LOOK THROUGH THE DAY')}</span>
            <span>{translate('SAMPLE FORECAST')}</span>
          </div>

          <div className="weather-hourly-list">
            {hourlyForecast.map(({ time, temperature, Icon }) => (
              <div className="weather-hour" key={time}>
                <span className="weather-hour-time">{time}</span>
                <Icon size={27} strokeWidth={1.4} />
                <strong>{temperature}</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* INFINITE WEATHER MARQUEE */}
      <WeatherTicker />

    </section>
  )
}

export default WeatherReport
