import { memo } from 'react';
import Text from 'components/UI/Text';
import useContentStore from 'stores/ContentStore';

// interface ITrackForm {
//   callback: (info: ITrackFormInfo) => void;
//   children: ReactNode;
// }

const TrackForm = () => {
  const info = useContentStore.use.trackFormInfo();
  const setInfo = useContentStore.use.changeTrackFormInfo();

  return (
    <form>
      <Text
        label="Название трека"
        name="title"
        onChange={setInfo}
        value={info.title}
      />
      <Text label="Фиты" name="feats" onChange={setInfo} value={info.feats} />
      <label>Для взрослых?</label>
      <input
        name="explicit"
        checked={info.explicit}
        onChange={setInfo}
        type="checkbox"
      />
    </form>
  );
};

export default memo(TrackForm);
