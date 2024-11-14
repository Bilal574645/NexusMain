import multer from 'multer';

const storage = multer.diskStorage({
  destination: './public/uploads', // Store files in public/uploads directory
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
