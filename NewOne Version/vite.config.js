import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler'] // ✅ Babel plugin must be an array of [pluginName, options]
        ],
      },
    }),
    tailwindcss() // ✅ Tailwind should be added as a Vite plugin, not inside babel
  ],
  base: "/",
})
