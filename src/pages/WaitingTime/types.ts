export type WaitingTimeDataType = {
  id: number;
  waitingTimeId: string;
  date: string;
  customerId: string;
  cameraId: string;
  startTime: string;
  endTime: string;
  evidenceThumbnail: envidenceType;
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

export type ColumnType = {
  detailWaitingTime: (data: any) => void;
};
