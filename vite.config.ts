import { ConfigEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import { createVitePlugins } from './config/plugins';
import { cesiumBaseUrl } from './config/plugins/import-cesium-static';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const buildEnv: 'prod' | 'test' = isBuild && mode === 'production' ? 'prod' : 'test';

  return {
    envDir: './env',
    define: {
      // Define relative base path in cesium for loading assets
      // https://vitejs.dev/config/shared-options.html#define
      CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
    },
    // plugins
    resolve: {
      alias: {
        '@routes': resolve(__dirname, 'src', 'routes'),
        '@pages': resolve(__dirname, 'src', 'pages'),
        '@components': resolve(__dirname, 'src', 'components'),
        '@stores': resolve(__dirname, 'src', 'stores'),
        '@services': resolve(__dirname, 'src', 'services'),
        '@common': resolve(__dirname, 'src', 'common'),
        '@layouts': resolve(__dirname, 'src', 'layouts'),
      },
    },
    plugins: createVitePlugins(isBuild, buildEnv),
  };
};
