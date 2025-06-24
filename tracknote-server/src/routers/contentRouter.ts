import { Router } from 'express';
import contentController from 'controllers/contentController.ts';
import authCheck from 'middlewares/authMiddleware.ts';
import upload from 'utils/multer.ts';

const contentRouter = Router();
contentRouter.use(authCheck('USER'))

contentRouter.get('/album', contentController.getAllAlbums);
contentRouter.get('/album/:id', contentController.getAlbum);
contentRouter.post('/album', upload.single('cover'), contentController.createAlbum);
contentRouter.delete(
    '/album/:id',
    contentController.deleteAlbum
);
contentRouter.put(
    '/album/:id',
    upload.single('cover'),
    contentController.editAlbum
);
contentRouter.post(
    '/album/:id/add_track',
    contentController.addTrackToAlbum
);
contentRouter.delete(
    '/track/:trackId',
    contentController.deleteTrack
);
contentRouter.put(
    '/track/:trackId',
    contentController.editTrack
)

export default contentRouter;
