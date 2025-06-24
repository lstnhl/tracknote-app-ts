import { create } from 'zustand';
import createSelectors from 'stores/createSelectors';
import { login, logout, refresh } from 'api/authApi';
import decodeJWT from 'utils/decodeJWT';

interface IAuthStore {
  username: string;
  isAuth: boolean;
  token: string;
  avatar: string;
  tokenExpiry: number;
  login: (
    username: string,
    password: string,
    onError: (message: string) => void,
    onSuccess?: () => void,
  ) => void;
  logout: () => void;
  refresh: () => void;
}

const initialState = {
  username: '',
  token: '',
  isAuth: false,
  avatar: '',
  tokenExpiry: 0,
};

const useAuthStoreBase = create<IAuthStore>()((set) => ({
  ...initialState,

  login: async (username, password, onError, onSuccess) => {
    await login(username, password)
      .then((res) => {
        const token = res.data.accessToken;
        const decoded = decodeJWT(token);

        set(() => ({
          isAuth: true,
          username: decoded.username,
          token: res.data.accessToken,
          avatar: decoded.avatar,
          tokenExpiry: decoded.exp ? decoded.exp * 1000 : 0, // Convert to milliseconds, fallback to 0 if undefined
        }));
        if (onSuccess) {
          onSuccess();
        }
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
    const currentTime = Date.now();
    const state = useAuthStoreBase.getState();
    const expiry = state.tokenExpiry;
    if (expiry > currentTime) {
      return; // Token is still valid, no need to refresh
    }
    await refresh()
      .then((res) => {
        const token = res.data.accessToken;
        const decoded = decodeJWT(token);

        set(() => ({
          isAuth: true,
          username: decoded.username,
          token,
          avatar: decoded.avatar,
          tokenExpiry: decoded.exp ? decoded.exp * 1000 : 0, // Convert to milliseconds, fallback to 0 if undefined
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
