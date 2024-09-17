import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from './Text';
import {NumbersType} from '../types/numbers';
import {colors, getColorOpacity} from '../utils';

type ChipsProps = {
  isActive: boolean;
  label: string;
  value: NumbersType | number;
  onPress: (v: NumbersType | number) => void;
  type?: 'primary' | 'secondary';
};
const Chips = ({isActive, label, value, onPress, type}: ChipsProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={StyleSheet.flatten([
        stylesheet.container,
        type === 'secondary' && {paddingHorizontal: 10, paddingVertical: 10},
        {
          backgroundColor: isActive
            ? type === 'secondary'
              ? colors.primary
              : colors.gray
            : type === 'secondary'
            ? 'transparent'
            : getColorOpacity(colors.gray, 0.25),
        },
      ])}>
      <Text
        style={StyleSheet.flatten([
          stylesheet.labelText,
          {
            color: isActive
              ? colors.white
              : type === 'secondary'
              ? colors.primary
              : colors.black,
          },
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
