import React from 'react';
import Dashboard from '../containers/Dashboard';
import { useCookies } from 'react-cookie';
import Auth from '../components/Auth/Auth';

const Home: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['AuthToken']);
  const authToken = cookies.AuthToken;

  return (
    <>
      {!authToken && <Auth />}
      {authToken && <Dashboard />}
    </>
  );
};

export default Home;
