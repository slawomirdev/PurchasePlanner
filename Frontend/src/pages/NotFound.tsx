import { Link } from 'react-router-dom';
import { Container, Title, Message, StyledButton } from './NotFound.styles';

const NotFound = () => {
  return (
    <Container>
      <Title variant="h1">404</Title>
      <Message variant="h2">Strona, której szukasz, nie istnieje.</Message>
      <StyledButton variant="contained">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Wróć do Strony Głównej
        </Link>
      </StyledButton>
    </Container>
  );
};

export default NotFound;
