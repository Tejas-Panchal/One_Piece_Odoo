import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // Check for user and if their role is Admin
  return user && user.role === 'Admin' ? <Outlet /> : <Navigate to='/' />;
};

export default AdminRoute;