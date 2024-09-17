import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {NumbersType} from '../types/numbers';
import {Chips} from '../components';
const filterData: {label: string; value: NumbersType}[] = [
  {label: 'Acak', value: 'random'},
  {label: 'Double', value: 'double'},
  {label: 'Triple', value: 'triple'},
];

const NumbersFilterChips = ({
  activeFilter,
  setActiveFilter,
  style,
}: {
  activeFilter: NumbersType;
  setActiveFilter: Dispatch<SetStateAction<NumbersType>>;
  style?: ViewStyle;
}) => {
  const onPress = (value: NumbersType) => {
    setActiveFilter(value);
  };
  return (
    <View style={StyleSheet.flatten([stylesheet.container, style])}>
      {filterData?.map(data => (
        // @ts-ignore
        <Chips isActive={activeFilter === data.value} {...{...data, onPress}} />
      ))}
    </View>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    width: '100%',
  },
});

export default NumbersFilterChips;
