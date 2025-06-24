import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuthStore from 'stores/AuthStore';

const CheckAuth = () => {
    const refresh = useAuthStore.use.refresh();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            await refresh();
            setIsLoading(false);
        };
        checkToken();
    }, [refresh]);

    if (isLoading) {
        return <div>Загрузка...</div>; // Показываем индикатор загрузки, пока проверяется токен
    }

    return <Outlet />;
};

export default CheckAuth;
