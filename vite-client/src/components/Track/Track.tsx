import { FC, useEffect, memo } from 'react';
import { ITrack } from 'types/AlbumProps';
import s from './Track.module.scss';
import Button from 'components/UI/Button';
import useModal from 'stores/ModalStore';
import useContentStore from 'stores/ContentStore';
import TrackForm from 'components/ModalContent/TrackForm';

interface ITrackProps {
  data: ITrack;
}

const EditModalContent: FC<ITrackProps> = ({
  data
}) => {
  const hideModal = useModal.use.hideModal();
  const setInitialInfo = useContentStore.use.setTrackFormInfo();
  const editTrack = useContentStore.use.editTrack();
  const deleteTrack = useContentStore.use.deleteTrack();

  useEffect(() => {
    setInitialInfo({
      title: data.title,
      explicit: data.explicit,
      feats: data.feats ? data.feats?.toString() : '',
    });
  }, [data, setInitialInfo]);

  return (
    <>
      <TrackForm />
      <Button
        onClick={() => {
          editTrack(data._id);
          hideModal();
        }}
      >
        Принять
      </Button>
      <Button
        onClick={() => {
          deleteTrack(data._id);
          hideModal();
        }}
      >
        Удалить
      </Button>
    </>
  );
};

const Track: FC<ITrackProps> = ({ data }) => {
  const showModal = useModal.use.showModal();

  return (
    <div className={s.container}>
      <div className={s.order}>{data.order}</div>
      <div className={s.trackInfo}>
        <div>{data.title}</div>
        <div className={`${s.explicit} ${!data.explicit && s.transparent}`}>
          E
        </div>
        {data.feats && data.feats.length > 0 && (
          <div className={s.feats}>
            feat.
            {data.feats.map((feat) => (
              <div key={feat}>{feat}, </div>
            ))}
          </div>
        )}
      </div>
      <span>{data.notes && 'Заметка есть'}</span>
      <Button
        onClick={() => {
          showModal(<EditModalContent data={data}/>, 'Редактирование трека');
        }}
      >
        Подробнее
      </Button>
    </div>
  );
};

export default memo(Track);
