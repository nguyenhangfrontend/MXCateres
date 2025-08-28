import { Dayjs } from 'dayjs';

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

export type SearchFormPropsType = {
  handleSearch: (values: SearchFormType) => void;
};

export type WaitingTimeDetailTypeParams = {
  customerId: string;
  date: string;
};
export type CustomerDetailTypeParams = {
  id: string;
};
