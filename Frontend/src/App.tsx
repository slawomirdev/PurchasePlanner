import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import ShoppingList from './pages/ShoppingList';
import NotFound from './pages/NotFound';
import { ColorModeProvider } from './contexts/colorModeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';
import Auth from "./pages/Auth/Auth";
import PrivateRoute from "./utils/PrivateRoute";

export const App = () => {
  const [cookies, _, removeCookie] = useCookies(['AuthToken']);
  const authToken = cookies.AuthToken;

  const logOut = () => {
    removeCookie('AuthToken', { path: '/' });
    removeCookie('AuthToken', { path: '/shopping-list' });
    window.location.reload();
  };

  return (
    <ColorModeProvider>
      <BrowserRouter>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" flexGrow={1}>
              Kasa pod kontrolą 💸
            </Typography>
            <ThemeToggle />
            {authToken && (
              <Button onClick={logOut} color="inherit">
                Wyloguj
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="shopping-list/:id" element={<ShoppingList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  );
};
