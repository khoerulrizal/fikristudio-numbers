/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {BaseView, Button, InputNumber, Text} from '../../shared/components';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useNumbers} from '../../shared/hooks';
import {NumbersType} from '../../shared/types/numbers';
import {
  CopyButton,
  ListNumbers,
  NumbersFilterChips,
  NumbersTab,
} from '../../shared/templates';
import styles from '../../shared/styles';
import {colors, getColorOpacity, splitArray} from '../../shared/utils';

const HomeScreen = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [value, setValue] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState<NumbersType>('random');
  const {getNumbers, isLoading, result} = useNumbers();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [groupCategory, setGroupCategory] = useState<'duo' | 'default'>(
    'default',
  );

  const buttonLabel = useMemo(() => {
    switch (true) {
      case activeFilter === 'random' && groupCategory === 'duo':
        return 'Bagi 9';
      case activeFilter === 'double' && groupCategory === 'duo':
        return 'Bagi 8';
      default:
        return 'Bagi 2';
    }
  }, [activeFilter, groupCategory]);

  const groupedRandomValues = useMemo(() => {
    return result?.random
      ? groupCategory === 'duo'
        ? splitArray(result?.random, 2)
        : splitArray(result?.random, 9)
      : [];
  }, [groupCategory, result?.random]);

  const groupedDoubleValues = useMemo(() => {
    return result?.double
      ? groupCategory === 'duo'
        ? splitArray(result?.double, 2)
        : splitArray(result?.double, 8)
      : [];
  }, [result?.double, groupCategory]);

  const numbersData = useMemo(() => {
    if (
      (activeIndex === -1 && groupCategory !== 'duo') ||
      activeFilter === 'triple'
    ) {
      return result?.[activeFilter];
    } else {
      if (activeFilter === 'random') {
        return groupCategory === 'duo'
          ? groupedRandomValues?.[activeIndex + 1]
          : groupedRandomValues[activeIndex];
      }
      if (activeFilter === 'double') {
        return groupCategory === 'duo'
          ? groupedDoubleValues?.[activeIndex + 1]
          : groupedDoubleValues[activeIndex];
      }
      return result?.[activeFilter];
    }
  }, [
    activeFilter,
    activeIndex,
    groupCategory,
    groupedDoubleValues,
    groupedRandomValues,
    result,
  ]);

  useEffect(() => {
    setActiveIndex(-1);
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  }, [groupCategory]);

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
              ref={scrollRef}
              type={activeFilter}
              style={{paddingHorizontal: 20}}
              {...{activeIndex, setActiveIndex, groupCategory}}
            />
            <ListNumbers data={numbersData} />
          </>
        )}
      </View>

      {result.random && (
        <View style={[styles.rowCenterBetween, styles.p4]}>
          {activeFilter !== 'triple' && (
            <Button
              onPress={() =>
                setGroupCategory(prev => (prev === 'duo' ? 'default' : 'duo'))
              }
              style={[
                styles.flex1,
                {
                  marginRight: 12,
                  backgroundColor: getColorOpacity(colors.primary, 0.15),
                  borderWidth: 1,
                  borderColor: getColorOpacity(colors.primary, 0.25),
                },
              ]}
              textStyle={{color: colors.primary}}
              text={buttonLabel}
            />
          )}
          <CopyButton textToCopy={numbersData?.join('*')} />
        </View>
      )}
    </BaseView>
  );
};

export default HomeScreen;
