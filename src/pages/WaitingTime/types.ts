import { Dayjs } from 'dayjs';
import { PaginationType } from '@/components/ui/pagination/type';

export type WaitingTimeDataType = {
  timeStatus: string;
  id: number;
  waitingTimeId: string;
  date: string;
  customerId: string;
  cameraId: string;
  startTime: string;
  endTime: string;
  evidenceThumbnail: envidenceType;
  customerProfileUrl: string;
  status: number;
};

export type envidenceType = {
  imageUrl: string;
  width: number;
  height: number;
  frames: frameDataType[];
  capturedAt: string;
};
export type frameDataType = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  confidence: number;
};

export interface SearchFormType {
  from: Dayjs | null;
  to: Dayjs | null;
  workingShift: (string | number)[];
  statuses: string[];
  timeStatuses: string[];
}
export type SearchFormTypeParams = {
  from: string | null;
  to: string | null;
  workingShift: (string | number)[];
  statuses: string[];
  timeStatuses: string[];
};

export type ColumnType = {
  detailWaitingTime: (data: any) => void;
};

export type SearchFormPropsType = {
  handleSearch: (values: SearchFormType) => void;
};

export interface WaitingTimeResponse {
  data: WaitingTimeDataType[];
  status: string;
  pagination: PaginationType;
}

export type WaitingTimeDetailTypeParams = {
  customerId: string;
  date: string;
};
export type CustomerDetailTypeParams = {
  id: string;
};
