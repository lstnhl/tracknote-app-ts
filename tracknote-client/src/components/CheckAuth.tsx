import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuthStore from 'stores/AuthStore';

const CheckAuth = () => {
    const refresh = useAuthStore.use.refresh();

    useEffect(() => {
        refresh()
    }, [])

    return <Outlet />;
};

export default CheckAuth;
