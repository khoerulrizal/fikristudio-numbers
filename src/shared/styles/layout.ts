import {StyleSheet} from 'react-native';

const layoutStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemsCenter: {
    alignItems: 'center',
  },
});

export default layoutStyles;
