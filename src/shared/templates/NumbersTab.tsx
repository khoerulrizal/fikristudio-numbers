/* eslint-disable react-native/no-inline-styles */
import React, {Dispatch, ForwardedRef, forwardRef, SetStateAction} from 'react';
import {
  ScrollView as RNScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {Chips, ScrollView} from '../components';
import {NumbersType} from '../types/numbers';

const NumbersTab = forwardRef(
  (
    {
      activeIndex,
      setActiveIndex,
      style,
      type,
      groupCategory,
    }: {
      type: NumbersType;
      activeIndex: number;
      setActiveIndex: Dispatch<SetStateAction<number>>;
      style?: ViewStyle;
      groupCategory: 'duo' | 'default';
    },
    ref: ForwardedRef<RNScrollView>,
  ) => {
    const {width} = useWindowDimensions();
    const onPress = (value: number) => {
      setActiveIndex(value);
    };

    if (type === 'triple') {
      return null;
    }

    return (
      <View style={StyleSheet.flatten([stylesheet.container])}>
        <ScrollView
          // @ts-ignore
          ref={ref}
          horizontal
          contentContainerStyle={[{columnGap: 8}, style]}>
          {Array.from({
            length: groupCategory === 'duo' ? 2 : type === 'random' ? 10 : 9,
          })?.map((_, index) => (
            // @ts-ignore
            <Chips
              isActive={activeIndex === index - 1}
              value={index - 1}
              type="secondary"
              label={
                groupCategory === 'duo'
                  ? (type === 'random' ? 'A' : 'D') + (index + 1)
                  : index - 1 === -1
                  ? 'All'
                  : (type === 'random' ? 'A' : 'D') + index
              }
              {...{onPress}}
              {...(groupCategory === 'duo' && {
                containerStyle: {width: (width - 48) / 2},
              })}
            />
          ))}
        </ScrollView>
      </View>
    );
  },
);

const stylesheet = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    width: '100%',
    paddingTop: 24,
    paddingBottom: 12,
  },
});

export default NumbersTab;
