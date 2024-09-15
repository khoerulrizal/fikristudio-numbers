import React from 'react';
import AppNavigator from './shared/navigator/AppNavigator';
import SplashProvider from './shared/provider/SplashProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from './shared/utils';
import {NavigationContainer} from '@react-navigation/native';

function AppContainer() {
  return (
    <SplashProvider>
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </SplashProvider>
  );
}

export default AppContainer;
