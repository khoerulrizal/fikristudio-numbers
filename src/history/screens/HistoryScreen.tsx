/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BaseView, Text} from '../../shared/components';
import styles from '../../shared/styles';
import {FlatList, View} from 'react-native';
import {useNumbersStore} from '../../shared/store';
import HistoryItem from '../components/HistoryItem';

const HistoryScreen = () => {
  const {history} = useNumbersStore();

  return (
    <BaseView title="History" type="history">
      {history.length > 0 && (
        <Text style={[styles.textTitle, styles.container, {marginBottom: -8}]}>
          Generated Numbers List
        </Text>
      )}
      <FlatList
        data={history}
        renderItem={({item}) => <HistoryItem {...{item}} />}
        keyExtractor={item => item.date.toString()}
        contentContainerStyle={
          history?.length === 0
            ? [styles.flex1, styles.flexCenter]
            : {paddingHorizontal: 20}
        }
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        ListEmptyComponent={() => (
          <View style={[styles.flex1, styles.flexCenter]}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
              }}>
              There are no Generated Numbers yet
            </Text>
          </View>
        )}
      />
    </BaseView>
  );
};

export default HistoryScreen;
