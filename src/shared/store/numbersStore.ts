import {create} from 'zustand';
import {persistMiddleware} from '../utils';
import {HistoryNumbers} from '../types/numbers';

type State = {
  history: HistoryNumbers[] | [];
};

type Actions = {
  addHistory: (data: HistoryNumbers) => void;
};

const useNumbersStore = create<State & Actions>()(
  persistMiddleware(
    set => ({
      history: [],
      addHistory: data => set(prev => ({history: [data, ...prev.history]})),
    }),
    'numbersStore',
  ),
);

export default useNumbersStore;
