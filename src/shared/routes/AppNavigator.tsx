import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../home/screens/HomeScreen';
import HistoryScreen from '../../history/screens/HistoryScreen';
import {AppStackParamList} from '../types/navigator';
import DetailHistoryScreen from '../../history/screens/DetailHistoryScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen
        name="DetailHistoryScreen"
        component={DetailHistoryScreen}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
