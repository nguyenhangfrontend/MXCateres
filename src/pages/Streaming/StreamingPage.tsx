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

const AI_BOX_URL = import.meta.env.VITE_AI_BOX_URL;

export default function StreamingPage() {
  const [getStreamingData, { data: data }] = useLazyGetStreamingDataQuery();

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
      <ImageList cols={data?.list_infor_camera?.length % 2 === 0 ? 2 : 3} rowHeight='auto' gap={12}>
        {data?.list_infor_camera?.map((item: any) => (
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
                srcSet={`${item.imageUrl}?w=400&h=250&fit=crop&auto=format&dpr=2 2x`}
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
        ))}
      </ImageList>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth='lg'
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'black',
            color: 'white',
          },
        }}
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
          <IconButton onClick={handleCloseModal} sx={{ color: 'white' }} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, bgcolor: 'black' }}>
          {selectedCamera && (
            <Box sx={{ position: 'relative', width: '100%', height: '70vh' }}>
              {/* <video
                controls
                autoPlay
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  console.error("Video loading error:", e)
                }}
              >
                <source src={getVideoUrl(selectedCamera)} type="video/mp4" />
                <source src={getVideoUrl(selectedCamera)} type="application/x-mpegURL" />
                <source src={getVideoUrl(selectedCamera)} type="video/webm" />
                Your browser does not support the video tag.
                <img
                  src={selectedCamera.imageUrl || "/placeholder.svg"}
                  alt={selectedCamera.cameraName}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </video> */}
              <iframe src={`${AI_BOX_URL}/video_feed`} frameBorder='0' width='100%' height='100%'></iframe>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
