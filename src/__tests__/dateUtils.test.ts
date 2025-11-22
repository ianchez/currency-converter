import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getYesterday, formatDateForInput, clampDate } from '../utils/dateUtils';

describe('dateUtils', () => {
  describe('getYesterday', () => {
    beforeEach(() => {
      // Reset date mocks before each test
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns a Date object', () => {
      const result = getYesterday();
      expect(result).toBeInstanceOf(Date);
    });

    it('returns yesterday\'s date', () => {
      // Set a fixed date: November 22, 2025
      const mockDate = new Date('2025-11-22T12:00:00Z');
      vi.setSystemTime(mockDate);

      const yesterday = getYesterday();
      
      expect(yesterday.getDate()).toBe(21);
      expect(yesterday.getMonth()).toBe(10); // November (0-indexed)
      expect(yesterday.getFullYear()).toBe(2025);
    });
  });

  describe('formatDateForInput', () => {
    it('formats date to YYYY-MM-DD', () => {
      const date = new Date('2025-11-22T12:00:00Z');
      const result = formatDateForInput(date);
      
      expect(result).toBe('2025-11-22');
    });

    it('pads single-digit months with zero', () => {
      const date = new Date('2025-03-15T12:00:00Z');
      const result = formatDateForInput(date);
      
      expect(result).toBe('2025-03-15');
    });

    it('pads single-digit days with zero', () => {
      const date = new Date('2025-11-05T12:00:00Z');
      const result = formatDateForInput(date);
      
      expect(result).toBe('2025-11-05');
    });

    it('returns consistent format for different times', () => {
      const morning = new Date('2025-11-22T08:00:00Z');
      const evening = new Date('2025-11-22T20:00:00Z');
      
      expect(formatDateForInput(morning)).toBe(formatDateForInput(evening));
    });
  });

  describe('clampDate', () => {
    const minDate = new Date('2024-04-01T00:00:00Z');
    const maxDate = new Date('2025-11-22T00:00:00Z');

    it('returns the date when within range', () => {
      const date = new Date('2025-06-15T12:00:00Z');
      const result = clampDate(date, minDate, maxDate);
      
      expect(result).toBe(date);
      expect(result.getTime()).toBe(date.getTime());
    });

    it('returns min date when date is before min', () => {
      const date = new Date('2024-01-01T12:00:00Z');
      const result = clampDate(date, minDate, maxDate);
      
      expect(result).toBe(minDate);
      expect(result.getTime()).toBe(minDate.getTime());
    });

    it('returns max date when date is after max', () => {
      const date = new Date('2026-01-01T12:00:00Z');
      const result = clampDate(date, minDate, maxDate);
      
      expect(result).toBe(maxDate);
      expect(result.getTime()).toBe(maxDate.getTime());
    });

    it('handles dates very close to boundaries', () => {
      const justBeforeMin = new Date(minDate.getTime() - 1);
      const justAfterMax = new Date(maxDate.getTime() + 1);
      
      expect(clampDate(justBeforeMin, minDate, maxDate)).toBe(minDate);
      expect(clampDate(justAfterMax, minDate, maxDate)).toBe(maxDate);
    });

    it('handles same min and max date', () => {
      const singleDate = new Date('2025-06-15T12:00:00Z');
      const before = new Date('2025-06-14T12:00:00Z');
      const after = new Date('2025-06-16T12:00:00Z');
      
      expect(clampDate(before, singleDate, singleDate)).toBe(singleDate);
      expect(clampDate(after, singleDate, singleDate)).toBe(singleDate);
      expect(clampDate(singleDate, singleDate, singleDate)).toBe(singleDate);
    });
  });
});
