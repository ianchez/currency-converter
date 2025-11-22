import { describe, it, expect } from 'vitest';
import { formatRate } from '../utils/formatUtils';

describe('formatUtils', () => {
  describe('formatRate', () => {
    it('formats very small rates (< 0.001) with 3 significant figures', () => {
      expect(formatRate(0.000001)).toBe('0.00000100');
      expect(formatRate(0.000015052)).toBe('0.0000151');
      expect(formatRate(0.0001234)).toBe('0.000123');
      expect(formatRate(0.00056789)).toBe('0.000568');
    });

    it('formats small rates (0.001 to 1) with up to 5 decimals', () => {
      expect(formatRate(0.001)).toBe('0.001');
      expect(formatRate(0.12345)).toBe('0.12345');
      expect(formatRate(0.123456789)).toBe('0.12346');
      expect(formatRate(0.9999)).toBe('0.9999');
    });

    it('formats rates 1-10 with 3 decimals', () => {
      expect(formatRate(1.2567)).toBe('1.257');
      expect(formatRate(5.6789)).toBe('5.679');
      expect(formatRate(9.9999)).toBe('10.000');
    });

    it('formats rates 10-100 with 2 decimals', () => {
      expect(formatRate(22.5443)).toBe('22.54');
      expect(formatRate(10.1234)).toBe('10.12');
      expect(formatRate(99.9999)).toBe('100.00');
    });

    it('formats rates 100-1000 with 1 decimal', () => {
      expect(formatRate(206.0141)).toBe('206.0');
      expect(formatRate(100.5678)).toBe('100.6');
      expect(formatRate(999.9999)).toBe('1000.0');
    });

    it('formats rates 1000-10000 with no decimals', () => {
      expect(formatRate(1234.56)).toBe('1,235');
      expect(formatRate(5000.123)).toBe('5,000');
      expect(formatRate(9999.999)).toBe('10,000');
    });

    it('formats large rates (>= 1000) with commas', () => {
      expect(formatRate(102030.2)).toBe('102,030');
      expect(formatRate(1500000)).toBe('1,500,000');
      expect(formatRate(12345678.9)).toBe('12,345,679');
    });

    it('handles edge cases', () => {
      expect(formatRate(0)).toBe('0');
    });
  });
});
