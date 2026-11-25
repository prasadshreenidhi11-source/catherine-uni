import http from 'node:http'
import https from 'node:https'
import { URL } from 'node:url'

// In-memory cache for translated strings to prevent redundant API calls and costs
const translationCache = new Map()

export function googleTranslatePlugin() {
  return {
    name: 'vite-plugin-google-translate',
    configureServer(server) {
      server.middlewares.use('/api/translate', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }))
          return
        }

        let body = ''
        req.on('data', chunk => {
          body += chunk
        })

        req.on('end', async () => {
          try {
            const { texts, targetLang, sourceLang = 'en' } = JSON.parse(body || '{}')

            if (!texts || !Array.isArray(texts) || !targetLang) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Invalid request: "texts" (array) and "targetLang" (string) are required.' }))
              return
            }

            if (targetLang === 'en') {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ translations: texts }))
              return
            }

            const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY

            // Check cache for existing translations
            const uncachedIndices = []
            const uncachedTexts = []
            const results = new Array(texts.length)

            texts.forEach((text, idx) => {
              const cacheKey = `${sourceLang}:${targetLang}:${text}`
              if (translationCache.has(cacheKey)) {
                results[idx] = translationCache.get(cacheKey)
              } else {
                uncachedIndices.push(idx)
                uncachedTexts.push(text)
              }
            })

            // If all texts are cached, return immediately
            if (uncachedTexts.length === 0) {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ translations: results, cached: true }))
              return
            }

            // If no Google Cloud API key is provided, report clear status
            if (!apiKey) {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({
                translations: results.map((val, i) => val || texts[i]),
                status: 'MISSING_API_KEY',
                message: 'GOOGLE_TRANSLATE_API_KEY environment variable is not configured. Falling back to dictionary/original text.'
              }))
              return
            }

            // Call official Google Cloud Translation API v2
            const postData = JSON.stringify({
              q: uncachedTexts,
              target: targetLang,
              source: sourceLang,
              format: 'text'
            })

            const options = {
              hostname: 'translation.googleapis.com',
              path: `/language/translate/v2?key=${apiKey}`,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
              }
            }

            const gReq = https.request(options, gRes => {
              let gData = ''
              gRes.on('data', d => { gData += d })
              gRes.on('end', () => {
                try {
                  const parsed = JSON.parse(gData)
                  if (parsed.data && parsed.data.translations) {
                    parsed.data.translations.forEach((item, i) => {
                      const origIndex = uncachedIndices[i]
                      const translatedText = item.translatedText
                      results[origIndex] = translatedText

                      const cacheKey = `${sourceLang}:${targetLang}:${uncachedTexts[i]}`
                      translationCache.set(cacheKey, translatedText)
                    })

                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ translations: results, source: 'google_cloud' }))
                  } else {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({
                      translations: results.map((val, i) => val || texts[i]),
                      status: 'API_ERROR',
                      error: parsed.error || 'Unknown Google API error'
                    }))
                  }
                } catch (err) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Failed to parse Google API response: ' + err.message }))
                }
              })
            })

            gReq.on('error', e => {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Network error communicating with Google Cloud Translation API: ' + e.message }))
            })

            gReq.write(postData)
            gReq.end()
          } catch (e) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Malformed JSON payload: ' + e.message }))
          }
        })
      })
    }
  }
}
