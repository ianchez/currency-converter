import { FormControl, InputLabel, Select, MenuItem, IconButton, Skeleton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { SelectChangeEvent } from '@mui/material/Select';

interface SideCurrencyRowProps {
  position: number;
  currencyCode: string;
  selectedCurrency: string;
  mainCurrency: string;
  allCurrencies: Record<string, string> | undefined;
  currencyRateByDate: Record<string, Record<string, number>> | undefined;
  sideCurrencies: Record<number, string>;
  canRemove: boolean;
  onRemove: (position: number) => void;
  onChange: (rowNumber: string, currencyCode: string) => void;
}

export const SideCurrencyRow = ({
  position,
  currencyCode,
  selectedCurrency,
  mainCurrency,
  allCurrencies,
  currencyRateByDate,
  sideCurrencies,
  canRemove,
  onRemove,
  onChange
}: SideCurrencyRowProps) => {
  const mapCurrencyToMenuItem = (items: Record<string, string>) =>
    Object.entries(items).map(([code, name]) => (
      <MenuItem key={code} value={code}>
        {code.toUpperCase()} {name ? `(${name})` : ''}
      </MenuItem>
    ));

  // Show skeleton when data is loading
  if (!mainCurrency || !allCurrencies || !currencyRateByDate?.[selectedCurrency]) {
    return (
      <div 
        key={position}
        className="currency-row"
      >
        <FormControl
          fullWidth
          className="side-currency-form-control"
          variant='standard'
        >
          <Skeleton variant="rectangular" width="30%" height={40} sx={{ bgcolor: '#88429618' }}/>
          <Skeleton variant="rectangular" width="15%" height={40} sx={{ bgcolor: '#88429618' }}/>
        </FormControl>
      </div>
    );
  }

  const rate = currencyRateByDate[selectedCurrency]?.[currencyCode];
  const selectedSideCurrencies = Object.values(sideCurrencies);
  const filteredCurrencies = Object.fromEntries(
    Object.entries(allCurrencies).filter(([code]) => 
      code !== selectedCurrency &&
      (!selectedSideCurrencies.includes(code) || code === currencyCode)
    )
  );

  const handleChange = ({ target }: SelectChangeEvent) => {
    onChange(position.toString(), target.value);
  };

  return (
    <div 
      key={position}
      className="currency-row"
    >
      {canRemove && (
        <IconButton 
          aria-label="delete" 
          size="medium" 
          onClick={() => onRemove(position)}
          color="error"
          className="delete-icon"
        >
          <DeleteIcon fontSize="medium" />
        </IconButton>
      )}
      <FormControl
        fullWidth
        className="side-currency-form-control"
        variant='standard'
      >
        <InputLabel
          id={`select-compare-currency-label-${currencyCode}`}
          color="success"
        >
          {currencyCode ? "Comparing with:" : "Select a Currency"}
        </InputLabel>
        <Select
          labelId={`select-compare-currency-label-${currencyCode}`}
          id={`select-compare-currency-${currencyCode}`}
          className="side-currency-select"
          value={currencyCode}
          label="Compare"
          onChange={handleChange}
          color="success"
        >
          {allCurrencies
            ? mapCurrencyToMenuItem(filteredCurrencies)
            : <MenuItem value="" disabled>Loading...</MenuItem>
          }
        </Select>
        <p className="currency-rate">{currencyCode ? rate?.toFixed(4) || 0 : null}</p>
      </FormControl>
    </div>
  );
};
