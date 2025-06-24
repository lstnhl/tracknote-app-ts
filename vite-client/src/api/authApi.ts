import api from 'api/axios';

export const login = (username: string, password: string) => {
    return api.post('/auth/login', {
        username,
        password,
    });
};

export const logout = () => {
    return api.get('/auth/logout');
};

export const refresh = () => {
    return api.get('/auth/refresh');
};
