import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setMainCurrency, DEFAULT_CURRENCY } from '../redux/slices/selectedCurrenciesSlice'
import { useGetCurrenciesQuery } from '../redux/services/currencies'

export const useCurrency = () => {
  const dispatch = useAppDispatch()
  const mainCurrency = useAppSelector((state) => state.selectedCurrencies.main)

  const { data: currencies, isSuccess } = useGetCurrenciesQuery()

  useEffect(() => {
    if (isSuccess && currencies && Object.keys(currencies).length > 0 && !mainCurrency) {
      dispatch(setMainCurrency(DEFAULT_CURRENCY))
    }
  }, [isSuccess, currencies, mainCurrency, dispatch])

  const setMainCurrencyHandler = (value: string) => {
    dispatch(setMainCurrency(value))
  }

  return {
    mainCurrency,
    currencies,
    isSuccess,
    setMainCurrency: setMainCurrencyHandler,
  }
}
