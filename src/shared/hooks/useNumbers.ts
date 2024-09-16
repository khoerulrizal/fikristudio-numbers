import {useCallback, useState} from 'react';
import {generateNumbers} from '../utils';
import {NumbersType} from '../types/numbers';
import {useNumbersStore} from '../store';

export default function useNumbers(type: 'home' | 'history' = 'home'): {
  isLoading: boolean;
  getNumbers: (value: string) => Promise<void>;
  result: {[key in NumbersType]: number[]};
} {
  const [isLoading, setIsLoading] = useState(false);
  const {addHistory} = useNumbersStore();
  const [result, setResult] = useState<
    {[key in NumbersType]: number[]} | never[]
  >([]);

  const getNumbers = useCallback(
    async (value: string) => {
      setIsLoading(true);

      const numbers = value.split('').map(v => parseInt(v, 10));
      type === 'home' && addHistory({date: new Date(), numbers});
      const [random, double, triple] = await Promise.all([
        generateNumbers(numbers, 1),
        generateNumbers(numbers, 2),
        generateNumbers(numbers, 3),
      ]);

      setResult({random, double, triple});
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    },
    [addHistory, type],
  );

  return {
    isLoading,
    getNumbers,
    result: result as {[key in NumbersType]: number[]},
  };
}
