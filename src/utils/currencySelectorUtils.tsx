import { MenuItem } from '@mui/material';

export const mapCurrencyToMenuItem = (items: Record<string, string>) =>
  Object.entries(items).map(([code, name]) => (
    <MenuItem key={code} value={code}>
      {code.toUpperCase()} {name ? `(${name})` : ''}
    </MenuItem>
  ));
