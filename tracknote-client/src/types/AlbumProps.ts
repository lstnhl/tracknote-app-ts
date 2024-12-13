export interface ITrack {
  _id: string;
  artist: string;
  title: string;
  order: number;
  feats?: string[];
  text?: string;
  explicit: boolean;
}

export interface ITrackFormInfo {
  title: string;
  feats: string;
  explicit: boolean;
}

export interface IAlbumItem {
  artist: string;
  title: string;
  cover?: string;
}

export interface IAlbumPage extends IAlbumItem {
  _id: string;
  tracks: ITrack[];
  description: string;
  createdAt: string;
  updatedAt: string;
}
