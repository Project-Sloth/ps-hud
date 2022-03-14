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
})