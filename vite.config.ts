import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from "vite-plugin-pwa"
import checker from "vite-plugin-checker"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tsConfigPaths(),
      checker({
          typescript: true,
          overlay: {
              initialIsOpen: false,
              position: 'br'
          },
          eslint: {
              lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
          }
      }),
      VitePWA({
          manifest: {
              name: 'vite-react-ts-100',
              short_name: 'vite-react-ts-100',
              start_url: '/',
              display: 'standalone',
              background_color: '#ffffff',
              lang: 'en',
              scope: '/',
              icons: [
                  {
                      src: '/android-chrome-192x192.png',
                      sizes: '192x192',
                      type: 'image/png',
                      purpose: 'any maskable'
                  },
                  {
                      src: '/android-chrome-512x512.png',
                      sizes: '512x512',
                      type: 'image/png',
                      purpose: 'any maskable'
                  }
              ],
              theme_color: '#ffffff'
          }
      })
  ]
})
