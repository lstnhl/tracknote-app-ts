export interface ITrack {
  _id: string;
  artist: string;
  title: string;
  order: number;
  notes?: INote;
  feats?: string[];
  text?: string;
  explicit: boolean;
}

export interface INote {
  _id: string;
  title: string;
  text: string;
  owner: string;
  attachedToTrack?: string;
  createdAt: string;
  updatedAt: string;
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
