import * as React from 'react';
import { StyleSheet, AppState } from 'react-native';
import { ReactQueryConfigProvider, setFocusHandler } from 'react-query';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import linkingConfig from '~/navigation/linkingConfig';
import RootNavigator from '~/navigation/RootNavigator';

import AuthToken from '~/lib/AuthToken';
import EmojiHistory from '~/lib/EmojiHistory';
import AuthGate from '~/c/AuthGate';
import ProfileGate from '~/c/ProfileGate';
import NotificationGate from '~/c/NotificationGate';
import ThemeAwareStatusBar from '~/c/ThemeAwareStatusBar';

import configureStore from '~/store/configureStore';

import CableContainer from '~/containers/Cable';

import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { nord10 } from '~/constants/Colors';

setFocusHandler((handleFocus: () => void) => {
  const handle = (nextAppState: string) => {
    if (nextAppState === 'active') {
      handleFocus();
    }
  };
  AppState.addEventListener('change', handle);
  return () => {
    AppState.removeEventListener('change', handle);
  };
});

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
if (Constants.manifest.revisionId) {
  Sentry.setRelease(Constants.manifest.revisionId);
}

export default function App({
  skipLoadingScreen,
}: {
  skipLoadingScreen: boolean;
}) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

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
        EmojiHistory.init();
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

  if (!isLoadingComplete && !skipLoadingScreen) {
    return null;
  } else {
    return (
      <ReactQueryConfigProvider config={queryConfig}>
        <ActionSheetProvider>
          <AppearanceProvider>
            <ThemeAwareStatusBar />
            <Provider store={configureStore({ auth: AuthToken.get() })}>
              <AuthGate>
                <ProfileGate>
                  <NotificationGate>
                    <NavigationContainer linking={linkingConfig}>
                      <CableContainer />
                      <RootNavigator />
                      <FlashMessage
                        position="top"
                        style={{
                          backgroundColor: nord10,
                        }}
                      />
                    </NavigationContainer>
                  </NotificationGate>
                </ProfileGate>
              </AuthGate>
            </Provider>
          </AppearanceProvider>
        </ActionSheetProvider>
      </ReactQueryConfigProvider>
    );
  }
}
