/**
 * Format a currency rate to show appropriate precision based on magnitude
 * Examples:
 * - 0.000001 -> "0.000001"
 * - 0.000015052 -> "0.000015"
 * - 0.001234 -> "0.00123"
 * - 1.2567 -> "1.257"
 * - 22.5443 -> "22.54"
 * - 206.0141 -> "206.0"
 * - 1234.56 -> "1235"
 * - 102030.2 -> "102,030"
 * - 1500000 -> "1,500,000"
 */
export const formatRate = (rate: number): string => {
  // Handle very small numbers (less than 0.001)
  if (rate > 0 && rate < 0.001) {
    // Use toPrecision to get 3 significant figures
    const formatted = rate.toPrecision(3);
    // If it's in scientific notation, convert it properly
    if (formatted.includes('e')) {
      return parseFloat(formatted).toFixed(10).replace(/\.?0+$/, '');
    }
    return formatted;
  }
  
  // Handle large numbers (1000 and above) with comma separators
  if (rate >= 1000) {
    return Math.round(rate).toLocaleString('en-US');
  }
  
  // Original logic for normal ranges
  if (rate >= 1000) {
    return rate.toFixed(0);
  } else if (rate >= 100) {
    return rate.toFixed(1);
  } else if (rate >= 10) {
    return rate.toFixed(2);
  } else if (rate >= 1) {
    return rate.toFixed(3);
  } else {
    // For numbers between 0.001 and 1, show up to 5 decimal places
    return rate.toFixed(5).replace(/\.?0+$/, '');
  }
};
