/**
 * Open-Meteo Weather Service
 * Real-time weather, 24-hour hourly forecast & 7-day daily forecast
 * Integrated with in-memory caching to avoid unnecessary API requests
 */

// In-memory cache
let cachedWeatherData = null
let cacheTimestamp = 0
const CACHE_DURATION_MS = 10 * 60 * 1000 // 10 minutes cache

// WMO Weather interpretation codes (WW) mapping
export const WMO_CODE_MAP = {
  0: { description: 'Clear sky', condition: 'clear', isSunny: true },
  1: { description: 'Mainly clear', condition: 'partly-cloudy', isSunny: true },
  2: { description: 'Partly cloudy', condition: 'partly-cloudy', isSunny: false },
  3: { description: 'Overcast', condition: 'cloudy', isSunny: false },
  45: { description: 'Fog', condition: 'fog', isSunny: false },
  48: { description: 'Depositing rime fog', condition: 'fog', isSunny: false },
  51: { description: 'Light drizzle', condition: 'rain', isSunny: false },
  53: { description: 'Moderate drizzle', condition: 'rain', isSunny: false },
  55: { description: 'Dense drizzle', condition: 'rain', isSunny: false },
  56: { description: 'Light freezing drizzle', condition: 'rain', isSunny: false },
  57: { description: 'Dense freezing drizzle', condition: 'rain', isSunny: false },
  61: { description: 'Slight rain', condition: 'rain', isSunny: false },
  62: { description: 'Rain', condition: 'rain', isSunny: false },
  63: { description: 'Moderate rain', condition: 'rain', isSunny: false },
  65: { description: 'Heavy rain', condition: 'rain', isSunny: false },
  66: { description: 'Light freezing rain', condition: 'rain', isSunny: false },
  67: { description: 'Heavy freezing rain', condition: 'rain', isSunny: false },
  71: { description: 'Slight snow fall', condition: 'snow', isSunny: false },
  73: { description: 'Moderate snow fall', condition: 'snow', isSunny: false },
  75: { description: 'Heavy snow fall', condition: 'snow', isSunny: false },
  77: { description: 'Snow grains', condition: 'snow', isSunny: false },
  80: { description: 'Slight rain showers', condition: 'rain', isSunny: false },
  81: { description: 'Moderate rain showers', condition: 'rain', isSunny: false },
  82: { description: 'Violent rain showers', condition: 'rain', isSunny: false },
  85: { description: 'Slight snow showers', condition: 'snow', isSunny: false },
  86: { description: 'Heavy snow showers', condition: 'snow', isSunny: false },
  95: { description: 'Thunderstorm', condition: 'thunderstorm', isSunny: false },
  96: { description: 'Thunderstorm with slight hail', condition: 'thunderstorm', isSunny: false },
  97: { description: 'Thunderstorm with heavy hail', condition: 'thunderstorm', isSunny: false },
}

/**
 * Convert degree wind direction to cardinal direction
 */
function getWindCardinalDirection(degrees) {
  if (degrees === undefined || degrees === null) return 'N'
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round((degrees % 360) / 22.5) % 16
  return directions[index]
}

/**
 * Format ISO local time string (e.g. "2026-11-27T05:56") into 12-hour format "5:56am"
 */
