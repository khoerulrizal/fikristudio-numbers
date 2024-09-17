/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {BaseView, Text} from '../../shared/components';
import {ActivityIndicator, View} from 'react-native';
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
import {colors, splitArray} from '../../shared/utils';

const DetailHistoryScreen = () => {
  const [activeFilter, setActiveFilter] = useState<NumbersType>('random');
  const {params} =
    useRoute<RouteProp<AppStackParamList, 'DetailHistoryScreen'>>();
  const data = params?.data;

  const {result, getNumbers, isLoading} = useNumbers('history');
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

  useEffect(() => {
    getNumbers(data?.numbers?.join(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        style={{paddingHorizontal: 20}}
        type={activeFilter}
        {...{activeIndex, setActiveIndex}}
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
      <CopyButton textToCopy={numbersData?.join('*')} />
    </BaseView>
  );
};

export default DetailHistoryScreen;
