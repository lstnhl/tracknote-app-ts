import { useEffect, useCallback, memo, FC, ChangeEvent } from 'react';
import useNotesStore from 'stores/NotesStore';
import Note from 'components/Note';
import Button from 'components/UI/Button';
import Text from 'components/UI/Text';
import TextArea from 'components/UI/TextArea';
import useModal from 'stores/ModalStore';
import { INote } from 'types/AlbumProps';
import s from './NotesPage.module.scss';
import debounce from 'utils/debounce';

interface IEditModalProps {
    note: INote;
} 

const EditNoteModal: FC<IEditModalProps> = memo(({note}) => {
    const hideModal = useModal.use.hideModal();
    const deleteNote = useNotesStore.use.deleteNote();
    const currentNote = useNotesStore.use.currentNote();
    const setCurrentNote = useNotesStore.use.setCurrentNote();
    const editCurrentNote = useNotesStore.use.editCurrentNote();

    const debounceChange = useCallback(
        debounce((field: string, value: string) => {
            editCurrentNote(field, value);
        }, 400),
        []
    )

    useEffect(() => {
        setCurrentNote(note);
    }, [])

    if (!currentNote) {
        return
    }

    const handleDelete = () => {
        deleteNote(note._id);
        hideModal();
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        debounceChange(e.target.name, e.target.value);
    }

    return <div className={s.modal_container}>
        <Text onChange={handleTitleChange} name='title' initialValue={currentNote.title}/>
        <TextArea onChange={handleTitleChange} name='text' initialValue={currentNote.text}/>
        <Button onClick={handleDelete}>Удалить</Button>
    </div>
})

const NotesPage = () => {
  const notes = useNotesStore.use.notes();
  const getNotes = useNotesStore.use.getNotes();
  const createNote = useNotesStore.use.createNote();
  const resetCurrentNote = useNotesStore.use.resetCurrentNote();
  const updateNote = useNotesStore.use.updateNote();

  const showModal = useModal.use.showModal();

  useEffect(() => {
    getNotes();
  }, []);

  const handleAddNote = () => {
    createNote();
  };

  const handleClick = useCallback((note: INote) => {
    showModal(<EditNoteModal note={note}/>, '', () => {
        updateNote()
        resetCurrentNote()
    })
  }, []);

  return (
    <>
      <h1>Заметки</h1>
      <Button onClick={handleAddNote}>Новая заметка</Button>
      <div className={s.container}>
        {notes.map((note) => (
          <Note
            key={note._id}
            note={note}
            data-id={note._id}
            cb={handleClick}
          />
        ))}
      </div>
    </>
  );
};

export default NotesPage;
