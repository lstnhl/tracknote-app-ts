import api from "api/axios";
import { options } from "api/authOptions";

export const getNotes = () => {
    return api.get('/notes', options());
};

export const createNote = () => {
    return api.post('/notes', {}, options());
};

export const updateNote = (_id: string, title: string, text: string) => {
    return api.patch(`/notes/${_id}`, {
        title,
        text
    }, options())
}

export const deleteNote = (_id: string) => {
    return api.delete(`/notes/${_id}`, options())
}