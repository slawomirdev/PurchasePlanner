import { styled } from '@mui/system';
import { Box, Paper } from '@mui/material';

export const AuthContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

export const AuthForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const SwitchBox = styled(Box)({
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
});
