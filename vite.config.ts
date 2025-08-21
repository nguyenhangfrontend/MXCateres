import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/',
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({ svgrOptions: { icon: true, exportType: 'named', namedExport: 'ReactComponent' } }),
    ],
    build: {
      outDir: 'dist',
      // sourcemap: false,
    },
    define: {
      'process.env': env, // Define process.env to point to loaded env variables
    },
  };
});
