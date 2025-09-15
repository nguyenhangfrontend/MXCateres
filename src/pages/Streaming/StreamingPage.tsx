import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useLazyGetDashboardDataQuery } from '@/api-request/Dashboard.api';
import { useLazyGetStreamingListQuery } from 'src/src/api-request/Streaaming.api';

export default function StreamingPage() {
  const [getStreamingList, { data, isFetching }] = useLazyGetStreamingListQuery();

  React.useEffect(() => {
    getStreamingList();
    console.log('isFetching', isFetching);

    console.log(data);
  }, [data]);

  const cameras = data; // <-- use API data

  return (
    <ImageList cols={3} rowHeight='auto' gap={12}>
      {data?.data?.list_infor_camera.map((item: any) => (
        <ImageListItem
          key={item.imageUrl}
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            '&:hover .overlay': {
              opacity: 1,
            },
          }}
        >
          {/* Image */}
          <img
            srcSet={`${item.imageUrl}?w=400&h=250&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.imageUrl}?w=400&h=250&fit=crop&auto=format`}
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
      ))}
    </ImageList>
  );
}
