import React, { useEffect } from 'react';
import { Dialog, DialogContent, IconButton, useMediaQuery, Theme, Backdrop, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LoadingProps {
  isOpen: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isOpen }) => {
  useEffect(() => {
    setOpen(true);
  }, []);
  const [open, setOpen] = React.useState(false);
  // Auto full screen on small devices if needed
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <Backdrop
          sx={(theme) => ({ bgcolor: 'rgba(255,255,255,0.5)', color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color='primary' />
        </Backdrop>
      ) : (
        ''
      )}
    </>
  );
};
