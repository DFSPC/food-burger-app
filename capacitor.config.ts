import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'food-burger-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
