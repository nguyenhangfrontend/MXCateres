import { CommonImageType } from 'src/src/common/type';

export type CustomerInfoType = {
  customerId: string;
  lastSeenAt: string;
  imageList: CommonImageType[];
};

export type PartUserInfoType = {
  type: string;
  color: string;
  imageUrl: string;
};
