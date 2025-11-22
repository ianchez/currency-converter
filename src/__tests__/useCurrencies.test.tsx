import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrencies } from '../hooks/useCurrencies';
import { createReduxWrapper } from './helpers/testUtils';

describe('useCurrencies', () => {

  it('initializes with correct types', () => {
    const { result } = renderHook(() => useCurrencies(), {
      wrapper: createReduxWrapper()
    });

    expect(result.current.selectedDate).toBeInstanceOf(Date);
    expect(result.current.isLoadingRates).toBeDefined();
    expect(typeof result.current.setMainCurrency).toBe('function');
    expect(typeof result.current.setSideCurrency).toBe('function');
    expect(typeof result.current.addSideCurrency).toBe('function');
    expect(typeof result.current.removeSideCurrency).toBe('function');
  });

  it('has sideCurrencies object', () => {
    const { result } = renderHook(() => useCurrencies(), {
      wrapper: createReduxWrapper()
    });

    expect(result.current.sideCurrencies).toBeDefined();
    expect(typeof result.current.sideCurrencies).toBe('object');
  });

  it('selectedDate is set to yesterday by default', () => {
    const { result } = renderHook(() => useCurrencies(), {
      wrapper: createReduxWrapper()
    });

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const selectedDate = result.current.selectedDate;
    
    expect(selectedDate.getDate()).toBe(yesterday.getDate());
    expect(selectedDate.getMonth()).toBe(yesterday.getMonth());
    expect(selectedDate.getFullYear()).toBe(yesterday.getFullYear());
  });
});
