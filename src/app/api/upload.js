// src/pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'File upload failed' });
        return;
      }

      const file = files.file;
      const fileName = path.basename(file.filepath);
      res.status(200).json({ file: { filename: fileName } });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
