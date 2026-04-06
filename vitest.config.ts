import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

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
  ],
  resolve: { alias: { ...alias } },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/mocks/setup-specs.ts'],
    include: ['src/**/__specs__/**/*.spec.ts', 'src/**/__specs__/**/*.spec.tsx'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})
