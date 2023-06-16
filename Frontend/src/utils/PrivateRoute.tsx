import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = () => {
    const [cookies] = useCookies(['AuthToken']);
    const authToken = cookies.AuthToken;

    return authToken ? <Outlet/> : <Navigate to='/auth' />
}

export default PrivateRoute;