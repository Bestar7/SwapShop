import { diskStorage } from "multer";
import { extname } from "path";

const storage = diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  }
});

function generateFilename(file: Express.Multer.File) {
  return `${crypto.randomUUID()}${extname(file.originalname)}`;
}

export { storage }