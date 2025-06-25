import { ReactNode } from 'react';
import createSelectors from 'stores/createSelectors';
import { create } from 'zustand';

interface IModalStore {
  content: ReactNode | null;
  title: string | null;
  visible: boolean;
  showModal: (content: ReactNode | null, title: string | null, onHide?: (() => void) | null) => void;
  hideModal: () => void;
  onHide?: (() => void) | null;
}

const initialState = {
  content: null,
  title: null,
  visible: false,
  onHide: null,
};

const useModalBase = create<IModalStore>()((set, get) => ({
  ...initialState,

  showModal: (
    content = null,
    title = null,
    cb = null
  ) => {
    set(() => ({
      content,
      title,
      visible: true,
      onHide: cb
    }));
  },

  hideModal: () => {
    const cb = get().onHide;
    if (cb) {
      cb();
    }
    set(() => ({ ...initialState }));
  },
}));

const useModal = createSelectors(useModalBase);

export default useModal;
