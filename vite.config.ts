/// <reference types="vitest" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',
    optimizeDeps: {
      include: ['@angular/common', '@angular/forms'],
    },
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog({
        nitro: {
          output: {
            dir: '../../../.vercel/output', // <- Vercel output
            publicDir: '../../../.vercel/output/static', // <- Vercel output
          },
        },
      }),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
