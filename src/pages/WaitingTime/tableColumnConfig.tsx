import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { ColumnType, WaitingTimeDataType } from './types';
import moment from 'moment';
import Button from '@/components/ui/button/Button';

export function useColumns({ detailWaitingTime }: ColumnType) {
  const columns: GridColDef<WaitingTimeDataType>[] = useMemo(
    () => [
      {
        field: 'waitingTimeId',
        headerName: 'Waiting Time ID',
        flex: 1.5,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      },
      {
        field: 'customerId',
        headerName: 'Customer ID',
        flex: 1,
        renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      },
      {
        field: 'cameraId',
        headerName: 'Camera ID',
        flex: 1,
        renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
        // renderCell: (params) => (
        //   <AvatarGroup max={4}>
        //     {params.value.images.map((img: string, i: number) => (
        //       <Avatar key={i} src={img} alt={`Team member ${i + 1}`} />
        //     ))}
        //   </AvatarGroup>
        // ),
      },
      {
        field: 'Zone',
        headerName: 'zone',
        flex: 1,
        renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      },
      {
        field: 'startTime',
        headerName: 'Start Time',
        flex: 0.7,
        renderCell: (params) => (
          <span className='text-sm text-gray-700 dark:text-gray-300'>{moment(params.value).format('mm:ss')}</span>
        ),
      },
      {
        field: 'endTime',
        headerName: 'End Time',
        flex: 0.7,
        renderCell: (params) => (
          <span className='text-sm text-gray-700 dark:text-gray-300'>{moment(params.value).format('mm:ss')}</span>
        ),
      },
      {
        field: 'duration',
        headerName: 'Duration',
        flex: 0.7,
        renderCell: (params) => <span className='text-sm text-gray-700 dark:text-gray-300'>{params.value}</span>,
      },
      {
        field: 'evidence',
        headerName: 'Evidence',
        flex: 0.7,
        renderCell: (params) => <img src={params.row?.evidenceThumbnail?.imageUrl} />,
      },
      {
        field: 'action',
        headerName: 'View Detail',
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
