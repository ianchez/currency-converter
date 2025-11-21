import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/'
const ENDPOINTS = {
  CURRENCIES: 'currencies.json',
}

export type CurrenciesResponse = {
  [key: string]: string
}

export const currenciesApi = createApi({
  reducerPath: 'currenciesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 60 * 60 * 12, // keep data for 12 hours
  endpoints: (build) => ({
    getCurrencies: build.query<CurrenciesResponse, void>({
      query: () => ENDPOINTS.CURRENCIES,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCurrenciesQuery } = currenciesApi