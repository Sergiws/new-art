import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename(req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `img-${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

export default upload;