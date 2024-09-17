import {NumbersType} from '../types/numbers';

async function generateCombinations(
  userInput: string,
): Promise<{[key in NumbersType]: string[]}> {
  const results: {[key in NumbersType]: string[]} = {
    random: [],
    double: [],
    triple: [],
  };

  const inputDigits: string[] = userInput.split('');

  // Helper function to check if all digits are different from the user input digits at the same index
  const isDifferentFromInput = (number: string): boolean => {
    return number
      .split('')
      .every(
        (digit: string, index: number): boolean => digit !== inputDigits[index],
      );
  };

  const isAllSameDigits = (number: string): boolean => {
    return new Set(number.split('')).size === 1;
  };

  const hasUniqueDigits = (number: string): boolean => {
    return new Set(number.split('')).size === number.length;
  };

  for (let i = 0; i <= 9999; i++) {
    const number: string = i.toString().padStart(4, '0');

    if (isAllSameDigits(number)) {
      continue;
    }

    // Apply the condition to all cases
    if (!isDifferentFromInput(number)) {
      continue;
    }

    // Check for random (all digits unique)
    if (hasUniqueDigits(number)) {
      results.random.push(number);
    }

    // Count the frequency of each digit
    const digitCount: {[key: string]: number} = {};
    for (const digit of number) {
      digitCount[digit] = (digitCount[digit] || 0) + 1;
    }

    // Check for double (at least two of the same digits)
    if (Object.values(digitCount).includes(2)) {
      results.double.push(number);
    }

    // Check for triple (at least three of the same digits)
    if (Object.values(digitCount).includes(3)) {
      results.triple.push(number);
    }
  }

  return results;
}

export default generateCombinations;
