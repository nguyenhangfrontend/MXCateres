import { useState } from 'react';
// import { Link } from 'react-router';
import Input from '@components/form/input/InputField';
// import Checkbox from '@components/form/input/Checkbox';
import Button from '@components/ui/button/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLoginMutation } from '@/api-request/Auth.api';
import { SearchFormPropsType, SearchFormType } from './types';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { defaultSearchValue, names, orderStatus, workingShift } from './constant';
import moment from 'moment';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SearchForm({ handleSearch }: SearchFormPropsType) {
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SearchFormType>({
    mode: 'onChange',
    defaultValues: {
      ...defaultSearchValue,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  // console.log('errors', errors);
  // console.log(watch('email'));
  const onSearch: SubmitHandler<SearchFormType> = async (values) => {
    handleSearch(values);
    // setLoading(true);
    // const result: any = await login(values);
    // console.log('result', result);
    // setLoading(false);
    // const status = result.data?.success ? 'success' : 'error';
    // if (status === 'success') {
    //   setCookieLocal('token', result?.data?.data.token);
    //   localStorage.setItem('currentUser', JSON.stringify(result?.data?.user));
    //   navigate('/');
    // } else {
    //   const message = result.error?.data?.message || 'Login fail';
    //   setErrorLogin(message);
    // }
  };
  // const [isChecked, setIsChecked] = useState(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='flex'>
        <form onSubmit={handleSubmit(onSearch)} className='flex items-end gap-4'>
          {/* From */}
          <Controller
            name='from'
            control={control}
            render={({ field }) => <DatePicker label='From' value={field.value || null} onChange={field.onChange} />}
          />

          {/* To */}
          <Controller
            name='to'
            control={control}
            render={({ field }) => <DatePicker label='To' value={field.value || null} onChange={field.onChange} />}
          />
          <Controller
            name='workingShift'
            control={control}
            defaultValue={[]}
            render={({ field }) => {
              console.log('field', field);
              return (
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id='workingShift-label'>Working Shift</InputLabel>
                  <Select
                    labelId='workingShift-label'
                    id='workingShift'
                    multiple
                    value={field.value}
                    onChange={field.onChange}
                    input={<OutlinedInput label='Working Shift' />} // 👈 label passed here
                    MenuProps={MenuProps}
                  >
                    {workingShift.map((shift) => (
                      <MenuItem key={shift.key} value={shift.key}>
                        {shift.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
          />
          <Controller
            name='status'
            control={control}
            defaultValue={[]}
            render={({ field }) => {
              console.log('field', field);
              return (
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id='zoneId-label'>Order Status</InputLabel>
                  <Select
                    labelId='status-label'
                    id='status'
                    multiple
                    onChange={field.onChange}
                    value={field.value}
                    input={<OutlinedInput label='Status' />} // 👈 label passed here
                    MenuProps={MenuProps}
                  >
                    {orderStatus.map((status) => (
                      <MenuItem key={status.key} value={status.key}>
                        {status.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
          />

          {/* Button */}
          <Button height={55} width={100} fontSize='16px' className='shrink-0' size='sm' type='submit'>
            Search
          </Button>
        </form>
      </div>
    </LocalizationProvider>
  );
}
