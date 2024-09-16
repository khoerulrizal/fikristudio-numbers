function generateNumbers(array: number[], maxRepeats: number = 2): number[] {
  const result: number[] = [];
  const size = 4;

  const generateCombinations = (
    current: number[],
    counts: {[key: number]: number},
  ) => {
    if (current.length === size) {
      const combinedNumber = Number(current.join(''));
      result.push(combinedNumber);
      return;
    }

    for (const value of array) {
      const count = counts[value] || 0;
      if (count < maxRepeats) {
        const newCounts = {...counts, [value]: count + 1};
        generateCombinations([...current, value], newCounts);
      }
    }
  };

  generateCombinations([], {});
  return result;
}

export default generateNumbers;
