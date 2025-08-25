import { CustomerInfoType } from 'src/src/components/customerInfo/type';
import { WaitingTimeDataType } from './types';
import dayjs from 'dayjs';
export const defaultSearchValue = {
  from: dayjs().startOf('day'),
  to: dayjs().endOf('day'),
  workingShift: [],
  status: [],
};
export const workingShift = [
  { key: 1, value: '8:00 - 12:00' },
  { key: 2, value: '12:00 - 18:00' },
  { key: 3, value: '18:00 - 23:00' },
];
export const orderStatus = [
  { key: 1, value: 'Recieved' },
  { key: 2, value: 'Watting' },
  { key: 3, value: 'No order' },
];
export const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
export const defaultDataCustomer: CustomerInfoType = {
  customerId: 'CUST_123456',
  lastSeenAt: 'Mon Jan 15 2024 03:30:00 GMT+0000',
  parts: [
    {
      type: 'top',
      imageUrl: 'https://www.lockhatters.com/cdn/shop/files/town-coke_1200x.jpg?v=1744018963',
    },
    {
      type: 'bottom',
      imageUrl:
        'https://dynamic.zacdn.com/5FqlqIpBmS7bUtdJyESm37oIZ74=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/trendyshop-8979-1765563-2.jpg',
    },
    {
      type: 'top',
      imageUrl: 'https://www.lockhatters.com/cdn/shop/files/town-coke_1200x.jpg?v=1744018963',
    },
    {
      type: 'bottom',
      imageUrl:
        'https://dynamic.zacdn.com/5FqlqIpBmS7bUtdJyESm37oIZ74=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/trendyshop-8979-1765563-2.jpg',
    },
    {
      type: 'top',
      imageUrl: 'https://www.lockhatters.com/cdn/shop/files/town-coke_1200x.jpg?v=1744018963',
    },
    {
      type: 'bottom',
      imageUrl:
        'https://dynamic.zacdn.com/5FqlqIpBmS7bUtdJyESm37oIZ74=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/trendyshop-8979-1765563-2.jpg',
    },
  ],
  fullbodyUrl:
    'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
  zones: [
    {
      zone: 'order',
      duration: 0,
      start: '2025-08-14T04:15:00.000Z',
      end: '2025-08-14T04:15:00.000Z',
    },
    {
      zone: 'pickup',
      start: '2025-08-14T04:15:00.000Z',
      end: '2025-08-14T04:15:00.000Z',
      duration: 0,
    },
  ],
  totalDuration: '0 minutes',
  processingDuration: '0 minutes',
  status: 'Picking Up',
  evidents: [
    {
      imageUrl:
        'https://www.thesun.co.uk/wp-content/uploads/2024/01/2014-u-k-services-companies-830630811.jpg?strip=all&w=960',
      capturedAt: '2025-08-14T04:15:00.000Z',
      label: 'Pickup Start',
    },
    {
      imageUrl:
        'https://www.allrecipes.com/thmb/gkOFZOTGMgF0gQOkW7pMq2jDGHY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Starbucks-Cup-Barista-3x2-1-7f08baa3c98347dcabb06358dbe030a1.jpg',
      capturedAt: '2025-08-14T04:15:00.000Z',
      label: 'Pickup End',
    },
    {
      imageUrl: 'https://about.starbucks.com/uploads/2021/04/SBX20210405-Greener-Cup-Timeline-Feature.jpg',
      capturedAt: '2025-08-14T04:15:00.000Z',
      label: 'Recieved Start',
    },
    {
      imageUrl: 'https://i.insider.com/5f68b70057b7da001ee12c18?width=1000&format=jpeg&auto=webp',
      capturedAt: '2025-08-14T04:15:00.000Z',
      label: 'Recived End',
    },
  ],
};

