/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {BaseView, Button, Text} from '../../shared/components';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import styles from '../../shared/styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../../shared/types/navigator';
import dayjs from 'dayjs';
import {
  CopyButton,
  ListNumbers,
  NumbersFilterChips,
  NumbersTab,
} from '../../shared/templates';
import {NumbersType} from '../../shared/types/numbers';
import {useNumbers} from '../../shared/hooks';
import {colors, getColorOpacity, splitArray} from '../../shared/utils';

const DetailHistoryScreen = () => {
  const scrollRef = useRef<ScrollView>(null);

  const [activeFilter, setActiveFilter] = useState<NumbersType>('random');
  const {params} =
    useRoute<RouteProp<AppStackParamList, 'DetailHistoryScreen'>>();
  const data = params?.data;

  const {result, getNumbers, isLoading} = useNumbers('history');
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
    getNumbers(data?.numbers?.join(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setActiveIndex(-1);
    scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
  }, [groupCategory]);

  return (
    <BaseView title="Detail" type="history">
      <View style={[styles.container, {marginBottom: -8}]}>
        <Text style={styles.dateTime}>
          {dayjs(data?.date).format('DD MMMM YYYY - HH:mm')}
        </Text>
        <Text style={styles.label}>
          Generated Numbers {data?.numbers?.join('')}
        </Text>
      </View>
      <NumbersFilterChips
        {...{activeFilter, setActiveFilter}}
        style={{paddingHorizontal: 20}}
      />
      <NumbersTab
        ref={scrollRef}
        style={{paddingHorizontal: 20}}
        type={activeFilter}
        {...{activeIndex, setActiveIndex, groupCategory}}
      />
      <View style={{flex: 1}}>
        {!isLoading ? (
          <ListNumbers data={numbersData} />
        ) : (
          <View style={[styles.flex1, styles.flexCenter]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
      <View style={[styles.rowCenterBetween, styles.p4]}>
        {activeFilter !== 'triple' && (
          <Button
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
            onPress={() =>
              setGroupCategory(prev => (prev === 'duo' ? 'default' : 'duo'))
            }
          />
        )}
        <CopyButton textToCopy={numbersData?.join('*')} />
      </View>
    </BaseView>
  );
};

export default DetailHistoryScreen;
