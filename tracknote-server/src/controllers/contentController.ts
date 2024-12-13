import { Response } from 'express';
import Album from 'models/Album.ts';
import Track from 'models/Track.ts';
import removeFile from 'utils/removeFile.ts';
import RequestWithUserId from 'types/RequestWithUserId.ts';

class ContentController {
  // ALBUMS

  async getAllAlbums(req: RequestWithUserId, res: Response) {
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

  async getAlbum(req: RequestWithUserId, res: Response) {
    try {
      const albumId = req.params.id;
      const album = await Album.findOne({
        _id: albumId,
        owner: req.userId,
      })
        .select('-__v -owner')
        .populate({
          path: 'tracks',
          select: '_id title order feats explicit',
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

  async createAlbum(req: RequestWithUserId, res: Response) {
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

  async editAlbum(req: RequestWithUserId, res: Response) {
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

  async deleteAlbum(req: RequestWithUserId, res: Response) {
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

  // TRACKS

  async addTrackToAlbum(req: RequestWithUserId, res: Response) {
    try {
      const albumId = req.params.id;
      const { title, explicit, feats } = req.body;

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
        explicit,
        order: album.tracks.length + 1,
        inAlbum: album,
      });

      if (feats !== '') {
        newTrack.feats = feats;
      }

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

  async deleteTrack(req: RequestWithUserId, res: Response) {
    try {
      const trackId = req.params.trackId;

      if (!trackId) {
        return res.status(400).json({
          message: 'Не введён ID трека',
        });
      }

      const track = await Track.findOne({
        _id: trackId,
      });

      if (!track) {
        return res.status(400).json({
          message: 'Не найден трек',
        });
      }

      const album = await Album.findOne({
        _id: track.inAlbum,
        owner: req.userId,
      });

      if (!album) {
        return res.status(400).json({
          message: 'Не найден альбом',
        });
      }

      const deletedOrder = track.order;

      album.tracks.forEach(async (track) => {
        const tempTrack = await Track.findOne({ _id: track });
        if (!tempTrack || !tempTrack.order) {
          return res.send(500).json({
            message: 'Что-то не так...'
          })
        }

        if (deletedOrder && tempTrack.order > deletedOrder) {
          tempTrack.order = tempTrack.order - 1;
          await tempTrack.save();
        }
      });

      //   if (deletedOrder && deletedOrder < album.tracks.length) {
      //     for (let i = deletedOrder + 1; i <= album.tracks.length; i++) {
      //       const tempTrack = await Track.findOne({ order: i });
      //       if (tempTrack && tempTrack.order) {
      //         tempTrack.order = tempTrack.order - 1;
      //         tempTrack.save();
      //       }
      //     }
      //   }

      await track.deleteOne();

      album.tracks = album.tracks.filter((track) => !track._id.equals(trackId));
      await album.save();

      const updatedAlbum = await Album.findOne({
        _id: album._id,
        owner: req.userId,
      })
        .select('-__v -owner')
        .populate({
          path: 'tracks',
          select: '_id title order feats explicit',
        });

      res.json(updatedAlbum);
    } catch (e) {
      res.status(500).json({
        message: 'Не удалось удалить трек',
      });
    }
  }

  async editTrack(req: RequestWithUserId, res: Response) {
    try {
      const trackId = req.params.trackId;
      const { title, explicit, feats } = req.body;

      if (!trackId) {
        return res.status(400).json({
          message: 'Не введён ID трека',
        });
      }

      const track = await Track.findOne({
        _id: trackId,
      });

      if (!track) {
        return res.status(400).json({
          message: 'Не найден трек',
        });
      }

      const album = await Album.findOne({
        _id: track.inAlbum,
        owner: req.userId,
      });

      if (!album) {
        return res.status(400).json({
          message: 'Это не ваш трек!',
        });
      }

      if (title) {
        track.title = title;
      }

      if (feats) {
        track.feats = feats;
      } else {
        track.feats = [];
      }

      if (explicit) {
        track.explicit = explicit;
      }

      await track.save();

      const updatedAlbum = await Album.findOne({
        _id: album._id,
        owner: req.userId,
      })
        .select('-__v -owner')
        .populate({
          path: 'tracks',
          select: '_id title order feats explicit',
        });

      res.json(updatedAlbum);
    } catch (e) {
      if (e instanceof Error) {
        res.send(500).json({
          message: e.message ? e.message : 'Не удалось отредактировать трек',
        });
      }
    }
  }
}

export default new ContentController();
