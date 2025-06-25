import { Router } from 'express';
import noteController from 'controllers/noteController.ts';
import authCheck from 'middlewares/authMiddleware.ts';

const noteRouter = Router();

// Защищаем все маршруты с помощью authMiddleware
noteRouter.use(authCheck('USER'));

// Создание новой заметки
noteRouter.post('/', noteController.createNote);

// Получение всех заметок пользователя
noteRouter.get('/', noteController.getAllNotes);

// Получение заметок, прикрепленных к конкретному треку
noteRouter.get('/track/:trackId', noteController.getNotesByTrack);

// Обновление заметки
noteRouter.patch('/:id', noteController.updateNote);

// Удаление заметки
noteRouter.delete('/:id', noteController.deleteNote);

export default noteRouter;
