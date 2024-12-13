import fs from 'fs';
import path from 'path';

const storageDir = process.env.STORAGE_DIR;

const removeFile = (dir: string, filename: string) => {
    const filePath = path.join(storageDir, dir, filename);

    fs.unlink(filePath, (error) => {
        if (error) {
            console.log(error.message);
            return;
        }
    })
}

export default removeFile;