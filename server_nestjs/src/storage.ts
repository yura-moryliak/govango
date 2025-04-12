import { diskStorage } from 'multer';
import { extname } from 'path';

export const avatarFileUploadStorage = diskStorage({
  destination: './uploads/avatars',
  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = extname(file.originalname);
    const fileName = `${(req.user as any).userId}-${uniqueSuffix}${extension}`;
    callback(null, fileName);
  },
});

export const carImagesStorage = diskStorage({
  destination: './uploads/cars',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = extname(file.originalname);
    const fileName = `car-${(req.user as any).userId}-${uniqueSuffix}${extension}`;
    cb(null, `${fileName}${extension}`);
  },
});
