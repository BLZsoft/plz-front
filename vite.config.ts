import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // TODO: @d.tankov включить плагин после https://github.com/effector/swc-plugin/issues/31
    // { plugins: [['@effector/swc-plugin', {}]] }
    react(),
    tsconfigPaths(),
    VitePWA(),
  ],
});
