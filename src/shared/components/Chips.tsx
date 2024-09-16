import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from './Text';
import {NumbersType} from '../types/numbers';
import {colors, getColorOpacity} from '../utils';

type ChipsProps = {
  isActive: boolean;
  label: string;
  value: NumbersType;
  onPress: (v: NumbersType) => void;
};
const Chips = ({isActive, label, value, onPress}: ChipsProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={StyleSheet.flatten([
        stylesheet.container,
        {
          backgroundColor: isActive
            ? colors.gray
            : getColorOpacity(colors.gray, 0.25),
        },
      ])}>
      <Text
        style={StyleSheet.flatten([
          stylesheet.labelText,
          {color: isActive ? colors.white : colors.black},
        ])}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
});

export default Chips;
