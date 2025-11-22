import { MenuItem } from '@mui/material';

export const mapCurrencyToMenuItem = (currencies: Record<string, string>) => {
  return Object.entries(currencies).map(([code, name]) => (
    <MenuItem key={code} value={code}>
      {code.toUpperCase()} {name ? `(${name})` : ''}
    </MenuItem>
  ));
};