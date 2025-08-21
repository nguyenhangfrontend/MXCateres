import type { FC } from 'react';
import { TextField } from '@mui/material';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string | number; // ⬅ change here
  max?: string | number; // ⬅ change here
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  label?: string;
  helperText?: string;
}

const Input: FC<InputProps> = ({
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  className = '',
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  label,
  helperText,
}) => {
  return (
    <TextField
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      inputProps={{ min, max, step }}
      className={className}
      fullWidth
      variant='outlined'
      size='small'
      error={error}
      label={label}
      helperText={helperText}
      color={success ? 'success' : 'primary'}
    />
  );
};

export default Input;
