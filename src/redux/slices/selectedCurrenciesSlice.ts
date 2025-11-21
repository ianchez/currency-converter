import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface CurrenciesState {
  main: string
  side: {
    [key: number]: string
  }
}

export const DEFAULT_CURRENCY = 'gbp'; // British Pound
export const DEFAULT_SIDE_CURRENCIES: { [key: number]: string } = {
  1: 'usd', // US Dollar
  2: 'eur', // Euro
  3: 'jpy', // Japanese Yen
  4: 'chf', // Swiss Franc
  5: 'cad', // Canadian Dollar
  6: 'aud', // Australian Dollar
  7: 'zar', // South African Rand
}

const initialState: CurrenciesState = {
  main: '',
  side: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
  }
}

export const selectedCurrenciesSlice = createSlice({
  name: 'selectedCurrencies',
  initialState,
  reducers: {
    setMainCurrency: (state, action: PayloadAction<string>) => {
      state.main = action.payload
    },
    setSideCurrency: (state, action: PayloadAction<{ position: number; code: string }>) => {
      const { position, code } = action.payload
      state.side[position] = code
    },
  },
})

export const { setMainCurrency, setSideCurrency } = selectedCurrenciesSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectMainCurrency = (state: RootState) => state.selectedCurrencies.main

export default selectedCurrenciesSlice.reducer