function formatLocalNaiveTime(isoString) {
  if (!isoString) return ''
  const timePart = isoString.includes('T') ? isoString.split('T')[1] : isoString
  const [hoursStr, minutesStr] = timePart.split(':')
  let hours = parseInt(hoursStr, 10)
  const minutes = minutesStr ? minutesStr.slice(0, 2) : '00'
  if (isNaN(hours)) return ''
  const period = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${hours}.${minutes}${period}`
}

/**
 * Fetch forecast from Open-Meteo
 */
export async function getWeatherData({ latitude, longitude, timezone, forceRefresh = false }) {
  const now = Date.now()

  // Validate coordinates
  const lat = parseFloat(latitude)
  const lon = parseFloat(longitude)

  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    throw new Error(`Invalid geographic coordinates: latitude=${latitude}, longitude=${longitude}`)
  }

  // Check cache
  if (!forceRefresh && cachedWeatherData && (now - cacheTimestamp < CACHE_DURATION_MS)) {
    return {
      ...cachedWeatherData,
      cached: true,
      cacheAgeSeconds: Math.round((now - cacheTimestamp) / 1000)
    }
  }

  const queryParams = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    timezone: timezone || 'Australia/Adelaide',
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m'
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'precipitation_probability'
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'precipitation_sum',
      'sunrise',
      'sunset',
      'uv_index_max'
    ].join(','),
    forecast_days: '7'
  })

  const apiUrl = `https://api.open-meteo.com/v1/forecast?${queryParams.toString()}`

  const response = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'CatherineMcAuleySchool-WeatherService/1.0'
    },
    // 10 second timeout
    signal: AbortSignal.timeout(10000)
  })

  if (!response.ok) {
    throw new Error(`Open-Meteo API returned HTTP ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()

  if (!data || !data.current) {
    throw new Error('Received incomplete weather payload from Open-Meteo')
  }

  const currentCode = data.current.weather_code ?? 0
  const weatherMeta = WMO_CODE_MAP[currentCode] || { description: 'Fair', condition: 'partly-cloudy', isSunny: true }

  // Parse 7-day daily forecast
  const daily = data.daily || {}
  const dailyTimes = daily.time || []
  const weeklyForecast = dailyTimes.map((dateStr, idx) => {
    const code = daily.weather_code?.[idx] ?? 0
    const meta = WMO_CODE_MAP[code] || { description: 'Fair', condition: 'partly-cloudy' }
    const dateObj = new Date(`${dateStr}T12:00:00`)
    const dayName = dateObj.toLocaleDateString('en-AU', { weekday: 'short', timeZone: timezone }).toUpperCase()

    return {
      date: dateStr,
      day: idx === 0 ? 'TODAY' : dayName,
      code,
      condition: meta.condition,
      description: meta.description,
      high: Math.round(daily.temperature_2m_max?.[idx] ?? 0),
      low: Math.round(daily.temperature_2m_min?.[idx] ?? 0),
      precipitationProbability: daily.precipitation_probability_max?.[idx] ?? 0,
      precipitationSum: daily.precipitation_sum?.[idx] ?? 0
    }
  })

  // Parse next 24 hours from hourly data starting at current hour
  const hourly = data.hourly || {}
  const hourlyTimes = hourly.time || []
  const currentIsoPrefix = data.current.time ? data.current.time.slice(0, 13) : ''
  let startIndex = hourlyTimes.findIndex(t => t.startsWith(currentIsoPrefix))
  if (startIndex === -1) startIndex = 0

  const next24Hours = hourlyTimes.slice(startIndex, startIndex + 24).map((timeStr, offset) => {
    const actualIdx = startIndex + offset
    const code = hourly.weather_code?.[actualIdx] ?? 0
    const meta = WMO_CODE_MAP[code] || { description: 'Fair', condition: 'partly-cloudy' }
    return {
      time: timeStr,
      formattedTime: formatLocalNaiveTime(timeStr),
      temperature: Math.round(hourly.temperature_2m?.[actualIdx] ?? 0),
      code,
      condition: meta.condition,
      precipitationProbability: hourly.precipitation_probability?.[actualIdx] ?? 0
    }
  })

  // Format today's sunrise & sunset
  const todaySunrise = formatLocalNaiveTime(daily.sunrise?.[0])
  const todaySunset = formatLocalNaiveTime(daily.sunset?.[0])
  const todayUv = daily.uv_index_max?.[0] ? Math.round(daily.uv_index_max[0]) : null

  const result = {
    location: {
      name: process.env.SCHOOL_NAME || 'Catherine McAuley School',
      campus: process.env.CAMPUS_LOCATION || 'Craigmore, South Australia',
      latitude: lat,
      longitude: lon,
      timezone: data.timezone || timezone
    },
    current: {
      time: data.current.time,
      formattedTime: formatLocalNaiveTime(data.current.time),
      temperature: Math.round(data.current.temperature_2m),
      apparentTemperature: Math.round(data.current.apparent_temperature),
      relativeHumidity: Math.round(data.current.relative_humidity_2m),
      windSpeed: Math.round(data.current.wind_speed_10m),
      windDirectionDegrees: data.current.wind_direction_10m,
      windDirection: getWindCardinalDirection(data.current.wind_direction_10m),
      precipitation: data.current.precipitation ?? 0,
      weatherCode: currentCode,
      condition: weatherMeta.condition,
      description: weatherMeta.description,
      isDay: Boolean(data.current.is_day)
    },
    today: {
      sunrise: todaySunrise,
      sunset: todaySunset,
      uvIndex: todayUv,
      maxTemp: Math.round(daily.temperature_2m_max?.[0] ?? 0),
      minTemp: Math.round(daily.temperature_2m_min?.[0] ?? 0),
      precipitationProbability: daily.precipitation_probability_max?.[0] ?? 0
    },
    dailyForecast: weeklyForecast,
    hourlyForecast: next24Hours,
    lastUpdated: new Date().toISOString()
  }

  // Update in-memory cache
  cachedWeatherData = result
  cacheTimestamp = now

  return {
    ...result,
    cached: false
  }
}
