import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Text from './Text';
import styles from '../styles';
import {colors} from '../utils';

const Button = ({
  text,
  disabled,
  style,
  children,
  ...restProps
}: TouchableOpacityProps & {text?: string}) => {
  return (
    <TouchableOpacity
      {...restProps}
      style={StyleSheet.flatten([
        stylesheet.container,
        {backgroundColor: disabled ? '#C7C9CC' : colors.primary},
        style,
      ])}>
      {text ? <Text style={stylesheet.textStyle}>{text}</Text> : children}
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderRadius: 8,
    width: 'auto',
    ...styles.row,
    ...styles.flexCenter,
    columnGap: 4,
  },
  textStyle: {fontSize: 16, fontFamily: 'Inter-SemiBold', color: colors.white},
});

export default Button;
