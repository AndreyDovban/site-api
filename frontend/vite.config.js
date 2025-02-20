import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	build: {
		target: 'es5',
		outDir: 'dist',
	},
	base: '',
	server: {
		port: 4000,
		host: '0.0.0.0',
		hmr: true,
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [svgr({ exportAsDefault: true }), react()],
});
