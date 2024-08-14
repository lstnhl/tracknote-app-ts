import { FC } from 'react';
import s from './AlbumItem.module.scss';

interface AlbumItemProps {
  artist: string;
  title: string;
  image?: string;
}

const AlbumItem: FC<AlbumItemProps> = ({ artist, title, image = '' }) => {
  return (
    <div className={s.container}>
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <div className={s.blackout}></div>
    </div>
  );
};

export default AlbumItem;
