import { FC } from 'react';
import { IAlbumItem } from 'types/AlbumProps';
import s from './AlbumItem.module.scss';
import { getFile } from 'utils/getFile';

const AlbumItem: FC<IAlbumItem> = ({ artist, title, image = '' }) => {
  let imageUrl;

  if (image) {
    imageUrl = `url("${getFile(`cover/${image}`)}")`
  } else {
    imageUrl = 'url("https://rostov.muzprime.ru/upload/iblock/717/717481027b29647bc17ed3317cdcd923.jpg")';
  }

  return (
    <div
      className={s.container}
      style={{
        backgroundImage: imageUrl,
      }}
    >
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <div className={s.blackout}></div>
    </div>
  );
};

export default AlbumItem;
