/* eslint-disable react-native/no-inline-styles */
import React, {Dispatch, SetStateAction} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {StyleSheet, View, ViewProps} from 'react-native';
import styles from '../styles';
import Text from './Text';
import {colors, getColorOpacity} from '../utils';

type InputNumberType = {
  codeLength?: number;
  containerStyle?: ViewProps['style'];
};

type CodeValueType = {
  index: number;
  symbol: string | number;
  isFocused: boolean;
};

const InputNumber: React.FC<
  InputNumberType & {value: string; setValue: Dispatch<SetStateAction<string>>}
> = ({value, setValue, codeLength = 4, containerStyle}) => {
  const ref = useBlurOnFulfill({value, cellCount: codeLength});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({symbol, isFocused, index}: CodeValueType) => {
    let children = null;

    if (symbol) {
      children = symbol;
    } else if (isFocused) {
      children = <Cursor />;
    }

    return (
      <View
        style={[
          stylesheet.cellContainer,
          {
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: isFocused ? colors.primary : colors.border,
          },
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {isFocused && (
          <View
            style={{
              position: 'absolute',
              top: -5,
              bottom: -5,
              right: -5,
              left: -5,
              borderRadius: 12,
              borderWidth: 4,
              borderColor: getColorOpacity(colors.primary, 0.1),
            }}
          />
        )}
        <Text
          style={[
            {
              color: colors.black,
              fontSize: 16,
              fontFamily: 'Inter-Medium',
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      <CodeField
        {...props}
        {...{ref, value, renderCell}}
        onChangeText={setValue}
        cellCount={codeLength}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        rootStyle={{columnGap: 20, backgroundColor: 'transparent'}}
      />
    </View>
  );
};

const stylesheet = StyleSheet.create({
  cellContainer: {
    ...styles.flex1,
    ...styles.flexCenter,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
});

export default InputNumber;
