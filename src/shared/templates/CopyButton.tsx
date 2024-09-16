import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Toast} from 'react-native-toast-notifications';
import {Button, Text} from '../components';
import {colors} from '../utils';
import {CopyIcon} from '../assets/icons';
import styles from '../styles';
import Clipboard from '@react-native-clipboard/clipboard';

const CopyButton = ({textToCopy}: {textToCopy: string}) => {
  const handleShowToast = useCallback(() => {
    Clipboard.setString(textToCopy);
    setTimeout(() => {
      Toast.show('Success Copy');
    }, 250);
  }, [textToCopy]);

  return (
    <Button onPress={handleShowToast} style={styles.m4}>
      <CopyIcon />
      <Text style={stylesheet.textStyle}>Copy Numbers</Text>
    </Button>
  );
};

const stylesheet = StyleSheet.create({
  textStyle: {fontSize: 16, fontFamily: 'Inter-SemiBold', color: colors.white},
});

export default CopyButton;
