import { getWeatherData } from '../services/weatherService.js'

/**
 * Controller for GET /api/weather
 */
export async function getWeather(req, res) {
  try {
    // Campus location comes from config only: the cache is shared by all visitors
    const lat = process.env.SCHOOL_LATITUDE || '-34.6889'
    const lon = process.env.SCHOOL_LONGITUDE || '138.7119'
    const timezone = process.env.SCHOOL_TIMEZONE || 'Australia/Adelaide'
    const forceRefresh = req.query.refresh === 'true'

    const weatherData = await getWeatherData({
      latitude: lat,
      longitude: lon,
      timezone,
      forceRefresh
    })

    return res.status(200).json(weatherData)
  } catch (error) {
    console.error('Weather Controller Error:', error.message)

    const statusCode = error.message.includes('Invalid geographic coordinates') ? 400 : 502

    return res.status(statusCode).json({
      error: 'Weather information is temporarily unavailable.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    })
  }
}
