import { create } from 'zustand';
import createSelectors from 'stores/createSelectors';
import { IAlbumPage, ITrackFormInfo } from 'types/AlbumProps';
import contentApi from 'api/contentApiClass';

interface IContentStore {
  currentAlbum: IAlbumPage;
  trackFormInfo: ITrackFormInfo;
  getAlbumById: (id: string) => void;
  addTrackToAlbum: () => void;
  deleteTrack: (trackId: string) => void;
  editTrack: (id: string) => void;
  changeTrackFormInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearAlbumInfo: () => void;
  clearTrackInfo: () => void;
  setTrackFormInfo: (info: ITrackFormInfo) => void;
}

const emptyAlbum: IAlbumPage = {
  _id: '',
  artist: '',
  createdAt: '',
  description: '',
  title: '',
  updatedAt: '',
  cover: undefined,
  tracks: [],
};

const emptyTrackInfo: ITrackFormInfo = {
  title: '',
  feats: '',
  explicit: false,
};

const useContentStoreBase = create<IContentStore>()((set, get) => ({
  currentAlbum: emptyAlbum,
  trackFormInfo: emptyTrackInfo,

  clearAlbumInfo: () => {
    set(() => ({
      currentAlbum: emptyAlbum,
    }));
  },

  clearTrackInfo: () => {
    set(() => ({
      trackFormInfo: emptyTrackInfo,
    }));
  },

  getAlbumById: async (id) => {
    get().clearAlbumInfo();
    await contentApi
      .getAlbumById(id)
      .then((res) => {
        set(() => ({
          currentAlbum: res.data,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  },

  addTrackToAlbum: async () => {
    const id = get().currentAlbum?._id;

    if (!id) {
      return;
    }

    const info = get().trackFormInfo;

    await contentApi.addTrackToAlbum(id, info).then((res) => {
      set((state) => ({
        currentAlbum: {
          ...state.currentAlbum,
          tracks: [...state.currentAlbum.tracks, res.data],
        },
      }));
      get().clearTrackInfo();
    }).catch((e) => {
        console.log(e.response.data);
        
    });
  },

  deleteTrack: async (id) => {
    await contentApi
      .deleteTrack(id)
      .then((res) => {
        set(() => ({
          currentAlbum: {
            ...res.data,
          },
        }));
      })
      .catch((e) => {
        console.log(e.data);
      });
  },

  editTrack: async (id) => {
    const info = get().trackFormInfo;

    await contentApi.editTrack(id, info).then((res) => {
        set(() => ({
            currentAlbum: {
                ...res.data
            }
        }))
    }).catch((e) => {
        console.log(e.data);
    })
  },

  changeTrackFormInfo: (e) => {
    if (e.target.type === 'text') {
      set((state) => ({
        trackFormInfo: {
          ...state.trackFormInfo,
          [e.target.name]: e.target.value,
        },
      }));
      return;
    }

    if (e.target.type === 'checkbox') {
      set((state) => ({
        trackFormInfo: {
          ...state.trackFormInfo,
          explicit: e.target.checked,
        },
      }));
    }
  },

  setTrackFormInfo: (info) => {
    set(() => ({
      trackFormInfo: {
        ...info,
      },
    }));
  },
}));

const useContentStore = createSelectors(useContentStoreBase);

export default useContentStore;
