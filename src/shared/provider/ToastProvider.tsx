/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren} from 'react';
import {ToastProvider as Provider} from 'react-native-toast-notifications';

const ToastProvider = ({children}: PropsWithChildren) => {
  return (
    <Provider
      placement="top"
      normalColor={'#605947'}
      duration={3000}
      style={{width: '100%', justifyContent: 'center', borderRadius: 8}}
      offsetTop={32}
      textStyle={{
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
      }}>
      {children}
    </Provider>
  );
};

export default ToastProvider;
