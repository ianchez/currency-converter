/**
 * Format a currency rate to show maximum 4 total digits
 * Examples:
 * - 1.2567 -> "1.257"
 * - 22.5443 -> "22.54"
 * - 206.0141 -> "206.0"
 * - 1234.56 -> "1235"
 */
export const formatRate = (rate: number): string => {
  if (rate >= 1000) {
    return rate.toFixed(0);
  } else if (rate >= 100) {
    return rate.toFixed(1);
  } else if (rate >= 10) {
    return rate.toFixed(2);
  } else {
    return rate.toFixed(3);
  }
};
