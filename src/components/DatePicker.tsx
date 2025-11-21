import { TextField } from '@mui/material';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export const DatePicker = ({ selectedDate, onChange }: DatePickerProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    const minDateObj = new Date('2024-04-01'); // Latest available data (approximately)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Clamp the date within the valid range
    if (newDate < minDateObj) {
      onChange(minDateObj);
    } else if (newDate > yesterday) {
      onChange(yesterday);
    } else {
      onChange(newDate);
    }
  };

  // Get yesterday's date as max date (can't select future dates)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const maxDate = formatDateForInput(yesterday);

  // Set minimum date to April 1, 2024 (when data starts being available)
  const minDate = '2024-04-01';

  return (
    <TextField
      type="date"
      label="Select Date"
      value={formatDateForInput(selectedDate)}
      onChange={handleChange}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        htmlInput: {
          min: minDate,
          max: maxDate,
        }
      }}
      fullWidth
      className="date-picker"
    />
  );
};

// Format date as YYYY-MM-DD for input value
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
