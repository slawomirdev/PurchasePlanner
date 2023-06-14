import { Typography, Button } from '@mui/material';
import styled from '@emotion/styled';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  text-align: center;
  padding: 1rem;

  @media (max-width: 48rem) {
    padding: 0.5rem;
  }
`;

export const Title = styled(Typography)`
  font-size: 4rem;
  margin: 0;

  @media (max-width: 48rem) {
    font-size: 2rem;
  }
`;

export const Message = styled(Typography)`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 48rem) {
    font-size: 1rem;
  }
`;

export const StyledButton = styled(Button)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;

  @media (max-width: 48rem) {
    padding: 0.25rem 0.5rem;
  }
`;
