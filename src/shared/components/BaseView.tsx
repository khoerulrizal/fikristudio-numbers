/* eslint-disable react-native/no-inline-styles */
import React, {memo, type PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {colors} from '../utils';
import Header, {HeaderType} from './Header';

function BaseView({
  children,
  title,
  type,
}: PropsWithChildren & {title: string; type: HeaderType}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      <StatusBar backgroundColor="transparent" translucent />
      <Header {...{title, type}} />
      <View style={stylesheet.decorationContainer}>
        <Image
          source={require('../assets/images/right-decoration.png')}
          resizeMode="contain"
          style={{width: 280, height: 250}}
        />
      </View>
      <View style={stylesheet.container}>{children}</View>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 120,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  decorationContainer: {
    position: 'absolute',
    top: -16,
    right: -80,
    zIndex: -10,
  },
});

export default memo(BaseView);
