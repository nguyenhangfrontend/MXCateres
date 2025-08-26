// ModalDetailWaitingTime.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Modal } from '@/components/ui/modal';
import ComponentCard from '@/components/common/ComponentCard';
import { WaitingTimeDataType } from './types';
import EnvidentFrameDetail from '@/components/envidentFrame';
import CustomerInfoComponent from '@/components/customerInfo';
import { CustomerInfoType } from '@/components/customerInfo/type';
import { defaultDataCustomer } from './constant';

interface ModalDetailWaitingTimeProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ModalDetailWaitingTime: React.FC<ModalDetailWaitingTimeProps> = ({ isOpen, onClose, data }) => {
  const [dataCustomer, setDataCustomer] = useState<CustomerInfoType>(defaultDataCustomer);

  // useEffect(() => {
  //   setDataCustomer(data)
  // }, [data?.customerId]);

  return (
    <Modal
      width='1024px'
      height='1200px'
      isOpen={isOpen}
      onClose={onClose}
      isFullscreen={false}
      className='bg-white dark:bg-gray-900 width-[1200px]'
    >
      <div className='mb-[15px]'>
        <CustomerInfoComponent dataCustomer={data} />
      </div>
      <Button onClick={onClose} variant='outlined' color='primary' sx={{ mt: 2 }}>
        Close
      </Button>
    </Modal>
  );
};

export default ModalDetailWaitingTime;
