import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      'index.html',
      'src/**/*.{svelte,html,js}',
    ],
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ],
  },
  safelist: [],
  theme: {
    screens: {
      'sm': '1280px',
      'md': '1920px',
      'lg': '2560px',
      'xl': '3440px',
      '2xl': '3840px',
    }
  },
})