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
        field: 'customerId',
        headerName: 'Customer ID',
        flex: 1,
        renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      },
      {
        field: 'customerProfileUrl',
        headerName: 'Customer Profile',
        flex: 0.7,
        renderCell: (params) => {
          console.log('params', params.value);
          return <img height={50} width={100} style={{ maxWidth: '100%' }} src={params.value} />;
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
            {params.value ? moment(params.value).format('HH:mm:ss') : ''}
          </span>
        ),
      },
      {
        field: 'endTime',
        headerName: 'End Time',
        flex: 0.7,
        renderCell: (params) => (
          <span className='text-sm text-gray-700 dark:text-gray-300'>{moment(params.value).format('HH:mm:ss')}</span>
        ),
      },
      {
        field: 'waittingTime',
        headerName: 'Waitting Time',
        flex: 0.7,
        renderCell: (params) => {
          const ms = params.value && params.row?.timeStatus;

          const colorStatus = ms === 'green' ? 'success' : ms === 'yellow' ? 'warning' : 'error';
          if (ms) {
            return (
              <span className='text-sm text-gray-700 dark:text-gray-300'>
                {' '}
                <CustomChip label='' color={colorStatus} variant='outlined' />
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
          const severity = params.value === 'green' ? 'success' : params.value === 'yellow' ? 'warning' : 'error';
          const content = params.value === 'green' ? 'Recieved' : params.value === 'yellow' ? 'Waitting' : 'Pending';

          return (
            <Alert sx={{ width: '100%' }} severity={severity}>
              {content}
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
