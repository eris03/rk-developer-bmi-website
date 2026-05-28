// vite.config.js — RK Developers
// Only needed if you use Vite as a build tool.
// For plain Hostinger hosting, use .htaccess instead.

import { defineConfig } from 'vite'

export default defineConfig({
  // ── Base public path (use '/' for root domain hosting) ──
  base: '/',

  // ── Dev server redirect rules ────────────────────────────
  server: {
    port: 3000,
    open: true,
  },

  // ── Preview server redirects (mirrors .htaccess) ────────
  preview: {
    port: 4173,
  },

  plugins: [
    // Redirect plugin for dev & preview servers
    {
      name: 'redirect-about-to-home',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const redirects = {
            '/about.html': '/',
            '/about':      '/',
            '/about/':     '/',
            '/index.html': '/',
          }
          if (redirects[req.url]) {
            res.writeHead(301, { Location: redirects[req.url] })
            res.end()
            return
          }
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const redirects = {
            '/about.html': '/',
            '/about':      '/',
            '/about/':     '/',
            '/index.html': '/',
          }
          if (redirects[req.url]) {
            res.writeHead(301, { Location: redirects[req.url] })
            res.end()
            return
          }
          next()
        })
      },
    },
  ],

  // ── Build options ────────────────────────────────────────
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Generate _redirects file for Netlify/Vercel if needed
    rollupOptions: {
      input: {
        main:        'index.html',
        about:       'about.html',
        contact:     'contact.html',
        projects:    'projects.html',
        rkAvenue:    'rk-avenue.html',
        metroGreens: 'metro-greens.html',
        rkRevenue:   'rk-revenue.html',
      },
    },
  },
})
