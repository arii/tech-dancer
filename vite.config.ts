import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import mdx from '@mdx-js/rollup';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      {
        ...mdx({
          include: /\.mdx$/
        }),
        enforce: 'pre'
      },
      react(),
      tailwindcss(),
      ViteImageOptimizer()
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/components/index.ts'),
        name: 'TechDancerUI',
        fileName: (format) => `tech-dancer-ui.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'motion', 'lucide-react', 'react-router-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'motion': 'motion',
            'lucide-react': 'LucideReact',
            'react-router-dom': 'ReactRouterDOM'
          }
        }
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR ? false : {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  };
});
