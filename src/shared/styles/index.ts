import textStyles from './text';
import layoutStyles from './layout';
import spacingStyles from './spacing';
import {colors, getColorOpacity} from '../utils';

const styles = {
  ...textStyles,
  ...layoutStyles,
  ...spacingStyles,
  textTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  dateTime: {
    fontSize: 12,
    color: getColorOpacity(colors.black, 0.6),
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.black,
  },
};

export default styles;
