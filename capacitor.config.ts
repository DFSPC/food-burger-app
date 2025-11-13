import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.dfs.foodburger',
  appName: 'Delicious Food',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
