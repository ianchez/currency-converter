// Currency management constraints
export const MIN_SIDE_CURRENCIES = 3;
export const MAX_SIDE_CURRENCIES = 7;

// Date constraints for historical rates
export const MIN_DATE = '2024-04-01'; // Earliest available data (approximate)
export const DATE_DEBOUNCE_MS = 200;

// Rate display precision
export const RATE_DECIMAL_PLACES = 4;

// Default currency settings
export const DEFAULT_CURRENCY = 'gbp';
export const DEFAULT_SIDE_CURRENCIES: Record<number, string> = {
  1: 'usd',
  2: 'eur',
  3: 'jpy'
};
