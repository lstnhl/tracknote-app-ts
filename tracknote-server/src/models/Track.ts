import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'New Track',
        },
        explicit: {
            type: Boolean,
            default: false,
        },
        feats: {
            type: [String],
            default: [],
        },
        order: {
            type: Number,
        },
        inAlbum: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Album',
        },
    },
    {
        timestamps: true,
    }
);

const Track = mongoose.model('Track', TrackSchema, 'Track');

export default Track;
