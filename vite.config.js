import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    chunkSizeWarningLimit: 1200, // raise limit, we also split vendors below
    rollupOptions: {
      output: {
        manualChunks: {
          // split heavy libs to improve caching and initial load
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          markdown: ['react-markdown', 'remark-gfm', 'remark-breaks'],
          motion: ['framer-motion'],
        }
      }
    }
  }
});
