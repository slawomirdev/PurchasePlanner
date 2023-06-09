import React from 'react';
import ShoppingList from '../containers/ShoppingList';
import { useCookies } from 'react-cookie';
import Auth from '../components/Auth/Auth';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

const Home: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['AuthToken']);
  const authToken = cookies.AuthToken;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {!authToken && <Auth />}
      {authToken && (
        <div style={{ display: 'flex' }}>
          <ShoppingList />
        </div>
      )}
      <ThemeToggle />
    </div>
  );
};

export default Home;
