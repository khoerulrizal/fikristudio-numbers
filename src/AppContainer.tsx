import React from 'react';
import AppNavigator from './shared/routes/AppNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import {colors} from './shared/utils';
import {SplashProvider, ToastProvider} from './shared/provider';

function AppContainer() {
  return (
    <SafeAreaProvider>
      <SplashProvider>
        <ToastProvider>
          <NavigationContainer
            theme={{
              dark: false,
              colors: {
                ...colors,
                notification: colors.error,
              },
            }}>
            <AppNavigator />
          </NavigationContainer>
        </ToastProvider>
      </SplashProvider>
    </SafeAreaProvider>
  );
}

export default AppContainer;
