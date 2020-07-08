import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ReactQueryConfigProvider } from 'react-query';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { Provider } from 'react-redux';

import useLinking from '~/navigation/useLinking';
import RootNavigator from '~/navigation/RootNavigator';

import AuthToken from '~/lib/AuthToken';
import AuthGate from '~/c/AuthGate';
import ProfileGate from '~/c/ProfileGate';
import NotificationGate from '~/c/NotificationGate';
import ThemeAwareStatusBar from '~/c/ThemeAwareStatusBar';

import configureStore from '~/store/configureStore';

import CableContainer from '~/containers/Cable';

import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

const queryConfig = {
  queries: {
    cacheTime: 1 * 60 * 1000, // 1 minute max, due to https://github.com/facebook/react-native/issues/12981
  },
};

Sentry.init({
  dsn: 'https://5798596b010948678b643700db20d942@sentry.io/5178537',
  enableInExpoDevelopment: true,
  debug: true,
});
Sentry.setRelease(Constants.manifest.revisionId);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();
  const config = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

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
      <ReactQueryConfigProvider config={queryConfig}>
        <AppearanceProvider>
          <ThemeAwareStatusBar />
          <Provider store={configureStore({ auth: AuthToken.get() })}>
            <AuthGate>
              <ProfileGate>
                <NotificationGate>
                  <NavigationContainer ref={containerRef} linking={config}>
                    <CableContainer containerRef={containerRef} />
                    <RootNavigator />
                  </NavigationContainer>
                </NotificationGate>
              </ProfileGate>
            </AuthGate>
          </Provider>
        </AppearanceProvider>
      </ReactQueryConfigProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
