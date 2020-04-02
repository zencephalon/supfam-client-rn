import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider } from 'react-redux';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import AuthToken from '~/lib/AuthToken';
import AuthGate from '~/c/AuthGate';
import ThemeAwareStatusBar from '~/c/ThemeAwareStatusBar';

import configureStore from '~/store/configureStore';

import CableContainer from '~/containers/Cable';

import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

Sentry.init({
  dsn: 'https://5798596b010948678b643700db20d942@sentry.io/5178537',
  enableInExpoDevelopment: true,
  debug: true,
});
Sentry.setRelease(Constants.manifest.revisionId);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
        });
        await AuthToken.init();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <AppearanceProvider>
        <ThemeAwareStatusBar />
        <Provider store={configureStore({ auth: AuthToken.get() })}>
          <AuthGate>
            <CableContainer />
            <NavigationContainer
              ref={containerRef}
              initialState={initialNavigationState}
            >
              <BottomTabNavigator />
            </NavigationContainer>
          </AuthGate>
        </Provider>
      </AppearanceProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
