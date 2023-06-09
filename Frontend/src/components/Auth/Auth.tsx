import { useState, ChangeEvent, FormEvent } from 'react';
import { useCookies } from 'react-cookie';
import { Button, TextField, Typography, Fade, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AuthContainer, AuthForm, SwitchBox } from './Auth.styles';

const Auth = () => {
  const [_, setCookie] = useCookies(['Email', 'AuthToken']);
  const [isLogIn, setIsLogin] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const viewLogin = (status: boolean) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    endpoint: string
  ) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError('Upewnij się, że hasła są zgodne!');
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_SERVERURL}/${endpoint}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      window.location.reload();
    }
  };

  const formTitle = isLogIn ? 'Logowanie' : 'Rejestracja';
  const submitButtonText = isLogIn ? 'Zaloguj się' : 'Zarejestruj się';

  return (
    <AuthContainer>
      <Paper
          sx={{
            padding: '2rem',
            minWidth: { xs: 'auto', sm: '400px' },
            minHeight: { xs: 'auto', sm: '400px' },
            maxWidth: '100%',
            width: '100%',
            boxShadow: isSmallScreen ? 'none' : theme.shadows[3],
          }}
          elevation={isSmallScreen ? 0 : 3}
      >
        <AuthForm
          onSubmit={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}
        >
          <Typography align="center" variant="h6">
            {formTitle}
          </Typography>
          <TextField
            type="email"
            label="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            variant="outlined"
            size="small"
          />
          <TextField
            type="password"
            label="Hasło"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            variant="outlined"
            size="small"
          />
          {!isLogIn && (
            <TextField
              type="password"
              label="Potwierdź hasło"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              variant="outlined"
              size="small"
            />
          )}
          <Button type="submit" variant="contained" fullWidth>
            {submitButtonText}
          </Button>
          {error && (
            <Fade in={!!error}>
              <Typography align="center" variant="body1" color="error">
                {error}
              </Typography>
            </Fade>
          )}
        </AuthForm>
        <SwitchBox>
          {!isLogIn && (
            <Button variant="text" onClick={() => viewLogin(true)} fullWidth>
              Masz już konto? Zaloguj się
            </Button>
          )}
          {isLogIn && (
            <Button variant="text" onClick={() => viewLogin(false)} fullWidth>
              Nie masz konta? Zarejestruj się
            </Button>
          )}
        </SwitchBox>
      </Paper>
    </AuthContainer>
  );
};

export default Auth;
