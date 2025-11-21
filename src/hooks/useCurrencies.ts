import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setMainCurrency, setSideCurrency, DEFAULT_CURRENCY, DEFAULT_SIDE_CURRENCIES } from '../redux/slices/selectedCurrenciesSlice'
import { useGetCurrenciesQuery } from '../redux/services/currencies'

export const useCurrencies = () => {
  const dispatch = useAppDispatch()
  const { main, side } = useAppSelector((state) => state.selectedCurrencies)

  const { data: allCurrencies, isSuccess } = useGetCurrenciesQuery()

  useEffect(() => {
    if (isSuccess && allCurrencies && Object.keys(allCurrencies).length > 0) {
      if (!main) {
        dispatch(setMainCurrency(DEFAULT_CURRENCY))
      }

      if (!side?.[1]) {
        // Set default side currencies
        Object.entries(side).forEach(([position]) => {
          const posNum = Number(position)
          const defaultCode = DEFAULT_SIDE_CURRENCIES[posNum]
          dispatch(setSideCurrency({ position: posNum, code: defaultCode }))
        })
      }
    }
  }, [isSuccess, allCurrencies, main, side, dispatch])

  const setMainCurrencyHandler = (value: string) => {
    dispatch(setMainCurrency(value))
  }

  return {
    mainCurrency: main,
    sideCurrencies: side,
    allCurrencies,
    isSuccess,
    setMainCurrency: setMainCurrencyHandler,
  }
}
