const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
  const parser = multer({ storage: storage });

router.get('/', function(req, res) {
  res.send('<form method="post" action="https://fantasy-bfl.herokuapp.com/cloudinary" enctype="multipart/form-data">'
    + '<p>Public ID: <input type="text" name="title"/></p>'
    + '<p>Image: <input type="file" name="image"/></p>'
    + '<p><input type="submit" value="Upload"/></p>'
    + '</form>');
});

router.post('/', parser.single("image"), (req, res) => {
  res.send(req.file) // to see what is returned to you
  // 
});

module.exports = router;