// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-repo-name' with your actual GitHub repository name
// e.g., if your URL is https://username.github.io/exam-prep/ → base: '/exam-prep/'
// If deploying to a custom domain or root: base: '/'
export default defineConfig({
  plugins: [react()],
  base: './',   // ← CHANGE THIS to your repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
