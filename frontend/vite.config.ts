import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.VITE_API_TARGET || 'http://10.93.25.2:42002'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/items': {
          target,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              // Forward Authorization header
              if (req.headers.authorization) {
                proxyReq.setHeader('Authorization', req.headers.authorization)
              }
            })
          },
        },
        '/learners': {
          target,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              if (req.headers.authorization) {
                proxyReq.setHeader('Authorization', req.headers.authorization)
              }
            })
          },
        },
        '/interactions': {
          target,
          changeOrigin: true,
          secure: false,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              if (req.headers.authorization) {
                proxyReq.setHeader('Authorization', req.headers.authorization)
              }
            })
          },
        },
        '/docs': {
          target,
          changeOrigin: true,
          secure: false,
        },
        '/openapi.json': {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
