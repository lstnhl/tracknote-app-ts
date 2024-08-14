import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import authStore from 'stores';
import { observer } from 'mobx-react-lite';

const ProtectedRoute = observer(() => {
  if (!authStore.isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
});

export default ProtectedRoute;
