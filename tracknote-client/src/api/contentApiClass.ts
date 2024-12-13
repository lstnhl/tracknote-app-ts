import api from 'api/axios';
import { options } from 'api/authOptions';
import useAuthStore from 'stores/AuthStore';
import { ITrackFormInfo } from 'types/AlbumProps';

class ContentApi {
  private refresh = useAuthStore.getState().refresh;

  getAllAlbums() {
    this.refresh();
    return api.get('/content/album', options());
  }

  getAlbumById(id: string) {
    this.refresh();
    return api.get(`/content/album/${id}`, options());
  }

  addTrackToAlbum(albumId: string, info: ITrackFormInfo) {
    this.refresh();
    return api.post(
      `/content/album/${albumId}/add_track`,
      {
        ...info,
      },
      options(),
    );
  }

  editTrack(id: string, info: ITrackFormInfo) {
    this.refresh();
    return api.put(
      `/content/track/${id}`,
      {
        id,
        ...info,
      },
      options(),
    );
  }

  deleteTrack(trackId: string) {
    this.refresh();
    return api.delete(
      `content/track/${trackId}`,
      options(),
    );
  }
}

const contentApi = new ContentApi();

export default contentApi;
