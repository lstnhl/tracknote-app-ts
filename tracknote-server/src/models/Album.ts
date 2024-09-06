import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'New Album',
        },
        description: {
            type: String,
        },
        cover: {
            type: String,
            default: ''
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tracks: {
            type: [mongoose.Schema.ObjectId],
            ref: 'Track',
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// AlbumSchema.virtual('tracks', {
//     ref: 'Track',
//     localField: '_id',
//     foreignField: 'inAlbum',
// });

const Album = mongoose.model('Album', AlbumSchema, 'Album');

export default Album;
