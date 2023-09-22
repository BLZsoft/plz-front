import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import viteSvgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      plugins: [['@effector/swc-plugin', { addLoc: true }]],
    }),
    viteSvgr(),
    VitePWA(),
  ],
  test: {
    environment: 'jsdom',
    include: ['**/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
  },
});
