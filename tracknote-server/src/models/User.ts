import mongoose from 'mongoose';
import { ALLOWED_ROLES } from 'types/roles.ts';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            enum: ALLOWED_ROLES,
            default: 'USER',
        },
        // albums: {
        //     type: [mongoose.Schema.ObjectId],
        //     ref: 'Album',
        //     default: []
        // }
    },
    {
        timestamps: true,
    }
);

// UserSchema.virtual('albums', {
//     ref: 'Album',
//     localField: '_id',
//     foreignField: 'owner',
// });

// UserSchema.plugin(mongooseLeanVirtuals);

const User = mongoose.model('User', UserSchema, 'User');

export default User;
