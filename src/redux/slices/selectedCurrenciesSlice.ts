import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface CurrenciesState {
  main: string
}

export const DEFAULT_CURRENCY = 'gbp';

const initialState: CurrenciesState = {
  main: '',
}

export const selectedCurrenciesSlice = createSlice({
  name: 'selectedCurrencies',
  initialState,
  reducers: {
    setMainCurrency: (state, action: PayloadAction<string>) => {
      state.main = action.payload
    },
  },
})

export const { setMainCurrency } = selectedCurrenciesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMainCurrency = (state: RootState) => state.selectedCurrencies.main

export default selectedCurrenciesSlice.reducer