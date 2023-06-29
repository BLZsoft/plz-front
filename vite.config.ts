import { defineConfig } from 'vite';

import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import { TailwindCSSVitePlugin } from 'tailwindcss-vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), eslintPlugin(), TailwindCSSVitePlugin(), VitePWA()],
});
