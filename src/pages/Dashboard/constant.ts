import { CustomerInfoType } from 'src/src/pages/WaitingTime/customerInfo/type';

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
  { key: 'complete', value: 'Complete ' },
];
export const timeStatuses = [
  { key: 'green', value: 'Fast ' },
  { key: 'yellow', value: 'Medium' },
  { key: 'red', value: 'Slow' },
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
  evidents: [],
};

// src/data/mockEcommerceData.ts
export const mockEcommerceData = {
  totalCustomer: 3782,
  totalOrders: 5359,
  leaveCustomers: 129,
  waitingTimeAverage: 20,
  orderStatusChart: { fast: 60, medium: 25, slow: 15 },
  customerChart: [
    { period: '2025-08-28', value: 24 },
    { period: '2025-08-29', value: 70 },
    { period: '2025-08-30', value: 25 },
    { period: '2025-08-31', value: 28 },
    { period: '2025-09-01', value: 22 },
    { period: '2025-09-02', value: 18 },
    { period: '2025-09-03', value: 20 },
    { period: '2025-09-04', value: 27 },
    { period: '2025-09-05', value: 50 },
    { period: '2025-09-06', value: 32 },
    { period: '2025-09-07', value: 29 },
    { period: '2025-09-08', value: 21 },
    { period: '2025-09-09', value: 17 },
    { period: '2025-09-10', value: 15 },
    { period: '2025-09-11', value: 12 },
  ],
  waitingTimeChart: [
    { period: '2025-08-28', value: 24 },
    { period: '2025-08-29', value: 70 },
    { period: '2025-08-30', value: 25 },
    { period: '2025-08-31', value: 28 },
    { period: '2025-09-01', value: 22 },
    { period: '2025-09-02', value: 18 },
    { period: '2025-09-03', value: 20 },
    { period: '2025-09-04', value: 27 },
    { period: '2025-09-05', value: 50 },
    { period: '2025-09-06', value: 32 },
    { period: '2025-09-07', value: 29 },
    { period: '2025-09-08', value: 21 },
    { period: '2025-09-09', value: 17 },
    { period: '2025-09-10', value: 15 },
    { period: '2025-09-11', value: 12 },
  ],
};
