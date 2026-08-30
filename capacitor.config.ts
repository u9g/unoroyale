import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.u9g.unoroyale',
  appName: 'Uno Royale',
  webDir: 'dist',
  plugins: {
    CapacitorUpdater: {
      // Self-hosted (see uno-stats /update); empty stats/channel URLs keep the plugin from calling Capgo
      updateUrl: 'https://uno-stats.aibotted849.workers.dev/update',
      statsUrl: '',
      channelUrl: '',
    },
  },
};

export default config;
