import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/weather-app/' // <--- numele repo-ului tău GitHub exact
})
