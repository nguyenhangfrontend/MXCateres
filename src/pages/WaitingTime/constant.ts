import { CustomerInfoType } from 'src/src/pages/WaitingTime/customerInfo/type';
import { WaitingTimeDataType } from './types';
import dayjs from 'dayjs';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from 'src/src/components/ui/pagination/const';

export const defaultPagination = {
  total: 0,
  rowsPerPage: DEFAULT_ROWS_PER_PAGE,
  page: DEFAULT_PAGE,
  rowPerPage: 10,
};
export const defaultSearchValue = {
  from: dayjs().startOf('day'),
  to: dayjs().endOf('day'),
  workingShift: [],
  statuses: [],
  timeStatuses: [],
};
export const workingShift = [
  { key: 1, value: '8:00 - 12:00' },
  { key: 2, value: '12:00 - 18:00' },
  { key: 3, value: '18:00 - 23:00' },
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
  fullbodyUrl: '',
  zones: [],
  totalDuration: '',
  processingDuration: '',
  isLeft: false,
  status: '',
  evidents: [],
};
