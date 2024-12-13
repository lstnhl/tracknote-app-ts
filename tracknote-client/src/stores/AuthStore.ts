import { create } from 'zustand';
import createSelectors from 'stores/createSelectors';
import { login, logout, refresh } from 'api/authApi';
import decodeJWT from 'utils/decodeJWT';

interface IAuthStore {
  username: string;
  isAuth: boolean;
  token: string;
  avatar: string;
  login: (
    username: string,
    password: string,
    onError: (message: string) => void,
  ) => void;
  logout: () => void;
  refresh: () => void;
}

const initialState = {
  username: '',
  token: '',
  isAuth: false,
  avatar: '',
};

const useAuthStoreBase = create<IAuthStore>()((set) => ({
  ...initialState,

  login: async (username, password, onError) => {
    await login(username, password)
      .then((res) => {
        const token = res.data.accessToken;
        const decoded = decodeJWT(token);

        set(() => ({
          isAuth: true,
          username: decoded.username,
          token: res.data.accessToken,
          avatar: decoded.avatar,
        }));
        refresh();
      })
      .catch((err) => {
        onError(err.response.data.message);
      });
  },

  logout: async () => {
    await logout().then(() => {
      set(() => ({ ...initialState }));
    });
  },

  refresh: async () => {
    await refresh()
      .then((res) => {
        const token = res.data.accessToken;
        const decoded = decodeJWT(token);

        set(() => ({
          isAuth: true,
          token,
          username: decoded.username,
        }));
      })
      .catch((err) => {
        set(() => (initialState));
        console.log(err);
      });
  },
}));

const useAuthStore = createSelectors(useAuthStoreBase);

export default useAuthStore;
