import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        domicilios: resolve(__dirname, 'src/domicilios.html'),
        servicios: resolve(__dirname, 'src/servicios.html'),
        software: resolve(__dirname, 'src/software.html'),
        'sobre-nosotros': resolve(__dirname, 'src/sobre-nosotros.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
