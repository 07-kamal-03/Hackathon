// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/CARDS': {
        target: 'https://appsail-50022244014.development.catalystappsail.in',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/CARDS/, '/CARDS') // Rewrites the path if necessary
      }
    }
  }
})