export const tableData: WaitingTimeDataType[] = [
  {
    id: 1,
    waitingTimeId: '68a5d82cc01a04b67c84f688',
    date: '2024-01-15T10:30:00.000Z',
    customerId: 'CUST001',
    cameraId: 'CAM-1',
    startTime: 'Mon Jan 15 2024 10:30:00 GMT+0000 (Coordinated Universal Time)',
    endTime: 'Mon Jan 15 2024 10:35:30 GMT+0000 (Coordinated Universal Time)',
    status: 1,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1920,
      height: 1080,
      frames: [
        {
          x: 100,
          y: 200,
          w: 150,
          h: 300,
          label: 'robot',
          confidence: 0.95,
        },
      ],
      capturedAt: '2024-01-15T10:30:00.000Z',
    },
  },
  {
    id: 2,
    waitingTimeId: '68a5d82cc01a04b67c84f689',
    date: '2024-01-16T11:00:00.000Z',
    customerId: 'CUST002',
    cameraId: 'CAM-2',
    startTime: '2025-08-22 10:00:00',
    endTime: '2025-08-22 10:12:00',
    status: 2,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1920,
      height: 1080,
      frames: [
        {
          x: 120,
          y: 220,
          w: 180,
          h: 280,
          label: 'person',
          confidence: 0.9,
        },
      ],
      capturedAt: '2024-01-16T11:00:00.000Z',
    },
  },
  {
    id: 3,
    waitingTimeId: '68a5d82cc01a04b67c84f690',
    date: '2024-01-17T09:45:00.000Z',
    customerId: 'CUST003',
    cameraId: 'CAM-3',
    startTime: 'Wed Jan 17 2024 09:45:00 GMT+0000 (Coordinated Universal Time)',
    endTime: 'Wed Jan 17 2024 09:52:10 GMT+0000 (Coordinated Universal Time)',
    status: 3,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1280,
      height: 720,
      frames: [
        {
          x: 90,
          y: 150,
          w: 200,
          h: 320,
          label: 'car',
          confidence: 0.85,
        },
      ],
      capturedAt: '2024-01-17T09:45:00.000Z',
    },
  },
  {
    id: 4,
    waitingTimeId: '68a5d82cc01a04b67c84f691',
    date: '2024-01-18T14:20:00.000Z',
    customerId: 'CUST004',
    cameraId: 'CAM-4',
    startTime: 'Thu Jan 18 2024 14:20:00 GMT+0000 (Coordinated Universal Time)',
    endTime: 'Thu Jan 18 2024 14:25:40 GMT+0000 (Coordinated Universal Time)',
    status: 3,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1920,
      height: 1080,
      frames: [
        {
          x: 80,
          y: 100,
          w: 160,
          h: 200,
          label: 'truck',
          confidence: 0.92,
        },
      ],
      capturedAt: '2024-01-18T14:20:00.000Z',
    },
  },
  {
    id: 5,
    waitingTimeId: '68a5d82cc01a04b67c84f692',
    date: '2024-01-19T12:15:00.000Z',
    customerId: 'CUST005',
    cameraId: 'CAM-5',
    startTime: '2025-08-22 10:00:00',
    endTime: '2025-08-22 10:25:00',
    status: 2,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1920,
      height: 1080,
      frames: [
        {
          x: 110,
          y: 170,
          w: 140,
          h: 260,
          label: 'bicycle',
          confidence: 0.88,
        },
      ],
      capturedAt: '2024-01-19T12:15:00.000Z',
    },
  },
  {
    id: 6,
    waitingTimeId: '68a5d82cc01a04b67c84f693',
    date: '2024-01-20T08:40:00.000Z',
    customerId: 'CUST006',
    cameraId: 'CAM-6',
    startTime: 'Sat Jan 20 2024 08:40:00 GMT+0000 (Coordinated Universal Time)',
    endTime: 'Sat Jan 20 2024 08:45:55 GMT+0000 (Coordinated Universal Time)',
    status: 1,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1280,
      height: 720,
      frames: [
        {
          x: 95,
          y: 190,
          w: 175,
          h: 290,
          label: 'dog',
          confidence: 0.93,
        },
      ],
      capturedAt: '2024-01-20T08:40:00.000Z',
    },
  },
  {
    id: 7,
    waitingTimeId: '68a5d82cc01a04b67c84f694',
    date: '2024-01-21T15:50:00.000Z',
    customerId: 'CUST007',
    cameraId: 'CAM-7',
    startTime: '2025-08-22 10:00:00',
    endTime: '2025-08-22 10:25:00',
    status: 2,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1920,
      height: 1080,
      frames: [
        {
          x: 130,
          y: 210,
          w: 160,
          h: 240,
          label: 'cat',
          confidence: 0.89,
        },
      ],
      capturedAt: '2024-01-21T15:50:00.000Z',
    },
  },
  {
    id: 8,
    waitingTimeId: '68a5d82cc01a04b67c84f695',
    date: '2024-01-22T10:10:00.000Z',
    customerId: 'CUST008',
    cameraId: 'CAM-8',
    startTime: 'Mon Jan 22 2024 10:10:00 GMT+0000 (Coordinated Universal Time)',
    endTime: 'Mon Jan 22 2024 10:15:35 GMT+0000 (Coordinated Universal Time)',
    status: 3,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1920,
      height: 1080,
      frames: [
        {
          x: 85,
          y: 145,
          w: 150,
          h: 250,
          label: 'person',
          confidence: 0.91,
        },
      ],
      capturedAt: '2024-01-22T10:10:00.000Z',
    },
  },
  {
    id: 9,
    waitingTimeId: '68a5d82cc01a04b67c84f696',
    date: '2024-01-23T13:30:00.000Z',
    customerId: 'CUST009',
    cameraId: 'CAM-9',
    startTime: '2025-08-22 10:00:00',
    endTime: '2025-08-22 10:25:00',
    status: 1,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1920,
      height: 1080,
      frames: [
        {
          x: 75,
          y: 130,
          w: 170,
          h: 270,
          label: 'robot',
          confidence: 0.96,
        },
      ],
      capturedAt: '2024-01-23T13:30:00.000Z',
    },
  },
  {
    id: 10,
    waitingTimeId: '68a5d82cc01a04b67c84f697',
    date: '2024-01-24T09:00:00.000Z',
    customerId: 'CUST010',
    cameraId: 'CAM-10',
    startTime: '2025-08-22 10:00:00',
    endTime: '2025-08-22 10:12:00',
    status: 1,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1280,
      height: 720,
      frames: [
        {
          x: 105,
          y: 160,
          w: 160,
          h: 220,
          label: 'truck',
          confidence: 0.87,
        },
      ],
      capturedAt: '2024-01-24T09:00:00.000Z',
    },
  },
  {
    id: 11,
    waitingTimeId: '68a5d82cc01a04b67c84f698',
    date: '2024-01-25T16:10:00.000Z',
    customerId: 'CUST011',
    cameraId: 'CAM-11',
    startTime: '2025-08-22 10:00:00',
    endTime: '2025-08-22 10:12:00',
    status: 1,
    IdentificationPhoto:
      'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
    evidenceThumbnail: {
      imageUrl:
        'https://media.istockphoto.com/id/1135773946/photo/full-length-portrait-of-young-man-standing-on-white-background.jpg?s=612x612&w=0&k=20&c=1xRxIgrFYHBrQ5K4QcfKresPqbOOt8K3UcnkEAgz4SU=',
      width: 1920,
      height: 1080,
      frames: [
        {
          x: 115,
          y: 185,
          w: 150,
          h: 230,
          label: 'person',
          confidence: 0.94,
        },
      ],
      capturedAt: '2024-01-25T16:10:00.000Z',
    },
  },
  // ... total 30 records
];
