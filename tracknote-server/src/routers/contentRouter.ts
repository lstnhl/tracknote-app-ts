import { Router } from 'express';
import contentController from 'controllers/contentController.ts';
import authCheck from 'middlewares/authMiddleware.ts';
import upload from 'utils/multer.ts';

const contentRouter = Router();

contentRouter.get('/album', authCheck('USER'), contentController.getAllAlbums);
contentRouter.get('/album/:id', authCheck('USER'), contentController.getAlbum);
contentRouter.post('/album', authCheck('USER'), contentController.createAlbum);
contentRouter.delete(
    '/album/:id',
    authCheck('USER'),
    contentController.deleteAlbum
);
contentRouter.put(
    '/album/:id',
    authCheck('USER'),
    upload.single('cover'),
    contentController.editAlbum
);
contentRouter.post(
    '/album/:id/add_track',
    authCheck('USER'),
    contentController.addTrackToAlbum
);

export default contentRouter;
