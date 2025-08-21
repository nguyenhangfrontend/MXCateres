export type EvidenceFrameType = {
  imageUrl: string;
  width: number;
  height: number;
  frames: FrameUserType[];
};

export type FrameUserType = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  confidence: number;
};
