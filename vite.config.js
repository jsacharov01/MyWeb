import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/s/preview-8b3c9e/',
  plugins: [react()],
  server: {
    open: true,
  },
});
