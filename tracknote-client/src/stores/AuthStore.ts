import { create } from 'zustand';
import createSelectors from 'stores/createSelectors';

interface IAuthStore {
  username: string;
  isAuth: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const useAuthStoreBase = create<IAuthStore>()((set) => ({
  username: '',
  isAuth: false,

  login: (name) => set(() => ({ isAuth: true, username: name })),

  logout: () => set(() => ({ isAuth: false, username: '' })),
}));

const useAuthStore = createSelectors(useAuthStoreBase);

export default useAuthStore;
