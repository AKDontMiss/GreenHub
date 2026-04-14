import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: Set `base` to match your GitHub repo name exactly.
// e.g. if the repo URL is https://github.com/username/emre-gateway
// then base should be '/emre-gateway/'
// ─────────────────────────────────────────────────────────────────────────────
export default defineConfig({
  plugins: [react()],
  base: '/GreenHub/',
})
