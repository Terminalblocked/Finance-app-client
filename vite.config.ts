import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'dist',
	},
	resolve: {
		alias: {
			components: '/src/components',
			pages: '/src/pages',
			router: '/src/router',
			assets: '/src/assets',
			helpers: '/src/helpers',
			services: '/src/services',
			types: '/src/types',
			api: '/src/api',
			store: '/src/store',
			hooks: '/src/hooks',
		},
	},
})
