/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren, useState} from 'react';
import {Animated, Dimensions, StatusBar, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';

type Props = {
  onAnimationEnd: () => void;
};

const AnimatedBootSplash = ({onAnimationEnd}: Props) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [translateY] = useState(() => new Animated.Value(0));

  const {container, logo} = BootSplash.useHideAnimation({
    manifest: require('../../../assets/manifest.json'),

    logo: require('../../../assets/logo.png'),

    statusBarTranslucent: true,
    navigationBarTranslucent: true,

    animate: () => {
      const {height} = Dimensions.get('window');

      Animated.stagger(250, [
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: -50,
        }),
        Animated.spring(translateY, {
          useNativeDriver: true,
          toValue: height,
        }),
      ]).start();

      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 150,
        delay: 350,
      }).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <Animated.View {...container} style={[container.style, {opacity}]}>
        <Animated.View style={stylesheet.rightDecoration}>
          <Animated.Image
            source={require('../assets/images/right-decoration.png')}
            resizeMode="contain"
            style={{width: 280, height: 250}}
          />
        </Animated.View>
        <Animated.View style={stylesheet.leftDecoration}>
          <Animated.Image
            source={require('../assets/images/left-decoration.png')}
            resizeMode="contain"
            style={{width: 280, height: 250}}
          />
        </Animated.View>
        <Animated.Image
          {...logo}
          style={[logo.style, {transform: [{translateY}]}]}
        />
      </Animated.View>
    </>
  );
};

const SplashProvider = ({children}: PropsWithChildren) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {children}
      {visible && (
        <AnimatedBootSplash
          onAnimationEnd={() => {
            setVisible(false);
          }}
        />
      )}
    </>
  );
};

const stylesheet = StyleSheet.create({
  rightDecoration: {
    position: 'absolute',
    top: -16,
    right: -80,
    zIndex: -10,
  },
  leftDecoration: {
    position: 'absolute',
    bottom: 32,
    left: -80,
    zIndex: -10,
  },
});

export default SplashProvider;
