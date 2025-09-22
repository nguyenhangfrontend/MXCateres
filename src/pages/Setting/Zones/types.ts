import { Dayjs } from 'dayjs';
import { PaginationType } from '@/components/ui/pagination/type';

export type UserType = {
  id: number;
  customerId: string;
  evidenceThumbnail: string;
  lastSeenAt: string;
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
  zone_name?: string;
  camera_id: string;
}
export interface dataFrameFromCamera {
  camera_id: string;
  zone_name: string;
  points: number[][];
  frame_base64: string;
}

export type SearchFormTypeParams = {
  from: string | null;
  to: string | null;
  workingShift: (string | number)[];
  statuses: string[];
  timeStatuses: string[];
};

export type ColumnType = {
  detailCustomer: (data: any) => void;
};

export type SearchFormPropsType = {
  getDataFrame: (values: any) => void;
  getDataSearch: (values: any) => void;
  getStatus: (status: any) => void;
};

export interface UserListResponse {
  records: UserType[];
  status: string;
  pagination: PaginationType;
}

export type CustomerDetailTypeParams = {
  id: string;
};
