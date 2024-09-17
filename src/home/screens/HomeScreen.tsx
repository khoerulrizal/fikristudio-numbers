/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BaseView, Button, InputNumber, Text} from '../../shared/components';
import {StyleSheet, View} from 'react-native';
import {useNumbers} from '../../shared/hooks';
import {NumbersType} from '../../shared/types/numbers';
import {
  CopyButton,
  ListNumbers,
  NumbersFilterChips,
} from '../../shared/templates';
import styles from '../../shared/styles';

const HomeScreen = () => {
  const [value, setValue] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState<NumbersType>('random');
  const {getNumbers, isLoading, result} = useNumbers();

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
            <ListNumbers data={result?.[activeFilter]} />
          </>
        )}
      </View>

      {result.random && (
        <CopyButton textToCopy={result?.[activeFilter]?.join('*')} />
      )}
    </BaseView>
  );
};

export default HomeScreen;
