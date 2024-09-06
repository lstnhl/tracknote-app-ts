import { Request, Response } from 'express';
import Album from 'models/Album.ts';
import Track from 'models/Track.ts';
import removeFile from 'utils/removeFile.ts';

class ContentController {
    async getAllAlbums(req: Request, res: Response) {
        const albums = await Album.find({ owner: req.userId }).select(
            '-__v -tracks -updatedAt'
        );

        if (albums.length === 0) {
            return res.status(200).json({
                message: 'У вас нет альбомов',
            });
        }

        res.status(200).json({
            message: `У вас ${albums.length} альбомов`,
            albums,
        });
    }

    async getAlbum(req: Request, res: Response) {
        try {
            const albumId = req.params.id;
            const album = await Album.findOne({
                _id: albumId,
                owner: req.userId,
            })
                .select('-__v -owner')
                .populate({
                    path: 'tracks',
                    select: '_id title order',
                });

            if (!album) {
                return res.status(400).json({
                    message: 'Такой альбом не существует',
                });
            }

            res.json(album);
        } catch (e) {
            res.status(500).json({
                message: 'Ошибка получения альбома',
            });
        }
    }

    async createAlbum(req: Request, res: Response) {
        try {
            const { title, description } = req.body;

            if (!title) {
                return res.status(400).json({
                    message: 'Неверное название альбома',
                });
            }

            const newAlbum = await Album.create({
                title,
                owner: req.userId,
            });

            if (description) {
                newAlbum.description = description;
            }

            await newAlbum.save();

            res.status(200).json(newAlbum);
        } catch (e) {
            res.status(500).json({
                message: 'Ошибка создания альбома',
            });
        }
    }

    async editAlbum(req: Request, res: Response) {
        try {
            const albumId = req.params.id;
            const { title, description } = req.body;
            const cover = req.file ? req.file.filename : '';

            if (!title && !cover && !description) {
                return res.status(400).json({
                    message: 'Не введены данные для редактирования',
                });
            }

            const album = await Album.findOne({
                _id: albumId,
                owner: req.userId,
            });

            if (!album) {
                return res.status(400).json({
                    message: 'Такой альбом не существует',
                });
            }

            if (title) {
                album.title = title;
            }

            if (description) {
                album.description = description;
            }

            if (cover) {
                removeFile('cover', album.cover);
                album.cover = cover;
            }

            await album.save();

            res.status(200).json({
                message: 'Альбом успешно отредактирован',
                album,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Ошибка редактирования альбома',
            });
        }
    }

    async deleteAlbum(req: Request, res: Response) {
        try {
            const albumId = req.params.id;

            const album = await Album.findOne({
                _id: albumId,
                owner: req.userId,
            });

            if (!album) {
                return res.status(400).json({
                    message: 'Такой альбом не существует',
                });
            }

            await Track.deleteMany({ inAlbum: album._id });
            await Album.deleteOne({ _id: albumId });

            res.status(200).json({
                message: 'Альбом и все его треки удалены',
            });
        } catch (e) {
            res.status(500).json({
                message: 'Ошибка удаления альбома',
            });
        }
    }

    async addTrackToAlbum(req: Request, res: Response) {
        try {
            const albumId = req.params.id;
            const { title } = req.body;

            if (!title) {
                return res.status(400).json({
                    message: 'Некорректное название трека',
                });
            }

            const album = await Album.findOne({
                _id: albumId,
                owner: req.userId,
            }).select('-__v');

            if (!album) {
                return res.status(400).json({
                    message: 'Такой альбом не существует',
                });
            }

            const newTrack = await Track.create({
                title,
                order: album.tracks.length + 1,
                inAlbum: album,
            });

            album.tracks.push(newTrack._id);

            await newTrack.save();
            await album.save();

            const trackToClient = await Track.findById(newTrack._id).select(
                '-__v -inAlbum'
            );

            res.status(200).json(trackToClient);
        } catch (e) {
            res.status(500).json({
                message: 'Не удалось добавить трек',
            });
        }
    }
}

export default new ContentController();
