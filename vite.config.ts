import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({
        svgrOptions: {
          icon: true,
          exportType: 'named',
          namedExport: 'ReactComponent',
        },
      }),
    ],
    build: {
      outDir: 'dist',
    },
    define: {
      // instead of exposing everything, only expose what you need
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
  };
});
