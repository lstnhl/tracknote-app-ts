import { FC } from 'react';
import { IAlbumItem } from 'types/AlbumProps';
import s from './AlbumItem.module.scss';
import { getBackgroundImageUrl } from 'utils/getFile';

const AlbumItem: FC<IAlbumItem> = ({ artist, title, cover = '' }) => {
  return (
    <div
      className={s.container}
      style={{
        backgroundImage: getBackgroundImageUrl(cover),
      }}
    >
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <div className={s.blackout}></div>
    </div>
  );
};

export default AlbumItem;
