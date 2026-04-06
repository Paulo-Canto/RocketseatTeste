import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const alias = {
  '@': path.resolve(dirname, './src'),
  '@core': path.resolve(dirname, './src/core'),
  '@ui': path.resolve(dirname, './src/ui'),
  '@pattern': path.resolve(dirname, './src/pattern'),
  '@features': path.resolve(dirname, './src/features'),
  '@layouts': path.resolve(dirname, './src/layouts'),
  '@routes': path.resolve(dirname, './src/routes'),
  '@mocks': path.resolve(dirname, './src/mocks'),
} as const

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/routes',
      routeFileIgnorePattern: '__specs__',
    }),
    react(),
    process.env.ANALYZE === '1' &&
      visualizer({ open: true, filename: 'stats.html', gzipSize: true, brotliSize: true }),
  ].filter(Boolean),
  resolve: { alias: { ...alias } },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@tanstack/')) {
            return 'vendor-tanstack'
          }
        },
      },
    },
  },
})

export { alias }
