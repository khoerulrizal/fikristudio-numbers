/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
} from '../../shared/templates';
import {NumbersType} from '../../shared/types/numbers';
import {useNumbers} from '../../shared/hooks';
import {colors} from '../../shared/utils';

const DetailHistoryScreen = () => {
  const [activeFilter, setActiveFilter] = useState<NumbersType>('random');
  const {params} =
    useRoute<RouteProp<AppStackParamList, 'DetailHistoryScreen'>>();
  const data = params?.data;

  const {result, getNumbers, isLoading} = useNumbers('history');

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
      <View style={{flex: 1}}>
        {!isLoading ? (
          <ListNumbers data={result?.[activeFilter] || []} />
        ) : (
          <View style={[styles.flex1, styles.flexCenter]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
      <CopyButton textToCopy={result?.[activeFilter]?.join(' * ')} />
    </BaseView>
  );
};

export default DetailHistoryScreen;
