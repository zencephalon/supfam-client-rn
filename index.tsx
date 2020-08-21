import { registerRootComponent } from 'expo';

import App from './App';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(console.log);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
