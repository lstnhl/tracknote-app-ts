import { FC } from 'react';
import { ITrack } from 'types/AlbumProps';
import s from './TrackList.module.scss';
import Track from 'components/Track/Track';
import useModal from 'stores/ModalStore';
import Button from 'components/UI/Button';
import useContentStore from 'stores/ContentStore';
import TrackForm from 'components/ModalContent/TrackForm';

interface ITrackListProps {
  tracks: ITrack[];
  albumId: string | undefined;
}

const NewTrackModalContent: FC = () => {
  const hideModal = useModal.use.hideModal();
  const addTrack = useContentStore.use.addTrackToAlbum();

  return (
    <>
      <TrackForm />
      <Button
        onClick={() => {
          addTrack();
          hideModal();
        }}
      >
        Добавить
      </Button>
    </>
  );
};

const TrackList: FC<ITrackListProps> = ({ tracks, albumId }) => {
  const showModal = useModal.use.showModal();

  return (
    <>
      <div className={s.trackList}>
        <Button
          onClick={() => {
            showModal(<NewTrackModalContent />, 'Добавить трек');
          }}
        >
          Добавить трек
        </Button>
        {tracks.map((track) => (
          <Track key={track._id} data={track} />
        ))}
      </div>
    </>
  );
};

export default TrackList;
