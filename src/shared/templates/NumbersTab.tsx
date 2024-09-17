/* eslint-disable react-native/no-inline-styles */
import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Chips, ScrollView} from '../components';
import {NumbersType} from '../types/numbers';

const NumbersTab = ({
  activeIndex,
  setActiveIndex,
  style,
  type,
}: {
  type: NumbersType;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  style?: ViewStyle;
}) => {
  const onPress = (value: number) => {
    setActiveIndex(value);
  };

  if (type === 'triple') {
    return null;
  }

  return (
    <View style={StyleSheet.flatten([stylesheet.container])}>
      <ScrollView horizontal contentContainerStyle={[{columnGap: 8}, style]}>
        {Array.from({length: type === 'random' ? 10 : 9})?.map((_, index) => (
          // @ts-ignore
          <Chips
            isActive={activeIndex === index - 1}
            value={index - 1}
            type="secondary"
            label={
              index - 1 === -1 ? 'All' : (type === 'random' ? 'A' : 'D') + index
            }
            {...{onPress}}
          />
        ))}
      </ScrollView>
    </View>
  );
};

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
