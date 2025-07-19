// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

// SSR/SSG dual mode entry
const isSSR = process.env.BUILD_MODE === 'ssr';
const isSSG = process.env.BUILD_MODE === 'ssg';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@content': path.resolve(__dirname, 'src/content'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {},
      less: {},
    }
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    outDir: isSSR ? 'dist-ssr' : 'dist',
    assetsDir: 'assets',
    ssr: isSSR,
    // SSG related config can be handled in SSG build script
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    },
    // Cache optimization
    cacheDir: 'node_modules/.vite_cache',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  plugins: [
    // 可在此注册 Vite 插件
    // SSR/SSG 插件示例：
    // isSSR && require('vite-plugin-ssr')(),
    // isSSG && require('vite-plugin-ssg')(),
    // 自动化部署插件示例：
    // require('vite-plugin-deploy')({ provider: 'vercel' }),
  ],
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    hmr: true,
    // 缓存优化
    fs: {
      strict: false,
    },
  },
  optimizeDeps: {
    include: ['react', 'vue', 'preact'],
    cacheDir: 'node_modules/.vite_cache',
  },
  // 自动化部署相关配置入口
  // deploy: {
  //   provider: 'vercel',
  //   options: {}
  // },
});
