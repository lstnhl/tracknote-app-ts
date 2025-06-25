import createSelectors from 'stores/createSelectors';
import { create } from 'zustand';
import { INote } from 'types/AlbumProps';
import { getNotes, createNote, deleteNote, updateNote } from 'api/notesApi';

interface INoteStore {
  notes: INote[];
  currentNote: INote | null;
  getNotes: () => void;
  createNote: () => void;
  updateNote: () => void;
  deleteNote: (_id: string) => void;
  setCurrentNote: (note: INote | null) => void;
  editCurrentNote: (field: string, value: string) => void;
  resetCurrentNote: () => void;
}

const useNotesStoreBase = create<INoteStore>()((set, get) => ({
  notes: [],
  currentNote: null,

  getNotes: async () => {
    await getNotes().then((res) => {
      set({
        notes: res.data.data,
      });
    });
  },

  createNote: async () => {
    await createNote().then(() => {
      get().getNotes();
    });
  },

  updateNote: async () => {
    const note = get().currentNote;
    if (!note) {
        return
    }

    await updateNote(note._id, note.title, note.text).then(() => {
      get().getNotes();
    });
  },

  deleteNote: async (_id) => {
    await deleteNote(_id).then(() => {
        get().getNotes();
        get().resetCurrentNote();
    })
  },

  setCurrentNote: async (note) => {
    set({
        currentNote: note
    })
  },

  editCurrentNote: async (field, value) => {
    const newNote = get().currentNote;
    if (!newNote) {
        return
    }

    set({
        currentNote: {
            ...newNote,
            [field]: value
        }
    })
  },

  resetCurrentNote: async () => {
    get().setCurrentNote(null);
  }
}));

const useNotesStore = createSelectors(useNotesStoreBase);

export default useNotesStore;
