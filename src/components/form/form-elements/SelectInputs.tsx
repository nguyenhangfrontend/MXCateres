import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';

export default function SelectInputs() {
  const [singleValue, setSingleValue] = useState('');
  const [multiValue, setMultiValue] = useState<string[]>([]);

  const options = [
    { value: 'marketing', label: 'Marketing' },
    { value: 'template', label: 'Template' },
    { value: 'development', label: 'Development' },
  ];

  const multiOptions = [
    { value: '1', text: 'Option 1' },
    { value: '2', text: 'Option 2' },
    { value: '3', text: 'Option 3' },
    { value: '4', text: 'Option 4' },
    { value: '5', text: 'Option 5' },
  ];

  return (
    <Card className='rounded-2xl shadow-md'>
      <CardHeader title='Select Inputs' />
      <CardContent className='space-y-6'>
        {/* Single Select */}
        <FormControl fullWidth>
          <InputLabel id='single-select-label'>Select Input</InputLabel>
          <Select
            labelId='single-select-label'
            value={singleValue}
            onChange={(e) => setSingleValue(e.target.value)}
            label='Select Input'
            className='dark:bg-dark-900'
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Multi Select */}
        <FormControl fullWidth>
          <InputLabel id='multi-select-label'>Multiple Select Options</InputLabel>
          <Select
            labelId='multi-select-label'
            multiple
            value={multiValue}
            onChange={(e) => setMultiValue(e.target.value as string[])}
            input={<OutlinedInput label='Multiple Select Options' />}
            renderValue={(selected) => selected.join(', ')}
          >
            {multiOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                <Checkbox checked={multiValue.indexOf(opt.value) > -1} />
                <ListItemText primary={opt.text} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Accessible hidden text */}
        <p className='sr-only'>Selected Values: {multiValue.join(', ')}</p>
      </CardContent>
    </Card>
  );
}
