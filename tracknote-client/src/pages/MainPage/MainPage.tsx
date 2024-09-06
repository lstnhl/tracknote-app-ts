import AlbumItem from 'components/AlbumItem';
import s from './MainPage.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from 'stores/AuthStore';
import useContentApi from 'api/contentApi';

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
  const [albums, setAlbums] = useState<any>([]);
  const [message, setMessage] = useState('Loading...');
  const { getAllAlbums } = useContentApi();

  useEffect(() => {
    getAllAlbums().then(({ data }) => {
      setMessage(data.message);
      setAlbums(data.albums);
    });
  }, []);

  return (
    <>
      <h1>{message}</h1>
      <div className={s.container}>
        {albums?.map((album: any) => (
          <Link key={album._id} to={`/album/${album._id}`}>
            <AlbumItem
              artist={album.description}
              title={album.title}
              image={album.cover}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default MainPage;
