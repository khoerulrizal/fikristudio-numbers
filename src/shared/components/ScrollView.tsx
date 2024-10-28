import React, {FC, ForwardedRef, forwardRef, memo} from 'react';
import {ScrollView as RNScrollView, ScrollViewProps} from 'react-native';

const ScrollView: FC<ScrollViewProps> = forwardRef(
  (props, ref: ForwardedRef<RNScrollView>) => {
    return (
      <RNScrollView
        ref={ref}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    );
  },
);

export default memo(ScrollView);
