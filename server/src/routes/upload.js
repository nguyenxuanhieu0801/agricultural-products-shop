const cloudinary = require('cloudinary');
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('configs/environments');
const fs = require('fs');

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

export const uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        // path: 'agricultural-store',
        upload_preset: 'agricultural-store',
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: 'Upload image failed.' });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
