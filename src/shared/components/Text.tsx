/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Text as RNText, TextProps} from 'react-native';
import styles from '../styles';
import {colors} from '../utils';

type Props = {
  text?: string;
};

const Text = ({
  children,
  text,
  style,
  ...restProps
}: Partial<TextProps> & Props) => {
  return (
    <RNText
      style={[
        styles.fontRegular,
        styles.textSm,
        {
          color: colors?.text,
          includeFontPadding: false,
          textAlignVertical: 'center',
        },
        style,
      ]}
      {...restProps}>
      {text || children}
    </RNText>
  );
};

export default memo(Text);
