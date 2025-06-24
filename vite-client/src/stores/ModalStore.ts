import { ReactNode } from 'react';
import createSelectors from 'stores/createSelectors';
import { create } from 'zustand';

interface IModalStore {
  content: ReactNode | null;
  title: string | null;
  visible: boolean;
  showModal: (content: ReactNode | null, title: string | null) => void;
  hideModal: () => void;
}

const initialState = {
  content: null,
  title: null,
  visible: false,
};

const useModalBase = create<IModalStore>()((set) => ({
  ...initialState,

  showModal: (
    content: ReactNode | null = null,
    title: string | null = null,
  ) => {
    set(() => ({
      content,
      title,
      visible: true,
    }));
  },

  hideModal: () => {
    set(() => ({ ...initialState }));
  },
}));

const useModal = createSelectors(useModalBase);

export default useModal;
