import { Snackbar, Alert } from '@mui/material';

interface ErrorToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const ErrorToast = ({ open, message, onClose }: ErrorToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
