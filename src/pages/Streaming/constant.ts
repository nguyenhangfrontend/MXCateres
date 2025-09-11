import { CustomerInfoType } from 'src/src/pages/WaitingTime/customerInfo/type';
import dayjs from 'dayjs';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from 'src/src/components/ui/pagination/const';

export const defaultPagination = {
  total: 0,
  rowsPerPage: DEFAULT_ROWS_PER_PAGE,
  page: DEFAULT_PAGE,
};
export const defaultSearchValue = {
  camera_id: "1",

};
export const zoneList = [
  { key: "order", value: 'Order' },
  { key: "pickup", value: 'Pickup' },
];
export const cameraList = [
  { key: "1", value: 'Camera 1' },
  { key: "2", value: 'Camera 2' },
];
export const orderStatus = [
  { key: 'pending', value: 'Pending' },
  { key: 'ordered', value: 'Ordered' },
  { key: 'picking-up', value: 'Picking-up' },
  { key: 'completed', value: 'Completed' },
  { key: 'left', value: 'Left' },
];
export const timeStatuses = [
  { key: 'fast', value: 'Fast ' },
  { key: 'medium', value: 'Medium' },
  { key: 'slow', value: 'Slow' },
];
export const defaultDataCustomer: CustomerInfoType = {
  customerId: '',
  lastSeenAt: '',
  startTime: '',
  parts: [],
  fullbodyUrl: '',
  zones: [],
  totalDuration: '',
  processingDuration: '',
  status: '',
  isLeft: false,
  evidents: [],
};

export const dataFrameDefault = {
  camera_id: '',
  zone_name: '',
  points: [
  ],
  frame_base64: ''
};
