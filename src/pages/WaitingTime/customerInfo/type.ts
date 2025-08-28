import { CommonImageType } from 'src/src/common/type';
export type CustomerEnvidencesType = {
  imageUrl: string;
  label: string;
  capturedAt: string;
};

export type CustomerInfoType = {
  fullbodyUrl: string;
  customerId: string;
  totalDuration: string;
  processingDuration: string;
  status: string;
  zones: ZoneDetailCustomer[];
  evidents: CustomerEnvidencesType[];
  lastSeenAt: string;
  parts: PartsBodyType[];
  startTime: string;
};

export type PartsBodyType = {
  type: string;
  imageUrl: string;
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
