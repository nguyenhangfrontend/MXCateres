import { ReactNode } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface ButtonProps {
  children: ReactNode;
  size?: 'sm' | 'md';
  variant?: 'primary' | 'outline';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // ✅ restrict correctly
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  startIcon,
  endIcon,
  onClick,
  className = '',
  disabled = false,
  type = 'button', // ✅ sensible default
}) => {
  const muiSize: MuiButtonProps['size'] = size === 'sm' ? 'small' : 'medium';
  const muiVariant: MuiButtonProps['variant'] = variant === 'primary' ? 'contained' : 'outlined';

  return (
    <MuiButton
      size={muiSize}
      variant={muiVariant}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
      className={className}
      type={type}
      sx={{
        borderRadius: '5px',
        textTransform: 'none',
        px: size === 'sm' ? 2 : 3,
        py: size === 'sm' ? 1.5 : 2,
        height: 35,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
