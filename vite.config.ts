import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'
import checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
		checker({
			typescript: true,
			overlay: {
				initialIsOpen: false,
				position: 'tl'
			},
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
			}
		}),
		babel(),
		VitePWA({
			manifest: {
				name: 'AlemAgro',
				short_name: 'alemagro',
				start_url: '/home',
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
