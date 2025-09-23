import { CommonImageType } from 'src/src/common/type';
export type CustomerEnvidencesType = {
  imageUrl: string;
  label: string;
  capturedAt: string;
};

export type CustomerInfoType = {
  camera: string;
  customerId: string;
  customerName: string;
  customerProfileUrl: string;
  endTime: string;
  id: number;
  isLeft: boolean;
  startTime: string;
  status: string;
  timeStatus: string;
  waitingTime: string;
  fullbodyUrl?: string;
  lastSeenAt?: string
};

export type ZoneDetailCustomer = {
  zone: string;
  start: string;
  end: string;
  duration: 0;
};

export type PartUserInfoType = {
  capturedAt: string;
  type: string;
  color: string;
  imageUrl: string;
};
export type WaitingTimeDetailResponse = {
  data: CustomerInfoType;
  status: string;
};
export type CustomerDetailResponse = {
  dataCustomerDetail: CustomerInfoType;
  status: string;
};
