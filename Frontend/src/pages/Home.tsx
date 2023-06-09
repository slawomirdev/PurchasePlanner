import React from 'react';
import ShoppingList from '../containers/Dashboard';
import { useCookies } from 'react-cookie';
import Auth from '../components/Auth/Auth';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

const Home: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['AuthToken']);
  const authToken = cookies.AuthToken;

  return (
    <>
      {!authToken && <Auth />}
      {authToken && (
          <ShoppingList />
      )}
      <ThemeToggle />
    </>
  );
};

export default Home;
