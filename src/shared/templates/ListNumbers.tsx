/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScrollView, Text} from '../components';

const ListNumbers = ({data}: {data: string[]}) => {
  return (
    <ScrollView horizontal>
      <FlatList
        {...{data}}
        numColumns={17}
        contentContainerStyle={{padding: 20}}
        renderItem={({item}) => (
          <Text style={stylesheet.itemText}>{item + '   * '}</Text>
        )}
        ItemSeparatorComponent={() => <View style={{padding: 4}} />}
      />
    </ScrollView>
  );
};

const stylesheet = StyleSheet.create({
  itemText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'right',
    width: 80,
    paddingRight: 5,
  },
});

export default ListNumbers;
