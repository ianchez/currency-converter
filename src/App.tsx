import './App.css'

// Hooks
import { useCurrencies } from './hooks/useCurrencies'

// Components
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'

function App() {
  const {
    mainCurrency,
    sideCurrencies,
    allCurrencies,
    currencyRateByDate,
    setMainCurrency
  } = useCurrencies()

  const handleMainCurrencyChange = ({ target }: SelectChangeEvent) => {
    const { value } = target
    setMainCurrency(value)
  }

  const mapCurrencyToMenuItem = (items: Record<string, string>) =>
    Object.entries(items).map(([code, name]) => (
      <MenuItem key={code} value={code}>
        {code.toUpperCase()} {name ? `(${name})` : ''}
      </MenuItem>
    ))

  const mainCurrencySelect = (
    <FormControl fullWidth>
      <InputLabel id="select-label">Selected Currency</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={mainCurrency}
        label="Selected Currency"
        onChange={handleMainCurrencyChange}
      >
        {allCurrencies
          ? mapCurrencyToMenuItem(allCurrencies)
          : <MenuItem value="" disabled>Loading...</MenuItem>
        }
      </Select>
    </FormControl>
  );

  return (
    <>
      <h1>Currency Exchange Rates</h1>
      <div className="card">
        <p>
          <b>Welcome!</b> Please choose your <b>main currency</b> from the dropdown below.
        </p>
      </div>

      {mainCurrencySelect}

      <p className="info">
        Learn more
      </p>
    </>
  )
}

export default App
