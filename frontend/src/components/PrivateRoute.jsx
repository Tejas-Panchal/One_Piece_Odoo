import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // If we have a user, render the child routes using <Outlet />
  // Otherwise, redirect to the login page
  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;