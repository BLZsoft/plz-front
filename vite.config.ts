import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
import viteSvgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "src/**/*.{ts,tsx}"',
      },
    }),
    react({
      babel: {
        plugins: [
          [
            'effector/babel-plugin',
            {
              addLoc: true,
            },
          ],
          [
            'effector/babel-plugin',
            {
              importName: '~/shared/lib/supabase',
              effectCreators: ['createSupabaseEffect'],
              noDefaults: true,
            },
            'createSupabaseEffect',
          ],
        ],
      },
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
