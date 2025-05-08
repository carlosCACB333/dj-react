import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	server: {
		port: Number(process.env.PORT) || 3000,
		host: true,
	},
	preview: {
		port: Number(process.env.PORT) || 3000,
		host: true,
	},
	plugins: [react(), tsconfigPaths()],
});
