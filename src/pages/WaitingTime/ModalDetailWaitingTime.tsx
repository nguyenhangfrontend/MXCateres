// ModalDetailWaitingTime.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Modal } from '@/components/ui/modal';
import CustomerInfoComponent from 'src/src/pages/WaitingTime/customerInfo';

interface ModalDetailWaitingTimeProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const ModalDetailWaitingTime: React.FC<ModalDetailWaitingTimeProps> = ({ isOpen, onClose, data }) => {

  // useEffect(() => {
  //   setDataCustomer(data)
  // }, [data?.customerId]);

  return (
    <Modal
      width='1024px'
      height='900px'
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
