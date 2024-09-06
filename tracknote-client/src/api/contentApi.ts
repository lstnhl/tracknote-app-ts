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

  return { getAllAlbums, getAlbumById };
};

export default useContentApi;
