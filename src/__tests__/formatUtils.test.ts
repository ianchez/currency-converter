import { describe, it, expect } from 'vitest';
import { formatRate } from '../utils/formatUtils';

describe('formatUtils', () => {
  describe('formatRate', () => {
    it('formats rates < 10 with 3 decimals (max 4 total digits)', () => {
      expect(formatRate(1.2567)).toBe('1.257');
      expect(formatRate(5.6789)).toBe('5.679');
      expect(formatRate(9.9999)).toBe('10.000');
    });

    it('formats rates >= 10 and < 100 with 2 decimals (max 4 total digits)', () => {
      expect(formatRate(22.5443)).toBe('22.54');
      expect(formatRate(10.1234)).toBe('10.12');
      expect(formatRate(99.9999)).toBe('100.00');
    });

    it('formats rates >= 100 and < 1000 with 1 decimal (max 4 total digits)', () => {
      expect(formatRate(206.0141)).toBe('206.0');
      expect(formatRate(100.5678)).toBe('100.6');
      expect(formatRate(999.9999)).toBe('1000.0');
    });

    it('formats rates >= 1000 with no decimals (4 digits)', () => {
      expect(formatRate(1234.56)).toBe('1235');
      expect(formatRate(5000.123)).toBe('5000');
      expect(formatRate(9999.999)).toBe('10000');
    });

    it('handles edge cases', () => {
      expect(formatRate(0)).toBe('0.000');
      expect(formatRate(0.001)).toBe('0.001');
      expect(formatRate(0.9999)).toBe('1.000');
    });
  });
});
