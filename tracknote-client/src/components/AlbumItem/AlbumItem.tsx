import { FC } from 'react';
import { IAlbumItem } from 'types/AlbumProps';
import s from './AlbumItem.module.scss';

const AlbumItem: FC<IAlbumItem> = ({ artist, title, image = '' }) => {
  return (
    <div className={s.container}>
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <div className={s.blackout}></div>
    </div>
  );
};

export default AlbumItem;
