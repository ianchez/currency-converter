import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/'
const ENDPOINTS = {
  CURRENCIES: 'currency-api@latest/v1/currencies.json',
  CURRENCY_RATES_BY_DATE: ({ date, code }: { date: string; code: string }) =>
    `currency-api@${date}/v1/currencies/${code}.json `,
}

export type CurrenciesResponse = {
  [key: string]: string
}

// More accurate version:
export type CurrencyExchangeRates = {
  [currency: string]: number;
};

export type CurrencyRateByDateResponse = {
  date: string;
} & {
  [currencyCode: string]: CurrencyExchangeRates;
};

export const currenciesApi = createApi({
  reducerPath: 'currenciesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 60 * 60 * 12, // keep data for 12 hours
  endpoints: (build) => ({
    getCurrencies: build.query<CurrenciesResponse, void>({
      query: () => ENDPOINTS.CURRENCIES,
    }),
    getCurrencyRateByDate:
      build.query<CurrencyRateByDateResponse, { currencyCode: string; year: string; month: string; day: string }>({
      query: ({ year, month, day, currencyCode }) => ENDPOINTS.CURRENCY_RATES_BY_DATE({
        date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
        code: currencyCode,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCurrenciesQuery, useGetCurrencyRateByDateQuery } = currenciesApi