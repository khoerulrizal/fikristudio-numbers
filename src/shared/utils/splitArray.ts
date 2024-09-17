function splitArray<T>(arr: T[], numParts: number): T[][] {
  const result: T[][] = [];
  const partSize = Math.ceil(arr.length / numParts);

  for (let i = 0; i < arr.length; i += partSize) {
    result.push(arr.slice(i, i + partSize));
  }

  return result;
}

export default splitArray;
