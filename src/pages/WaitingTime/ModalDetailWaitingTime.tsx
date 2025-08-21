// ModalDetailWaitingTime.tsx
import React, { useEffect, useMemo } from 'react';
import { Button, Typography } from '@mui/material';
import { Modal } from '@/components/ui/modal';
import ComponentCard from '@/components/common/ComponentCard';
import { WaitingTimeDataType } from './types';
import EnvidentFrameDetail from '@/components/envidentFrame';

interface ModalDetailWaitingTimeProps {
  isOpen: boolean;
  onClose: () => void;
  data: WaitingTimeDataType | undefined;
}

const ModalDetailWaitingTime: React.FC<ModalDetailWaitingTimeProps> = ({ isOpen, onClose, data }) => {
  // const frameRatio = useMemo(() => {
  //   return mapFrameToParent(data);
  // }, [data]);

  // function mapFrameToParent(data: any) {
  //   const { realImgW, realImgH, parentW, parentH, frame } = data;
  //   let scaleX: any;
  //   let scaleY: any,
  //     offsetX = 0,
  //     offsetY = 0;

  //   // contain
  //   const scale = Math.min(parentW / realImgW, parentH / realImgH);
  //   scaleX = scaleY = scale;
  //   offsetX = (parentW - realImgW * scale) / 2;
  //   offsetY = (parentH - realImgH * scale) / 2;

  //   return {
  //     x: frame.x * scaleX + offsetX,
  //     y: frame.y * scaleY + offsetY,
  //     w: frame.w * scaleX,
  //     h: frame.h * scaleY,
  //   };
  // }

  return (
    <Modal
      width='1024px'
      height='900px'
      isOpen={isOpen}
      onClose={onClose}
      isFullscreen={false}
      className='bg-white dark:bg-gray-900 width-[1200px]'
    >
      <ComponentCard title='Customer Info' className='mb-[20px]'>
        <Typography variant='h6' gutterBottom>
          Customer info content 🎉
        </Typography>
      </ComponentCard>

      <ComponentCard title='Envident Custommer Waiting'>
        <EnvidentFrameDetail envidenceData={data?.evidenceThumbnail} />
      </ComponentCard>
      <Button onClick={onClose} variant='outlined' color='primary' sx={{ mt: 2 }}>
        Close
      </Button>
    </Modal>
  );
};

export default ModalDetailWaitingTime;
