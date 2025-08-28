import React from 'react';
import { Dialog, DialogContent, IconButton, useMediaQuery, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean; // Default false
  width?: string | number;
  height?: string | number;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscreen = false,
  width,
  height,
}) => {
  // Auto full screen on small devices if needed

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullScreen={isFullscreen}
      PaperProps={{
        className: `${className ?? ''} ${isFullscreen ? 'w-full h-full' : 'rounded-3xl'}`,
        sx: {
          width: width || '600px', // Default width
          maxWidth: '90vw',
          height: height || 'auto',
          maxHeight: height,
          margin: 0,
        },
      }}
      BackdropProps={
        {
          // sx: {
          //   zIndex: 1, // 👈 set your custom z-index
          // },
        }
      }
    >
      {showCloseButton && (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      <DialogContent sx={{ p: 3 }}>{children}</DialogContent>
    </Dialog>
  );
};
