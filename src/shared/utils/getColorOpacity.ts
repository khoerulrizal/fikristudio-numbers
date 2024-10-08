const getColorOpacity = (color: string, opacity: number): string => {
  if (opacity >= 0 && opacity <= 1 && color.includes('#')) {
    const hexValue = Math.round(opacity * 255).toString(16);
    return `${color.slice(0, 7)}${hexValue.padStart(2, '0').toUpperCase()}`;
  }
  return color;
};

export default getColorOpacity;
