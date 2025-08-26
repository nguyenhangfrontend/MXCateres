import ComponentCard from '@/components/common/ComponentCard';
import { CustomerInfoType, ZoneDetailCustomer } from './type';
import Slider from 'react-slick';
import { Card, CardContent, Typography, Dialog, DialogContent } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useLazyGetCustomerDetailQuery, useLazyGetWaitingTimeDetailQuery } from 'src/src/api-request/Watting-time.api';
import { defaultDataCustomer } from 'src/src/pages/WaitingTime/constant';

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

  console.log('dataCustomer', dataCustomer);

  // ✅ trigger API calls when customerId changes
  useEffect(() => {
    if (!dataCustomer?.customerId) return;

    triggerCustomer({ id: dataCustomer?.customerId });
    triggerWaiting({
      customerId: dataCustomer?.customerId,
      date: moment(dataCustomer?.startTime).format('YYYY-MM-DD'),
    });
  }, [dataCustomer?.customerId, dataCustomer?.startTime, triggerCustomer, triggerWaiting]);

  // ✅ merge API results
  useEffect(() => {
    if (customerData || waitingData) {
      setDataCustomerFull({
        ...(customerData?.dataCustomerDetail ?? {}),
        ...(waitingData?.data ?? {}),
      });
    }
  }, [customerData, waitingData]);
  console.log('customerData', customerData);
  console.log('customerData', customerData);

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

  return (
    <div className='p-4 grid grid-cols-1 gap-4'>
      {/* Top Section */}
      <div className='grid grid-cols-3 gap-4'>
        {/* Avatar */}
        <ComponentCard className='flex items-center justify-center'>
          <div className=''>
            <img height={300} style={{ maxHeight: '300px' }} src={`${imageUrl}${dataCustomerFull?.fullbodyUrl}`} />
          </div>
        </ComponentCard>

        {/* Customer Info */}
        <ComponentCard title='Customer Info' className='col-span-2'>
          <div className='item-customer flex justify-between items-center'>
            <span>Customer Id:</span>
            <span>{dataCustomerFull?.customerId}</span>
          </div>
          <div className='item-customer flex justify-between items-center'>
            <span>Status:</span>
            <span>{dataCustomerFull?.status}</span>
          </div>
          <div className='item-customer flex justify-between items-center'>
            <span>Total Waiting TIme: </span>
            <span>{dataCustomerFull?.totalDuration}</span>
          </div>
          <div className='item-customer flex justify-between items-center'>
            <span>Last Seen At: </span>
            <span>{moment.utc(dataCustomerFull?.lastSeenAt).format('HH:mm')}</span>
          </div>

          {/* Zone Info */}
          <div className='customer-wrapper grid grid-cols-2 gap-4'>
            {dataCustomer?.zones?.map((item: ZoneDetailCustomer) => (
              <ComponentCard key={item.zone} title={item.zone}>
                <div className='item-customer flex justify-between items-center'>
                  <span>{`Start ${item.zone}:`}</span>
                  <span>{moment.utc(item.start).format('HH:mm')}</span>
                </div>
                <div className='item-customer flex justify-between items-center'>
                  <span>{`Finished ${item.zone}:`}</span>
                  <span>{moment.utc(item?.end).format('HH:mm')}</span>
                </div>
              </ComponentCard>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Staff Analysis */}
      <Card>
        <CardContent>
          <Typography variant='subtitle1'>Phân tích nhân viên:</Typography>
          <ul className='list-disc pl-6'>
            <li>Nhân viên A phục vụ: 6 phút</li>
            <li>So sánh trung bình ca: 4 phút</li>
          </ul>
        </CardContent>
      </Card>

      {/* Parts Evidence */}
      <ComponentCard title='Parts body Envidences'>
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
      </ComponentCard>

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
                      className='w-full h-64 object-cover rounded-lg'
                      alt={item.label}
                    />
                    <div className='absolute bottom-0 w-full bg-black/50 text-white p-2 text-sm flex justify-between items-center'>
                      <div>{item.label}</div>
                      <div>{moment.utc(item.capturedAt).format('HH:mm')}</div>
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
