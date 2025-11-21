import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

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
  const mapCurrencyToMenuItem = (items: Record<string, string>) =>
    Object.entries(items).map(([code, name]) => (
      <MenuItem key={code} value={code} >
        {code.toUpperCase()} {name ? `(${name})` : ''}
      </MenuItem>
    ));

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
