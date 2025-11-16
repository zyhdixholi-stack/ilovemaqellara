
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'screenshot-1.jpg', 'screenshot-2.jpg'],
          manifest: {
            name: 'Zbulo Maqellarën',
            short_name: 'Maqellara',
            description: 'Një aplikacion interaktiv për të promovuar bukuritë natyrore, kulturën, historinë dhe jetën e përditshme në njësinë administrative Maqellarë.',
            theme_color: '#047857',
            background_color: '#ffffff',
            display: 'standalone',
            scope: '/',
            start_url: '/',
            display_override: ['window-controls-overlay'],
            share_target: {
              action: '/',
              method: 'POST',
              enctype: 'multipart/form-data',
              params: {
                title: 'author',
                text: 'comment',
                files: [
                  {
                    name: 'media',
                    accept: ['image/*'],
                  },
                ],
              },
            },
            shortcuts: [
              {
                name: 'Personalitete',
                url: '/personalities',
                description: 'Shfleto personalitetet e shquara të Maqellarës'
              },
              {
                name: 'Tradita & Gatime',
                url: '/traditions',
                description: 'Zbulo traditat dhe gatimet unike të zonës'
              },
              {
                name: 'Diaspora',
                url: '/diaspora',
                description: 'Lidhu me komunitetin e maqellarasve në diasporë'
              }
            ],
            screenshots: [
              {
                "src": "/screenshot-1.jpg",
                "sizes": "1280x853",
                "type": "image/jpeg",
                "form_factor": "wide",
                "label": "Pamje e Maqellarës"
              },
              {
                "src": "/screenshot-2.jpg",
                "sizes": "1280x720",
                "type": "image/jpeg",
                "form_factor": "wide",
                "label": "Qendra e Maqellarës"
              }
            ],
            icons: [
              {
                src: '/favicon.ico',
                sizes: '64x64 32x32 24x24 16x16',
                type: 'image/x-icon',
              },
              {
                src: '/icon-192x192.png',
                type: 'image/png',
                sizes: '192x192',
              },
              {
                src: '/icon-512x512.png',
                type: 'image/png',
                sizes: '512x512',
              },
              {
                src: '/icon-512x512.png',
                type: 'image/png',
                sizes: '512x512',
                purpose: 'any maskable',
              },
            ]
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}']
          }
        })
      ],
      resolve: {
        alias: {
          // Fix: `__dirname` is not available in ES modules. Use `import.meta.url` to get the current directory path.
          '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.'),
        }
      }
    };
});