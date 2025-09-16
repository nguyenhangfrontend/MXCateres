import { useEffect, useState } from 'react';
import Button from '@components/ui/button/Button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLoginMutation } from '@/api-request/Auth.api';
import { SearchFormPropsType, SearchFormType } from './types';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { cameraList, defaultSearchValue, zoneList } from './constant';
import { useLazyGetFrameConfigBycameraQuery } from 'src/src/api-request/Setting.api';

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

export default function SearchForm({ getDataFrame }: SearchFormPropsType) {
  const [trigergetFrameConfigBycamera, { data }] = useLazyGetFrameConfigBycameraQuery();

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SearchFormType>({
    mode: 'onChange',
    defaultValues: {
      ...defaultSearchValue,
    },
  });

  const cameraId = watch('camera_id');
  useEffect(() => {
    // console.log('cameraId', cameraId);
    if (cameraId) {
      trigergetFrameConfigBycamera({ camera_id: cameraId });
    }
  }, [cameraId]);

  useEffect(() => {
    if (data) {
      getDataFrame(data);
      if (data?.zone_name) {
        // console.log('data?.zone_name', data?.zone_name);
        setValue('zone_name', data?.zone_name); // ✅ update form value
      }
    }
  }, [data, setValue]);

  // const [isChecked, setIsChecked] = useState(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='flex'>
        <form className='flex items-end gap-4'>
          {/* From */}

          <Controller
            name='camera_id'
            control={control}
            defaultValue={'1'}
            render={({ field }) => {
              // console.log('field', field);
              return (
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id='cameraId-label'>Select Camera</InputLabel>
                  <Select
                    labelId='cameraId-label'
                    id='cameraId'
                    value={field.value}
                    onChange={field.onChange}
                    input={<OutlinedInput label='Select Camera' />} // 👈 label passed here
                    MenuProps={MenuProps}
                  >
                    {cameraList.map((camera) => (
                      <MenuItem key={camera.key} value={camera.key}>
                        {camera.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
          />
          <Controller
            name='zone_name'
            control={control}
            render={({ field }) => {
              // console.log('field', field);
              return (
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id='zone-label'>Zone</InputLabel>
                  <Select
                    labelId='zone-label'
                    id='zone'
                    value={field.value ?? ''} // 👈 controlled by RHF
                    onChange={field.onChange}
                    input={<OutlinedInput label='Select Zone' />}
                    MenuProps={MenuProps}
                  >
                    {zoneList.map((zone) => (
                      <MenuItem key={zone.key} value={zone.key}>
                        {zone.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
          />
        </form>
      </div>
    </LocalizationProvider>
  );
}
