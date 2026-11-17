import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Cognify API does not send CORS headers, so the browser talks to
// a same-origin `/api` path which is proxied to the real API.
const proxy = {
  '/api': {
    target: 'https://cognify-api-2.onrender.com',
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
}

export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0', port: 5173, allowedHosts: true, proxy },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true, proxy },
})
