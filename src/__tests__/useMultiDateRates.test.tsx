import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMultiDateRates } from '../hooks/useMultiDateRates';
import { createReduxWrapper } from './helpers/testUtils';

describe('useMultiDateRates', () => {
  const testDate = new Date('2025-11-22T12:00:00Z');
  const dates = [
    new Date('2025-11-16T12:00:00Z'),
    new Date('2025-11-17T12:00:00Z'),
    new Date('2025-11-18T12:00:00Z'),
    new Date('2025-11-19T12:00:00Z'),
    new Date('2025-11-20T12:00:00Z'),
    new Date('2025-11-21T12:00:00Z'),
    testDate
  ];

  it('returns initial loading state', () => {
    const { result } = renderHook(
      () => useMultiDateRates(dates, 'usd'),
      { wrapper: createReduxWrapper() }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.ratesByDate).toEqual({});
    expect(result.current.loadingByDate).toBeDefined();
  });

  it('returns rates indexed by date after loading', async () => {
    const { result } = renderHook(
      () => useMultiDateRates(dates, 'usd'),
      { wrapper: createReduxWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.ratesByDate).toBeDefined();
    expect(Object.keys(result.current.ratesByDate).length).toBeGreaterThan(0);
  });

  it('returns loading state for each date', async () => {
    const { result } = renderHook(
      () => useMultiDateRates(dates, 'usd'),
      { wrapper: createReduxWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const dateKey = testDate.toISOString().split('T')[0];
    expect(result.current.loadingByDate[dateKey]).toBeDefined();
    expect(result.current.loadingByDate[dateKey]).toBe(false);
  });

  it('returns 7 query results', () => {
    const { result } = renderHook(
      () => useMultiDateRates(dates, 'usd'),
      { wrapper: createReduxWrapper() }
    );

    expect(result.current.queries).toHaveLength(7);
  });

  it('handles different currency codes', async () => {
    const { result } = renderHook(
      () => useMultiDateRates(dates, 'eur'),
      { wrapper: createReduxWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.ratesByDate).toBeDefined();
  });
});
