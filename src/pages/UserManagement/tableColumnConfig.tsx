import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { ColumnType, UserType } from './types';
import moment from 'moment';
import Button from '@/components/ui/button/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';
import { Alert } from '@mui/material';
import { width } from '@mui/system';
const CustomChip = styled(Chip)(() => ({
  '&.MuiChip-outlinedSuccess': {
    backgroundColor: '#f6ffed',
  },
  '&.MuiChip-outlinedWarning': {
    backgroundColor: '#fffbe6',
  },
  '&.MuiChip-outlinedError': {
    backgroundColor: '#fff1f0',
  },
}));

export function useColumns({ detailCustomer }: ColumnType) {
  const columns: GridColDef<UserType>[] = useMemo(
    () => [
      // {
      //   field: 'waitingTimeId',
      //   headerName: 'Waiting Time ID',
      //   flex: 1.5,
      //   align: 'center',
      //   headerAlign: 'center',
      //   renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      // },
      {
        field: 'customerId',
        headerName: 'Customer ID',
        flex: 1,
        renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      },
      {
        field: 'evidenceThumbnail',
        headerName: 'Customer Profile',
        flex: 0.7,
        renderCell: (params) => {
          console.log('params', params.value);
          return (
            <div className='flex self-start max-w-full'>
              <img src={params.value} alt='preview' className='max-w-full self-start' width={100} height={50} />
            </div>
          );
        },
      },
      // {
      //   field: 'cameraId',
      //   headerName: 'Camera ID',
      //   flex: 1,
      //   renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      // },

      {
        field: 'lastSeenAt',
        headerName: 'Last Seen At',
        flex: 0.7,
        renderCell: (params) => (
          <span className='text-sm text-gray-700 dark:text-gray-300'>
            {params.value ? moment(params.value).format('DD/MM/YYYY HH:mm:ss') : ''}
          </span>
        ),
      },

      {
        field: 'action',
        headerName: 'Action',
        flex: 0.7,
        renderCell: (params) => (
          <Button size='sm' onClick={() => detailCustomer(params.row)}>
            Detail
          </Button>
        ),
      },
    ],
    [],
  );

  return { columns };
}
