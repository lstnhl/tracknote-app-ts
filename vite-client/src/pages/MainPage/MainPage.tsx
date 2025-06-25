import AlbumItem from 'components/AlbumItem';
import s from './MainPage.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import useContentApi from 'api/contentApi';

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
              cover={album.cover}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default MainPage;
