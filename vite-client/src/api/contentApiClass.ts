import api from 'api/axios';
import { options } from 'api/authOptions';
import useAuthStore from 'stores/AuthStore';
import { ITrackFormInfo } from 'types/AlbumProps';

class ContentApi {
  private refresh = useAuthStore.getState().refresh;

  private async checkAndRefreshToken() {
    const currentTime = Date.now();
    const state = useAuthStore.getState();
    if (state.tokenExpiry <= currentTime && state.isAuth) {
      await this.refresh();
    }
  }

  async getAllAlbums() {
    await this.checkAndRefreshToken();
    return api.get('/content/album', options());
  }

  async getAlbumById(id: string) {
    await this.checkAndRefreshToken();
    return api.get(`/content/album/${id}`, options());
  }

  async addTrackToAlbum(albumId: string, info: ITrackFormInfo) {
    await this.checkAndRefreshToken();
    return api.post(
      `/content/album/${albumId}/add_track`,
      {
        ...info,
      },
      options(),
    );
  }

  async editTrack(id: string, info: ITrackFormInfo) {
    await this.checkAndRefreshToken();
    return api.put(
      `/content/track/${id}`,
      {
        id,
        ...info,
      },
      options(),
    );
  }

  async deleteTrack(trackId: string) {
    await this.checkAndRefreshToken();
    return api.delete(
      `/content/track/${trackId}`,
      options(),
    );
  }
}

const contentApi = new ContentApi();

export default contentApi;
