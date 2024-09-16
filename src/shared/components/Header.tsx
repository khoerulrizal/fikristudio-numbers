import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import styles from '../styles';
import {colors} from '../utils';
import {ArrowLeftIcon, HistoryIcon} from '../assets/icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../types/navigator';

export type HeaderType = 'home' | 'history';

const Header = ({title, type}: {title: string; type: HeaderType}) => {
  const {navigate, goBack} = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View style={stylesheet.headerContainer}>
      {type === 'history' ? (
        <TouchableOpacity style={stylesheet.iconButtonWrapper} onPress={goBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      ) : (
        <View style={stylesheet.emptyView} />
      )}
      <Text style={stylesheet.titleText}>{title}</Text>
      {type === 'home' ? (
        <TouchableOpacity
          style={stylesheet.iconButtonWrapper}
          onPress={() => navigate('HistoryScreen')}>
          <HistoryIcon />
        </TouchableOpacity>
      ) : (
        <View style={stylesheet.emptyView} />
      )}
    </View>
  );
};

const stylesheet = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 16,
    ...styles.rowCenterBetween,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
    alignSelf: 'center',
  },
  emptyView: {height: 36, width: 36, backgroundColor: 'transparent'},
  iconButtonWrapper: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    ...styles.flexCenter,
  },
});

export default Header;
