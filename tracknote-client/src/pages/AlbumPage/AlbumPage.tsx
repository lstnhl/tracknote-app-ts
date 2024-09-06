import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useContentApi from 'api/contentApi';

const AlbumPage = () => {
  const { getAlbumById } = useContentApi();
  const [album, setAlbum] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAlbumById(id).then(({ data }) => {
        setAlbum(data);
      });
    }
  }, []);

  return (
    <>
      <h1>{album?.title || 'Loading...'}</h1>
      <p>{album?.description || '...'}</p>
      <p>{JSON.stringify(album || [])}</p>
    </>
  );
};

export default AlbumPage;
