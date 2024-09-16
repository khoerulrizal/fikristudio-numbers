import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HistoryNumbers} from '../../shared/types/numbers';
import {Text} from '../../shared/components';
import {colors} from '../../shared/utils';
import dayjs from 'dayjs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../../shared/types/navigator';
import styles from '../../shared/styles';

const HistoryItem = ({item}: {item: HistoryNumbers}) => {
  const {navigate} = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigate('DetailHistoryScreen', {data: item})}
      style={stylesheet.container}>
      <Text style={styles.dateTime}>
        {dayjs(item?.date).format('DD MMMM YYYY - HH:mm')}
      </Text>
      <Text style={styles.label}>
        Generated Numbers {item?.numbers?.join('')}
      </Text>
    </TouchableOpacity>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 0.25,
  },
});

export default HistoryItem;
