import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { mapCurrencyToMenuItem } from '../utils/currencySelectorUtils';

interface MainCurrencySelectProps {
  mainCurrency: string;
  allCurrencies: Record<string, string> | undefined;
  isLoadingRates?: boolean;
  onChange: (value: string) => void;
}

export const MainCurrencySelect = ({
  mainCurrency,
  allCurrencies,
  isLoadingRates,
  onChange
}: MainCurrencySelectProps) => {
  const handleChange = ({ target }: SelectChangeEvent) => {
    onChange(target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-main-currency-label" color="secondary">Selected Currency</InputLabel>
      <Select
        labelId="select-main-currency-label"
        id="select"
        className="main-currency-select"
        value={mainCurrency}
        label="Selected Currency"
        onChange={handleChange}
        color="secondary"
        disabled={isLoadingRates}
      >
        {allCurrencies
          ? mapCurrencyToMenuItem(allCurrencies)
          : <MenuItem value="" disabled>Loading...</MenuItem>
        }
      </Select>
    </FormControl>
  );
};
