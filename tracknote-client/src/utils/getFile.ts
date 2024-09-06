import { BASE_URL } from "api/axios";

export const getFile = (url: string) => {
    return `${BASE_URL}/static/${url}`;
}