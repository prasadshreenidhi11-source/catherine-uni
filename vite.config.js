import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { googleTranslatePlugin } from './server/translatePlugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), googleTranslatePlugin()],
  server: {
    proxy: {
      '/api/weather': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
