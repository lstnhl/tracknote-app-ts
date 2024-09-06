import multer from 'multer';
import { randomUUID } from 'crypto';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `_storage/${file.fieldname}`); // Specify the directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, randomUUID()); // Append timestamp to original file name
    },
});

const upload = multer({storage: storage});

export default upload;