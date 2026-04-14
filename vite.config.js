import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: Set `base` to match your GitHub repo name exactly.
// e.g. if the repo URL is https://github.com/username/GreenHub
// then base should be '/GreenHub/'
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  plugins: [react()],
  base: '/GreenHub/',
})
