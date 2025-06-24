import api from 'api/axios';
import useAuthStore from 'stores/AuthStore';
import { options } from 'api/authOptions';

const useContentApi = () => {
  const opts = options();
  const refresh = useAuthStore.use.refresh();

  const getAllAlbums = () => {
    refresh();
    return api.get('/content/album', opts);
  };

  const getAlbumById = (id: string) => {
    refresh();
    return api.get(`/content/album/${id}`, opts);
  };

  const addTrackToAlbum = (albumId: string, title: string) => {
    refresh();
    return api.post(
      `/content/album/${albumId}/add_track`,
      {
        title,
      },
      opts,
    );
  };

  const editTrack = (id: string, title: string) => {
    refresh();
    return api.put(
      `/content/track/${id}`,
      {
        id,
        title,
      },
      opts,
    );
  };

  const deleteTrack = (id: string) => {
    refresh();
    return api.delete(`content/track/${id}`, opts);
  };

  return { getAllAlbums, getAlbumById, addTrackToAlbum };
};

export default useContentApi;
