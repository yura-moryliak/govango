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

export const carImagesStorage = {
  storage: diskStorage({
    destination: './uploads/cars',
    filename: (req, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = extname(file.originalname);
      const fileName = `car-${(req.user as any).userId}-${uniqueSuffix}${extension}`;
      callback(null, fileName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024, // 1MB
    files: 5,
  },
  fileFilter: (_, file, callback) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Unsupported file type'), false);
    }
  },
};
