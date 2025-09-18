import ComponentCard from '@/components/common/ComponentCard';
import { CustomerInfoType, ZoneDetailCustomer } from './type';
import Slider from 'react-slick';
import { Card, CardContent, Typography, Dialog, DialogContent } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useLazyGetCustomerDetailQuery, useLazyGetWaitingTimeDetailQuery } from 'src/src/api-request/WattingTime.api';
import { defaultDataCustomer } from 'src/src/pages/WaitingTime/constant';

type CustomerProps = {
  dataCustomer?: CustomerInfoType | undefined;
};
const imageUrl = import.meta.env.VITE_IMAGE_URL;

export default function CustomerInfoComponent({ dataCustomer }: CustomerProps) {
  // ✅ lazy queries
  const [triggerCustomer, { data: customerData }] = useLazyGetCustomerDetailQuery();

  // console.log('dataCustomer', dataCustomer);

  // ✅ trigger API calls when customerId changes
  useEffect(() => {
    if (!dataCustomer?.id) return;

    triggerCustomer({ id: dataCustomer?.id });
  }, [dataCustomer?.id]);

  // ✅ merge API results
  // console.log('customerData', customerData);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <ArrowForwardIos />,
    prevArrow: <ArrowBackIos />,
  };

  const settingsPartSlider = { ...settings };
  // console.log('dataCustomer?.zones', dataCustomer?.zones);
  return (
    <div className='p-4 grid grid-cols-1 gap-4'>
      {/* Top Section */}
      <div className='grid grid-cols-3 gap-4'>
        {/* Avatar */}
        <ComponentCard className='grid grid-cols-1'>
          <img
            height={300}
            className='max-h-[501px] object-contain w-full self-start'
            style={{ height: '500px' }}
            src={`${imageUrl}${customerData?.dataCustomerDetail?.fullbodyUrl}`}
          />
        </ComponentCard>

        {/* Customer Info */}
        <ComponentCard title='Customer Info' className='col-span-2'>
          <div className='item-customer flex justify-between items-center'>
            <span>Customer Id:</span>
            <span>{customerData?.dataCustomerDetail?.customerId}</span>
          </div>

          <div className='item-customer flex justify-between items-center'>
            <span>Last Seen At: </span>
            <span>{moment.utc(customerData?.dataCustomerDetail?.lastSeenAt).format('HH:mm')}</span>
          </div>
        </ComponentCard>
      </div>

      {/* Parts Evidence */}
      {/* <ComponentCard title='Parts body Envidences'>
        <CardContent>
          <div className='slider-container'>
            <Slider {...settingsPartSlider}>
              {customerData?.dataCustomerDetail?.parts?.map((item: any, index: number) => (
                <div key={index} className='p-[10px]'>
                  <div className='relative'>
                    <img
                      src={`${imageUrl}${item.imageUrl}`}
                      className='w-full h-64 object-cover rounded-lg'
                      alt={item.type}
                    />
                    <div className='absolute bottom-0 w-full bg-black/50 text-white p-2 text-sm flex justify-between items-center'>
                      <div>{item.type}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </CardContent>
      </ComponentCard> */}
    </div>
  );
}
