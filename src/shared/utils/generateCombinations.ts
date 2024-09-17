import {NumbersType} from '../types/numbers';

// Fungsi utama untuk generate kombinasi angka
async function generateCombinations(
  userInput: string,
): Promise<{[key in NumbersType]: string[]}> {
  const results: {[key in NumbersType]: string[]} = {
    random: [],
    double: [],
    triple: [],
  };

  // Validasi input harus 4 digit angka
  if (!/^\d{4}$/.test(userInput)) {
    throw new Error('Input harus 4 digit angka.');
  }

  const inputDigits = userInput.split('');

  // Fungsi untuk mengecualikan angka yang semua digitnya sama
  const isAllSameDigits = (number: string) => {
    return new Set(number.split('')).size === 1;
  };

  // Fungsi untuk menghitung berapa kali angka yang sama muncul
  const countOccurrences = (number: string, digit: string) => {
    return number.split('').filter(d => d === digit).length;
  };

  // Generate angka dari 0000 - 9999
  for (let i = 0; i <= 9999; i++) {
    const number = i.toString().padStart(4, '0');

    // Skip angka yang semua digitnya sama
    if (isAllSameDigits(number)) {
      continue;
    }

    // Kategori random: tidak ada digit yang sama dengan userInput pada posisi yang sama
    if (
      number.split('').every((digit, index) => digit !== inputDigits[index])
    ) {
      results.random.push(number);
    }

    // Cek apakah ada digit yang muncul 2 kali (double) atau 3 kali (triple)
    let isDouble = false;
    let isTriple = false;
    for (const digit of inputDigits) {
      const occurrence = countOccurrences(number, digit);
      if (occurrence === 2) {
        isDouble = true;
      }
      if (occurrence === 3) {
        isTriple = true;
      }
    }

    // Kategori double: harus memiliki tepat 2 digit yang sama dengan salah satu digit input
    if (isDouble && !isTriple) {
      results.double.push(number);
    }

    // Kategori triple: harus memiliki tepat 3 digit yang sama dengan salah satu digit input
    if (isTriple) {
      results.triple.push(number);
    }
  }

  return results;
}

export default generateCombinations;
