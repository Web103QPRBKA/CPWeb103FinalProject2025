import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 1. Import the plugin

// https://vitejs/dev/config/
export default defineConfig({
  plugins: [react()], // 2. Add it here
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})