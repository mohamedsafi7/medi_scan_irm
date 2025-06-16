import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    global: 'globalThis',
  },
  build: {
    rollupOptions: {
      external: ['chromadb'],
      output: {
        globals: {
          'chromadb': 'ChromaDB'
        }
      }
    }
  }
});
