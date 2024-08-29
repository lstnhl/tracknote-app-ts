import AlbumItem from 'components/AlbumItem';
import s from './MainPage.module.scss';
import { Link } from 'react-router-dom';

const mockAlbums = [
  {
    id: 0,
    artist: 'саквояж беременной шпионки',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'невероятные приключения джоджо',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Syntheztesialisticsdsdsdsdsdsdsd',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
  {
    id: 0,
    artist: 'LASTINHVLE',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'Album 2',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Album 3',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
  {
    id: 0,
    artist: 'LASTINHVLE',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'Album 2',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Album 3',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
  {
    id: 0,
    artist: 'LASTINHVLE',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'Album 2',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Album 3',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
  {
    id: 0,
    artist: 'LASTINHVLE',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'Album 2',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Album 3',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
  {
    id: 0,
    artist: 'LASTINHVLE',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'Album 2',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Album 3',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
  {
    id: 0,
    artist: 'LASTINHVLE',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'Album 2',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Album 3',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
  {
    id: 0,
    artist: 'LASTINHVLE',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'Album 2',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Album 3',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
  {
    id: 0,
    artist: 'LASTINHVLE',
    title: 'Album 1',
  },
  {
    id: 1,
    artist: 'LASTINHVLE',
    title: 'Album 2',
  },
  {
    id: 2,
    artist: 'LASTINHVLE',
    title: 'Album 3',
  },
  {
    id: 3,
    artist: 'LASTINHVLE',
    title: 'Album 4',
  },
];

const MainPage = () => {
  return (
    <>
      <h1>У вас {mockAlbums.length} альбомов</h1>
      <div className={s.container}>
        {mockAlbums.map((album) => (
          <Link key={album.id} to={`/album/${album.id}`}>
            <AlbumItem artist={album.artist} title={album.title} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default MainPage;
