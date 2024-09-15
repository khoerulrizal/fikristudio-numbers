import React from 'react';
import {BaseView, Text} from '../../shared/components';
import {View} from 'react-native';

const HomeScreen = () => {
  return (
    <BaseView title="Generate Numbers" type="home">
      <View>
        <Text>Masukan Angka</Text>
      </View>
    </BaseView>
  );
};

export default HomeScreen;
