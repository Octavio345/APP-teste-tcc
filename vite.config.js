import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AgroVoo',
        short_name: 'AgroVoo',
        theme_color: '#1B5E20',
        background_color: '#ffffff',
        display: 'standalone'
      }
    })
  ]
})