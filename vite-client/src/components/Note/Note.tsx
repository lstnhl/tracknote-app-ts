import { FC } from 'react';
import { INote } from 'types/AlbumProps';
import s from './Note.module.scss';

interface INoteProps {
  note: INote;
  cb: (note: INote) => void;
}

const Note: FC<INoteProps> = ({ note, cb }) => {
  return <div className={s.container} onClick={() => {
    cb(note)
  }}>
    <p className={s.title}>{note.title}</p>
    <p className={s.text}>{note.text}</p>
    <div className={s.gradient}></div>
  </div>;
};

export default Note;
