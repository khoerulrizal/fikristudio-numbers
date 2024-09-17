/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {BaseView, Button, InputNumber, Text} from '../../shared/components';
import {StyleSheet, View} from 'react-native';
import {useNumbers} from '../../shared/hooks';
import {NumbersType} from '../../shared/types/numbers';
import {
  CopyButton,
  ListNumbers,
  NumbersFilterChips,
  NumbersTab,
} from '../../shared/templates';
import styles from '../../shared/styles';
import {splitArray} from '../../shared/utils';

const HomeScreen = () => {
  const [value, setValue] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState<NumbersType>('random');
  const {getNumbers, isLoading, result} = useNumbers();
  const [activeIndex, setActiveIndex] = useState(-1);

  const groupedRandomValues = useMemo(() => {
    return result?.random ? splitArray(result?.random, 9) : [];
  }, [result?.random]);

  const groupedDoubleValues = useMemo(() => {
    return result?.double ? splitArray(result?.double, 8) : [];
  }, [result?.double]);

  const numbersData = useMemo(() => {
    if (activeIndex === -1 || activeFilter === 'triple') {
      return result?.[activeFilter];
    } else {
      if (activeFilter === 'random') {
        return groupedRandomValues[activeIndex];
      }
      if (activeFilter === 'double') {
        return groupedDoubleValues[activeIndex];
      }
      return result?.[activeFilter];
    }
  }, [
    activeFilter,
    activeIndex,
    groupedDoubleValues,
    groupedRandomValues,
    result,
  ]);

  return (
    <BaseView title="Generate Numbers" type="home">
      <View style={styles.flex1}>
        <View style={styles.container}>
          <Text style={styles.textTitle}>Masukan Angka</Text>
          <InputNumber {...{value, setValue}} />
          <Button
            text={isLoading ? 'Generating...' : 'Generate'}
            onPress={async () => await getNumbers(value)}
            disabled={value.length !== 4 || isLoading}
            style={{marginTop: 12}}
          />
        </View>
        {result?.random && (
          <>
            <Text
              style={StyleSheet.flatten([styles.textTitle, {marginLeft: 20}])}>
              Hasil
            </Text>
            <NumbersFilterChips
              style={{paddingHorizontal: 20}}
              {...{activeFilter, setActiveFilter}}
            />
            <NumbersTab
              type={activeFilter}
              style={{paddingHorizontal: 20}}
              {...{activeIndex, setActiveIndex}}
            />
            <ListNumbers data={numbersData} />
          </>
        )}
      </View>

      {result.random && <CopyButton textToCopy={numbersData?.join('*')} />}
    </BaseView>
  );
};

export default HomeScreen;
