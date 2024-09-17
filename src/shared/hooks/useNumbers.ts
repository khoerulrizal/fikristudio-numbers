import {useCallback, useState} from 'react';
import {generateCombinations} from '../utils';
import {NumbersType} from '../types/numbers';
import {useNumbersStore} from '../store';

export default function useNumbers(type: 'home' | 'history' = 'home'): {
  isLoading: boolean;
  getNumbers: (value: string) => Promise<void>;
  result: {[key in NumbersType]: string[]};
} {
  const [isLoading, setIsLoading] = useState(false);
  const {addHistory} = useNumbersStore();
  const [result, setResult] = useState<
    {[key in NumbersType]: string[]} | never[]
  >([]);

  const getNumbers = useCallback(
    async (value: string) => {
      setIsLoading(true);

      const numbers = value.split('').map(v => parseInt(v, 10));
      type === 'home' && addHistory({date: new Date(), numbers});
      const res = await generateCombinations(value);

      setResult(res);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    },
    [addHistory, type],
  );

  return {
    isLoading,
    getNumbers,
    result: result as {[key in NumbersType]: string[]},
  };
}
