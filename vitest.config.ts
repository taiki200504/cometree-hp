
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    // To prevent issues with Supabase's dependencies
    server: {
      deps: {
        inline: ['@supabase/ssr'],
      },
    },
  },
});
