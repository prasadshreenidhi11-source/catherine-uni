// Vercel Serverless Function: /api/translate
// Compatible with Vercel deployment architecture without exposing Google Cloud credentials to client

import https from 'node:https'

const translationCache = new Map()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  try {
    const { texts, targetLang, sourceLang = 'en' } = req.body || {}

    if (!texts || !Array.isArray(texts) || !targetLang) {
      return res.status(400).json({ error: 'Invalid request: "texts" (array) and "targetLang" (string) are required.' })
    }

    if (targetLang === 'en') {
      return res.status(200).json({ translations: texts })
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY

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

    if (uncachedTexts.length === 0) {
      return res.status(200).json({ translations: results, cached: true })
    }

    if (!apiKey) {
      return res.status(200).json({
        translations: results.map((val, i) => val || texts[i]),
        status: 'MISSING_API_KEY',
        message: 'GOOGLE_TRANSLATE_API_KEY environment variable is not configured.'
      })
    }

    const postData = JSON.stringify({
      q: uncachedTexts,
      target: targetLang,
      source: sourceLang,
      format: 'text'
    })

    const googleResponse = await new Promise((resolve, reject) => {
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
            resolve(JSON.parse(gData))
          } catch (e) {
            reject(e)
          }
        })
      })

      gReq.on('error', reject)
      gReq.write(postData)
      gReq.end()
    })

    if (googleResponse.data && googleResponse.data.translations) {
      googleResponse.data.translations.forEach((item, i) => {
        const origIndex = uncachedIndices[i]
        const translatedText = item.translatedText
        results[origIndex] = translatedText
        translationCache.set(`${sourceLang}:${targetLang}:${uncachedTexts[i]}`, translatedText)
      })

      return res.status(200).json({ translations: results, source: 'google_cloud' })
    }

    return res.status(200).json({
      translations: results.map((val, i) => val || texts[i]),
      status: 'API_ERROR',
      error: googleResponse.error || 'Unknown Google API error'
    })
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message })
  }
}
