import React, {FC, memo} from 'react';
import {ScrollView as RNScrollView, ScrollViewProps} from 'react-native';

const ScrollView: FC<ScrollViewProps> = props => {
  return (
    <RNScrollView
      keyboardShouldPersistTaps="handled"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
};

export default memo(ScrollView);
