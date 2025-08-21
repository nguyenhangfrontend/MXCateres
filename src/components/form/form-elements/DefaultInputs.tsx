import { useState } from 'react';
import ComponentCard from '@components/common/ComponentCard';
import { TextField, InputAdornment, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Visibility, VisibilityOff, AccessTime } from '@mui/icons-material';

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [selectValue, setSelectValue] = useState('');

  const options = [
    { value: 'marketing', label: 'Marketing' },
    { value: 'template', label: 'Template' },
    { value: 'development', label: 'Development' },
  ];

  return (
    <ComponentCard title='Default Inputs'>
      <div className='space-y-6'>
        {/* Normal Input */}
        <TextField fullWidth label='Input' variant='outlined' size='small' />

        {/* Input with placeholder */}
        <TextField
          fullWidth
          label='Input with Placeholder'
          placeholder='info@gmail.com'
          variant='outlined'
          size='small'
        />

        {/* Select Input */}
        <FormControl fullWidth size='small'>
          <InputLabel id='select-label'>Select Input</InputLabel>
          <Select
            labelId='select-label'
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            label='Select Input'
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Password Input */}
        <TextField
          fullWidth
          label='Password Input'
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Date Picker */}
        <DatePicker
          label='Date Picker Input'
          value={date}
          onChange={(newValue: any) => setDate(newValue)}
          slotProps={{ textField: { fullWidth: true, size: 'small' } }}
        />

        {/* Time Picker */}
        <TimePicker
          label='Time Picker Input'
          value={time}
          onChange={(newValue: any) => setTime(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              size: 'small',
              InputProps: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <AccessTime />
                  </InputAdornment>
                ),
              },
            },
          }}
        />

        {/* Input with Payment */}
        <TextField
          fullWidth
          placeholder='Card number'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <div className='flex items-center border-r border-gray-200 dark:border-gray-700 pr-2'>
                  <svg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='6.25' cy='10' r='5.625' fill='#E80B26' />
                    <circle cx='13.75' cy='10' r='5.625' fill='#F59D31' />
                    <path
                      d='M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z'
                      fill='#FC6020'
                    />
                  </svg>
                </div>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </ComponentCard>
  );
}
