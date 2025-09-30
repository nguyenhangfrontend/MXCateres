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
import { set } from 'lodash';

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

export default function SearchForm({ getDataFrame, getDataSearch, getStatus }: SearchFormPropsType) {
  const [trigergetFrameConfigBycamera, data] = useLazyGetFrameConfigBycameraQuery();

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

  const camera_id = watch('camera_id');
  const zone_name = watch('zone_name');

  useEffect(() => {
    if (camera_id) {
      trigergetFrameConfigBycamera({ camera_id: camera_id });
    }
  }, [camera_id]);

  useEffect(() => {
    const dataSearch = {
      camera_id: camera_id,
      zone_name: zone_name,
    };

    getDataSearch(dataSearch);
  }, [camera_id, zone_name]);

  useEffect(() => {
    if (data?.data) {
      getDataFrame(data?.data);
    }
    getStatus(data?.status);
  }, [data]);

  const changeCamera = (event: any) => {
    // setValue('camera_id', event.target.value);
    const zone = event.target.value === 'cam1' ? 'order' : 'pickup';
    setValue('zone_name', zone); // reset zone when camera changes
    trigergetFrameConfigBycamera({ camera_id: event.target.value });
  };

  const changeZone = (event: any) => {
    // setValue('zone_name', event.target.value);
    console.log(event.target.value, 'event.target.value');
    console.log(zone_name, 'zone_name');
    if (zone_name) {
      const cameraId = event.target.value === 'order' ? 'cam1' : 'cam2';
      setValue('camera_id', cameraId);
      trigergetFrameConfigBycamera({ camera_id: cameraId });
    }
  };

  // const onSubmit: SubmitHandler<SearchFormType> = (data) => console.log(data);
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
                  <InputLabel id='camera_id-label'>Select Camera</InputLabel>
                  <Select
                    labelId='camera_id-label'
                    id='camera_id'
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // update RHF internal state
                      changeCamera(e); // your custom logic
                    }}
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
                    // disabled
                    value={field.value ?? ''} // 👈 controlled by RHF
                    onChange={(e) => {
                      field.onChange(e); // update RHF internal state
                      changeZone(e); // your custom logic
                    }}
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
