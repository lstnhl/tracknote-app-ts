import { Request, Response } from 'express';
import Note from 'models/Note.ts';

class NoteController {
    async createNote(req: Request, res: Response) {
        req.errorContext = 'Ошибка создания заметки';
        const { title, text, attachedToTrack } = req.body;

        const owner = req.userId;

        const note = await Note.create({
            title: title || 'Новая Заметка',
            text: text || 'Текст заметки',
            owner,
            attachedToTrack: attachedToTrack || null,
        });

        res.status(201).json({
            message: 'Заметка успешно создана',
            data: note,
        });
    }

    async getAllNotes(req: Request, res: Response) {
        req.errorContext = 'Ошибка получения заметок';
        const owner = req.userId;
        const notes = await Note.find({ owner }).sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Заметки успешно получены',
            results: notes.length,
            data: notes,
        });
    }

    async getNotesByTrack(req: Request, res: Response) {
        req.errorContext = 'Ошибка получения заметок по треку';
        const owner = req.userId;
        const { trackId } = req.params;

        const notes = await Note.find({ owner, attachedToTrack: trackId });

        res.status(200).json({
            message: 'Заметки по треку успешно получены',
            results: notes.length,
            data: notes,
        });
    }

    async updateNote(req: Request, res: Response) {
        req.errorContext = 'Ошибка обновления заметки';
        const owner = req.userId;
        const { id } = req.params;
        const { title, text, attachedToTrack } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: id, owner },
            { title, text, attachedToTrack },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({
                message: 'Заметка не найдена или у вас нет прав для её редактирования',
            });
        }

        res.status(200).json({
            message: 'Заметка успешно обновлена',
            data: note,
        });
    }

    async deleteNote(req: Request, res: Response) {
        req.errorContext = 'Ошибка удаления заметки';
        const owner = req.userId;
        const { id } = req.params;

        const note = await Note.findOneAndDelete({ _id: id, owner });

        if (!note) {
            return res.status(404).json({
                message: 'Заметка не найдена или у вас нет прав для её удаления',
            });
        }

        res.status(204).json({
            message: 'Заметка успешно удалена',
        });
    }
}

export default new NoteController();
