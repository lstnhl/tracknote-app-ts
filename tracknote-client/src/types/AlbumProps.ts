export interface ITrack {
    artist: string;
    title: string;
    feats?: string[];
    text?: string;
}

export interface IAlbumItem {
  artist: string;
  title: string;
  image?: string;
}

export interface IAlbumPage extends IAlbumItem {
    tracks: ITrack[];
}