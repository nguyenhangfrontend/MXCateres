import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState, useEffect } from 'react';
import { useLazyGetStreamingDataQuery } from 'src/src/api-request/Setting.api';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Modal } from 'src/src/components/ui/modal';
import { Loading } from 'src/src/components/ui/loading';

const AI_BOX_URL = import.meta.env.VITE_AI_BOX_URL;

export default function StreamingPage() {
  const [getStreamingData, data] = useLazyGetStreamingDataQuery();

  console.log('data', data);

  useEffect(() => {
    getStreamingData({});
  }, []);

  const [selectedCamera, setSelectedCamera] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCameraClick = (camera: any) => {
    setSelectedCamera(camera);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCamera(null);
  };

  const getVideoUrl = (camera: any) => {
    return camera.streamUrl || camera.rtmpUrl || camera.url || camera.imageUrl;
  };

  return (
    <>
      <Loading isOpen={data?.status === 'pending'} />
      <ImageList cols={data?.data?.list_infor_camera?.length % 2 === 0 ? 2 : 3} rowHeight='auto' gap={12}>
        {data?.data?.list_infor_camera?.map((item: any) => {
          return item?.imageUrl ? (
            <div key={item.cameraName}>
              <Typography variant='h6' component='h2'>
                {item.cameraName}
              </Typography>
              <ImageListItem
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover .overlay': {
                    opacity: 1,
                  },
                }}
                onClick={() => handleCameraClick(item)}
              >
                {/* Image */}
                <img
                  srcSet={`${item.imageUrl}`}
                  src={`${item.imageUrl}`}
                  alt={item.cameraName}
                  loading='lazy'
                  style={{ width: '100%', display: 'block' }}
                />
                {/* Overlay with Play Icon */}
                <Box
                  className='overlay'
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <IconButton sx={{ color: 'white', fontSize: 60 }} aria-label={`play ${item.cameraName}`}>
                    <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
                  </IconButton>
                </Box>
              </ImageListItem>
            </div>
          ) : (
            <></>
          );
        })}
      </ImageList>

      <Modal
        width='100vw'
        height='95vh'
        isOpen={modalOpen}
        onClose={handleCloseModal}
        isFullscreen={false}
        // className='bg-white dark:bg-gray-900 width-[1200px]'
        sx={{ p: 0, bgcolor: 'black' }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.8)',
            color: 'white',
          }}
        >
          <Typography variant='h6'>{selectedCamera?.cameraName}</Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 0, bgcolor: 'black', position: 'relative', width: '100%', height: '900px' }}>
          {selectedCamera && (
            <img
              style={{ objectFit: 'contain', height: '100%', width: '100%', position: 'absolute' }}
              src={`${AI_BOX_URL}/video_feed`}
              width='100%'
              height='100%'
            ></img>
          )}
        </DialogContent>
      </Modal>
    </>
  );
}
