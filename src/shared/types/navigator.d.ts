import {HistoryNumbers} from './numbers';

export type AppStackParamList = {
  HomeScreen: undefined;
  HistoryScreen: undefined;
  DetailHistoryScreen: {data: HistoryNumbers};
};
