/**
 * Used as default for historical rate queries since today's data might not be available
 */
export const getYesterday = (): Date => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};

/**
 * Format a Date object to YYYY-MM-DD string for HTML date inputs
 */
export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Clamp a date between min and max dates
 */
export const clampDate = (date: Date, min: Date, max: Date): Date => {
  if (date < min) return min;
  if (date > max) return max;
  return date;
};
