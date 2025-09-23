import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { ColumnType, WaitingTimeDataType } from './types';
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

export function useColumns({ detailWaitingTime }: ColumnType) {
  const columns: GridColDef<WaitingTimeDataType>[] = useMemo(
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
        field: 'customerName',
        headerName: 'Customer Name',
        flex: 1,
        renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      },
      {
        field: 'customerProfileUrl',
        headerName: 'Customer Profile',
        flex: 0.7,
        renderCell: (params) => {
          // console.log('params', params.value);
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
        field: 'startTime',
        headerName: 'Start Time',
        flex: 0.7,
        renderCell: (params) => (
          <span className='text-sm text-gray-700 dark:text-gray-300'>
            {params.value ? moment(params.value).format('DD/MM/YYYY HH:mm:ss') : ''}
          </span>
        ),
      },
      {
        field: 'endTime',
        headerName: 'End Time',
        flex: 0.7,
        renderCell: (params) => (
          <span className='text-sm text-gray-700 dark:text-gray-300'>
            {moment(params.value).format('DD/MM/YYYY HH:mm:ss')}
          </span>
        ),
      },
      {
        field: 'waitingTime',
        headerName: 'Waitting Time',
        flex: 0.7,
        renderCell: (params) => {
          const ms = params.value && params.row?.timeStatus;

          const colorStatus = ms === 'fast' ? 'success' : ms === 'medium' ? 'warning' : 'error';
          if (ms) {
            return (
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                {' '}
                <CustomChip label={params.value} color={colorStatus} variant='outlined' />
              </span>
            );
          }
        },
      },
      {
        field: 'timeStatus',
        headerName: 'Time Order Status',
        flex: 0.7,
        minWidth: 150,
        renderCell: (params) => {
          const severity = params.value === 'fast' ? 'success' : params.value === 'medium' ? 'warning' : 'error';

          return (
            <Alert sx={{ width: '100%' }} severity={severity}>
              {params.value}
            </Alert>
          );
        },
      },
      {
        field: 'status',
        headerName: 'Order Status',
        flex: 0.7,
        minWidth: 150,
        renderCell: (params) => {
          const { value, row } = params;
          let bg = '#fee2e2'; // 🔴 default red background
          let color = '#991b1b'; // 🔴 default red text
          const label = row?.isLeft ? 'Left' : value;

          if (value === 'completed') {
            bg = '#dcfce7c4'; // light green
            color = '#166534'; // dark green
          } else if (value === 'ordered' || value === 'picking-up') {
            bg = '#dbeafe'; // light blue
            color = '#1e40af'; // dark blue
          } else if (value === 'pending' && (row?.timeStatus === 'medium' || row?.timeStatus === 'fast')) {
            bg = '#ffedd5'; // light orange
            color = '#9a3412'; // dark orange
          }

          return (
            <Alert
              icon={false}
              sx={{
                width: '100%',
                bgcolor: bg,
                color,
                fontWeight: 600,
                '& .MuiAlert-message': { width: '100%', textAlign: 'center' },
              }}
            >
              {label}
            </Alert>
          );
        },
      },

      {
        field: 'action',
        headerName: 'Action',
        flex: 0.7,
        renderCell: (params) => (
          <Button size='sm' onClick={() => detailWaitingTime(params.row)}>
            Detail
          </Button>
        ),
      },
    ],
    [],
  );

  return { columns };
}
