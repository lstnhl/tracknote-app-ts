import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        text: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        attachedToTrack: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Track',
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model('Note', NoteSchema, 'Note');

export default Note;
