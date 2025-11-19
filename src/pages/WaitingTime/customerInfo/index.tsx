import ComponentCard from '@/components/common/ComponentCard';
import { CustomerInfoType, ZoneDetailCustomer } from './type';
import Slider from 'react-slick';
import { Card, CardContent, Typography, Dialog, DialogContent } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { defaultDataCustomer } from 'src/src/pages/WaitingTime/constant';
import { useLazyGetCustomerDetailQuery, useLazyGetWaitingTimeDetailQuery } from 'src/src/api-request/WattingTime.api';

type CustomerProps = {
  dataCustomer?: CustomerInfoType | undefined;
};
const imageUrl = import.meta.env.VITE_IMAGE_URL;

export default function CustomerInfoComponent({ dataCustomer }: CustomerProps) {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [dataCustomerFull, setDataCustomerFull] = useState<any>(defaultDataCustomer);

  // ✅ lazy queries
  const [triggerCustomer, { data: customerData }] = useLazyGetCustomerDetailQuery();
  const [triggerWaiting, { data: waitingData }] = useLazyGetWaitingTimeDetailQuery();

  // console.log('dataCustomer', dataCustomer);

  // ✅ trigger API calls when customerId changes
  useEffect(() => {
    if (!dataCustomer?.customerId) return;

    triggerCustomer({ id: dataCustomer?.customerId });
    const time = dataCustomer.startTime ? dataCustomer.startTime : dataCustomer.endTime;
    triggerWaiting({
      customerId: dataCustomer?.customerId,
      date: moment(time).format('YYYY-MM-DD'),
    });
  }, [dataCustomer?.customerId, triggerCustomer, triggerWaiting]);

  // ✅ merge API results
  useEffect(() => {
    if (customerData || waitingData) {
      setDataCustomerFull({
        ...(customerData?.dataCustomerDetail ?? {}),
        ...(waitingData?.data ?? {}),
      });
    }
  }, [customerData, waitingData]);
  // console.log('customerData', customerData);
  // console.log('customerData', customerData);

  const handleOpen = (imgUrl: string) => {
    setSelectedImg(imgUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImg(null);
  };

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
            src={`${imageUrl}${dataCustomerFull?.fullbodyUrl}`}
          />
        </ComponentCard>

        {/* Customer Info */}
        <ComponentCard title='Customer Info' className='col-span-2'>
          <div className='item-customer flex justify-between items-center'>
            <span>Customer Name:</span>
            <span>{dataCustomerFull?.customerName}</span>
          </div>
          {dataCustomerFull?.isLeft ? (
            <>
              <div className='item-customer flex justify-between items-center'>
                <span>Last Status:</span>
                <span>{dataCustomerFull?.status}</span>
              </div>

              <div className='item-customer flex justify-between items-center'>
                <span>Current Status:</span>
                <span>Left</span>
              </div>
            </>
          ) : (
            <div className='item-customer flex justify-between items-center'>
              <span>Current Status:</span>
              <span>{dataCustomerFull?.status}</span>
            </div>
          )}
          <div className='item-customer flex justify-between items-center'>
            <span>Total Waiting Time: </span>
            <span>{dataCustomerFull?.totalDuration}</span>
          </div>
          {/* <div className='item-customer flex justify-between items-center'>
            <span>Last Seen At: </span>
            <span>{moment(dataCustomerFull?.lastSeenAt).format('HH:mm')}</span>
          </div> */}

          {/* Zone Info */}
          <div className='customer-wrapper grid grid-cols-2 gap-4'>
            {(dataCustomerFull?.zones || []).map((item: ZoneDetailCustomer) => (
              <ComponentCard key={item.zone} title={item.zone}>
                <div className='item-customer flex justify-between items-center'>
                  <span>{`Start ${item.zone}:`}</span>
                  <span>{item.start ? moment(item.start).format('HH:mm:ss') : ''}</span>
                </div>
                <div className='item-customer flex justify-between items-center'>
                  <span>{`Finished ${item.zone}:`}</span>
                  <span>{item?.end ? moment(item?.end).format('HH:mm:ss') : ''}</span>
                </div>
                <div className='item-customer flex justify-between items-center'>
                  <span>{`Duration:`}</span>
                  <span>{item?.duration}</span>
                </div>
              </ComponentCard>
            ))}
          </div>
          {/* Staff Analysis */}
          <ComponentCard title='Waiter/waitress analysis'>
            <ul className='list-disc pl-6'>
              <li>waiter/waitress: _</li>
              <li>Compare to average in a shift: _</li>
            </ul>
          </ComponentCard>
        </ComponentCard>
      </div>

      {/* Parts Evidence */}
      {/* <ComponentCard title='Parts body Envidences'>
        <CardContent>
          <div className='slider-container'>
            <Slider {...settingsPartSlider}>
              {dataCustomerFull?.parts?.map((item: any, index: number) => (
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

      {/* Timeline Evidence */}
      <ComponentCard title='Timeline Envidences'>
        <CardContent>
          <div className='slider-container'>
            <Slider {...settings}>
              {dataCustomerFull?.evidents?.map((item: any, index: number) => (
                <div key={`timeline-${index}`} className='p-[10px]'>
                  <div className='relative' onDoubleClick={() => handleOpen(item.imageUrl)}>
                    <img
                      src={`${imageUrl}${item.imageUrl}`}
                      height={300}
                      className='max-h-[501px] object-contain w-full self-start'
                      style={{ height: '500px' }}
                    />
                    <div className='absolute bottom-0 w-full bg-black/50 text-white p-2 text-sm flex justify-between items-center'>
                      <div>{item.label}</div>
                      <div>{moment(item.capturedAt).format('HH:mm')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Zoom Modal */}
          <Dialog open={open} onClose={handleClose} maxWidth='lg'>
            <DialogContent className='p-0'>
              {selectedImg && (
                <img
                  src={`${imageUrl}${selectedImg}`}
                  alt='zoomed'
                  className='w-full h-auto max-h-[90vh] object-contain'
                />
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </ComponentCard>
    </div>
  );
}
