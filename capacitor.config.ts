import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.u9g.unoroyale',
  appName: 'Uno Royale',
  webDir: 'dist',
  plugins: {
    CapacitorUpdater: {
      // DEV_DEPLOY (set by scripts/deploy-ios.sh) keeps dev builds from swapping in OTA bundles
      autoUpdate: !process.env.DEV_DEPLOY,
      // Self-hosted (see uno-stats /update); empty stats/channel URLs keep the plugin from calling Capgo
      updateUrl: 'https://uno-stats.aibotted849.workers.dev/update',
      statsUrl: '',
      channelUrl: '',
    },
  },
};

export default config;
