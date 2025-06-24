import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useContentApi from 'api/contentApi';
import { IAlbumPage } from 'types/AlbumProps';
import s from './AlbumPage.module.scss';
import { getBackgroundImageUrl } from 'utils/getFile';
import TrackList from 'components/Track/TrackList';
import Button from 'components/UI/Button';
import useModal from 'stores/ModalStore';
import useContentStore from 'stores/ContentStore';

const AlbumPage = () => {
  // const { getAlbumById } = useContentApi();
  // const [album, setAlbum] = useState<IAlbumPage>();
  const { id } = useParams();
  const showModal = useModal.use.showModal();
  const album = useContentStore.use.currentAlbum();
  const getAlbumById = useContentStore.use.getAlbumById();

  // useEffect(() => {
  //   if (id) {
  //     getAlbumById(id).then(({ data }) => {
  //       setAlbum(data);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (id) {
      getAlbumById(id);
    }
  }, []);

  if (!album.title) {
    return null;
  }

  const modalContent = (
    <>
      <div>{album.title}</div>
    </>
  );

  return (
    <>
      <div className={s.container}>
        <div className={s.albumInfo}>
          <div
            className={s.cover}
            style={{
              backgroundImage: getBackgroundImageUrl(album.cover),
            }}
          ></div>
          <div>
            <h1>{album.title}</h1>
            <p>{album.description}</p>
            <p>Дата создания: {new Date(album.createdAt).toLocaleString()}</p>
            <p>
              Последнее изменение: {new Date(album.updatedAt).toLocaleString()}
            </p>
            <Button
              onClick={() => {
                showModal(modalContent, null);
              }}
            >
              Редактировать альбом
            </Button>
          </div>
        </div>
        <TrackList tracks={album.tracks} albumId={id} />
      </div>
    </>
  );
};

export default AlbumPage;
