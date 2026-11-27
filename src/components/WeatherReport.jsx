import { useState, useEffect, useCallback, createElement } from 'react'
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Droplets,
  Wind,
  Thermometer,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'

import { useTranslation } from '../context/useTranslation'
import './WeatherReport.css'

/**
 * Maps condition strings / WMO codes to appropriate Lucide React icons
 */
function getWeatherIcon(condition, isDay = true) {
  switch (condition) {
    case 'clear':
      return Sun
    case 'partly-cloudy':
      return CloudSun
    case 'cloudy':
      return Cloud
    case 'fog':
      return CloudFog
    case 'rain':
      return CloudRain
    case 'drizzle':
      return CloudDrizzle
    case 'thunderstorm':
      return CloudLightning
    case 'snow':
      return CloudSnow
    default:
      return isDay ? Sun : CloudSun
  }
}

function WeatherIcon({ condition, isDay, ...props }) {
  const icon = condition ? getWeatherIcon(condition, isDay) : CloudSun
  return createElement(icon, props)
}

function WeatherTicker({ items, translate }) {
  if (!items || items.length === 0) return null

  return (
    <div className="weather-marquee">
      <div className="weather-marquee-track">
        {[0, 1].map((copy) => (
          <div
            className="weather-marquee-group"
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {items.map(({ label, Icon }, index) => (
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

  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async (isManual = false) => {
    if (isManual) {
      setRefreshing(true)
    }

    try {
      const startTime = Date.now()
      const url = isManual ? '/api/weather?refresh=true' : '/api/weather'
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Weather service returned status ${response.status}`)
      }

      const data = await response.json()
      setWeatherData(data)
      setError(null)

      // Ensure refresh animation is visible for at least 600ms on manual click
      if (isManual) {
        const elapsed = Date.now() - startTime
        if (elapsed < 600) {
          await new Promise((r) => setTimeout(r, 600 - elapsed))
        }
      }
    } catch (err) {
      console.error('Failed to retrieve weather data:', err)
      // Only shown while there is no earlier reading to fall back on
      setError('Weather information is temporarily unavailable.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  // Initial load and 10-minute automatic refresh interval
  useEffect(() => {
    const load = () => fetchWeather(false)

    const firstLoadId = setTimeout(load, 0)
    const intervalId = setInterval(load, 10 * 60 * 1000)

    return () => {
      clearTimeout(firstLoadId)
      clearInterval(intervalId)
    }
  }, [fetchWeather])

  // Build marquee ticker items dynamically from actual current and daily weather data
  const tickerItems = []
  if (weatherData && weatherData.current) {
    const { current, today } = weatherData

    if (current.apparentTemperature !== undefined) {
      tickerItems.push({
        label: `Feels like ${current.apparentTemperature}°`,
        Icon: Thermometer,
      })
    }
    if (current.windSpeed !== undefined) {
      tickerItems.push({
        label: `Wind ${current.windSpeed} km/h ${current.windDirection || ''}`.trim(),
        Icon: Wind,
      })
    }
    if (current.relativeHumidity !== undefined) {
      tickerItems.push({
        label: `Humidity ${current.relativeHumidity}%`,
        Icon: Droplets,
      })
    }
    if (today && today.uvIndex !== null && today.uvIndex !== undefined) {
      tickerItems.push({
        label: `UV Index ${today.uvIndex}`,
        Icon: Sun,
      })
    }
    if (today && today.sunrise) {
      tickerItems.push({
        label: `Sunrise ${today.sunrise}`,
        Icon: Sun,
      })
    }
    if (today && today.sunset) {
      tickerItems.push({
        label: `Sunset ${today.sunset}`,
        Icon: Sun,
      })
    }
    if (current.precipitation !== undefined && current.precipitation > 0) {
      tickerItems.push({
        label: `Precipitation ${current.precipitation} mm`,
        Icon: CloudRain,
      })
    }
  }

  const formattedUpdateTime = weatherData?.lastUpdated
    ? new Date(weatherData.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <section id="weather-report" className="weather-report">
      <div className="weather-panel">

        {/* CURRENT WEATHER */}
        <div className="weather-current">

          <div className="weather-current-location">
            <span
              className={`weather-live-dot ${refreshing ? 'weather-live-dot-pulse' : ''}`}
              title={refreshing ? 'Refreshing...' : 'Live'}
            />
            <span>
              {translate('CRAIGMORE · RIGHT NOW')}
            </span>
            <button
              type="button"
              className="weather-refresh-button"
              onClick={() => fetchWeather(true)}
              disabled={refreshing}
              title="Refresh real-time weather"
              aria-label="Refresh weather"
            >
              <RefreshCw
                size={14}
                className={refreshing ? 'weather-spin-icon' : ''}
              />
            </button>
          </div>

          <div className="weather-current-condition">
            {loading && !weatherData ? (
              <div className="weather-loading-text">
                {translate('Connecting to live campus weather...')}
              </div>
            ) : error && !weatherData ? (
              <div className="weather-error-banner">
                <AlertCircle size={20} />
                <span>{translate(error)}</span>
              </div>
            ) : (
              <>
                <WeatherIcon
                  condition={weatherData?.current?.condition}
                  isDay={weatherData?.current?.isDay}
                  className="weather-current-icon"
                  strokeWidth={1.5}
                />

                <span className="weather-current-temperature">
                  {weatherData?.current?.temperature ?? '--'}°
                </span>

                <span className="weather-current-description">
                  {translate(weatherData?.current?.description || 'Loading...')}
                </span>
              </>
            )}
          </div>

          <div className="weather-source">
            <span>
              {translate('Live Craigmore Campus Weather')}
            </span>
            {formattedUpdateTime && (
              <span className="weather-update-meta">
                {' · '}{translate('Updated')} {formattedUpdateTime}
              </span>
            )}
          </div>

        </div>

        {/* SEVEN-DAY FORECAST */}
        <div className="weather-forecast">
          {weatherData?.dailyForecast && weatherData.dailyForecast.length > 0 ? (
            weatherData.dailyForecast.map((item) => {
              const DayIcon = getWeatherIcon(item.condition)
              return (
                <div
                  className={`weather-forecast-day ${
                    item.day === 'TODAY' ? 'weather-forecast-today' : ''
                  }`}
                  key={item.date || item.day}
                >
                  <span className="weather-forecast-name">
                    {translate(item.day)}
                  </span>

                  <DayIcon
                    className="weather-forecast-icon"
                    strokeWidth={1.6}
                  />

                  <div className="weather-forecast-temperatures">
                    <strong>{item.high}°</strong>
                    <span>{item.low}°</span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="weather-forecast-loading">
              {loading ? translate('Loading forecast...') : translate('Forecast temporarily unavailable')}
            </div>
          )}
        </div>

        {/* WEATHER INFORMATION MARQUEE */}
        <WeatherTicker items={tickerItems} translate={translate} />

      </div>
    </section>
  )
}

export default WeatherReport
