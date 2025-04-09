import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://dataservice.accuweather.com',  // El servidor de destino (API de AccuWeather)
        changeOrigin: true,  // Cambia el origen de la solicitud a "http://dataservice.accuweather.com"
        rewrite: (path) => path.replace(/^\/api/, ''),  // Redirige las rutas que comienzan con "/api"
      },
    },
  },
})
