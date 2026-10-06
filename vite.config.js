import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import process from 'node:process'
import { handleAdminAuth } from './server/adminAuth.js'

function localAdminApi() {
  const middleware = (req, res, next) => {
    const match = req.url?.match(/^\/api\/admin\/(login|session|logout)(?:\?|$)/)
    if (!match) return next()
    return handleAdminAuth(req, res, match[1])
  }

  return {
    name: 'local-admin-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'ADMIN_')
  for (const [key, value] of Object.entries(env)) {
    if (!process.env[key]) process.env[key] = value
  }
  return {
    plugins: [react(), localAdminApi()],
  }
})
