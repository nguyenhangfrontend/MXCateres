import ComponentCard from '@/components/common/ComponentCard';
import { CustomerInfoType, ZoneDetailCustomer } from './type';
import Slider from 'react-slick';
import { Card, CardContent, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { InfoIcon } from 'src/src/icons';
import moment from 'moment';
import { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

type CustomerProps = {
  dataCustomer: CustomerInfoType;
};

export default function CustomerInfoComponent({ dataCustomer }: CustomerProps) {
  console.log('dataCustomer', dataCustomer);
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

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
    afterChange: function (index: number) {
      console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
    },
  };
  const settingsPartSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <ArrowForwardIos />,
    prevArrow: <ArrowBackIos />,
    afterChange: function (index: number) {
      console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
    },
  };
  return (
    <>
      <div className='p-4 grid grid-cols-1 gap-4'>
        {/* Top Section */}
        <div className='grid grid-cols-3 gap-4'>
          {/* Avatar */}
          <ComponentCard className='flex items-center justify-center'>
            <img src={dataCustomer?.fullbodyUrl} />
          </ComponentCard>
          {/* Staff Analysis */}

          <ComponentCard title='Customer Info' className='col-span-2'>
            <div className='item-customer flex justify-between items-center'>
              <span>Customer Id:</span>
              <span>{dataCustomer?.customerId}</span>
            </div>
            <div className='item-customer flex justify-between items-center'>
              <span>Status:</span>
              <span>{dataCustomer?.status}</span>
            </div>
            <div className='item-customer flex justify-between items-center'>
              <span>Total Waiting TIme: </span>
              <span>{dataCustomer?.totalDuration}</span>
            </div>
            <div className='item-customer flex justify-between items-center'>
              <span>Last Seen At: </span>
              <span>{moment.utc(dataCustomer?.lastSeenAt).format('HH:mm')}</span>
            </div>
            <div className='customer-wrapper grid grid-cols-2 gap-4'>
              {dataCustomer.zones?.map((item: ZoneDetailCustomer) => {
                return (
                  <ComponentCard title={item.zone}>
                    <div className='item-customer flex justify-between items-center'>
                      <span>{`Start ${item.zone}`}:</span>
                      <span>{moment.utc(item.start).format('HH:mm')}</span>
                    </div>
                    <div className='item-customer flex justify-between items-center'>
                      <span>{`Finished ${item.zone}:`}</span>
                      <span>{moment.utc(item?.end).format('HH:mm')}</span>
                    </div>
                  </ComponentCard>
                );
              })}

              {/* <ComponentCard title='Recieve Zone'>
                <div className='item-customer flex justify-between items-center'>
                  <span>Start Recieved Time:</span>
                  <span>{moment.utc(dataCustomer.startTime).format('HH:mm')}</span>
                </div>
                <div className='item-customer flex justify-between items-center'>
                  <span>Finished Recieved Time: </span>
                  <span>{moment.utc(dataCustomer.endOrderTime).format('HH:mm')}</span>
                </div>
              </ComponentCard> */}
            </div>
          </ComponentCard>
        </div>

        <Card>
          <CardContent>
            <Typography variant='subtitle1'>Phân tích nhân viên:</Typography>
            <ul className='list-disc pl-6'>
              <li>Nhân viên A phục vụ: 6 phút</li>
              <li>So sánh trung bình ca: 4 phút</li>
            </ul>
          </CardContent>
        </Card>
        <ComponentCard title='Parts body Envidences'>
          <CardContent>
            <div className='slider-container'>
              <Slider {...settingsPartSlider}>
                {dataCustomer?.parts.map((item, index) => (
                  <div key={index} className='p-[10px]'>
                    <div key={item.imageUrl} className='relative'>
                      <img
                        src={item.imageUrl}
                        className='w-full h-64 object-cover rounded-lg'
                        alt={moment.utc(item.imageUrl).format('HH:mm')}
                      />
                      <div className='absolute bottom-0 w-full bg-black/50 text-white p-2 text-sm flex justify-between items-center'>
                        <div>{item.type}</div>
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
                  <img src={selectedImg} alt='zoomed' className='w-full h-auto max-h-[90vh] object-contain' />
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </ComponentCard>
        {/* Timeline */}
        <ComponentCard title='Timeline Envidences'>
          <CardContent>
            <div className='slider-container'>
              <Slider {...settings}>
                {dataCustomer?.evidents.map((item, index) => (
                  <div key={`timline-${index}`} className='p-[10px]'>
                    <div key={item.imageUrl} className='relative' onDoubleClick={() => handleOpen(item.imageUrl)}>
                      <img
                        src={item.imageUrl}
                        className='w-full h-64 object-cover rounded-lg'
                        alt={moment.utc(item.label).format('HH:mm')}
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
                  <img src={selectedImg} alt='zoomed' className='w-full h-auto max-h-[90vh] object-contain' />
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </ComponentCard>
      </div>
    </>
  );
}
