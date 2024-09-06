import fs from 'fs';
import path from 'path';

const storageDir = 'F:/MyFolber/Projects/tracknote-app-ts/tracknote-server/_storage';

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