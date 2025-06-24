import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from 'stores/AuthStore';

const ProtectedRoute = () => {
  const isAuth = useAuthStore.use.isAuth();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
