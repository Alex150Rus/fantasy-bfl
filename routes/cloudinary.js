const express = require('express');
const cloudinary = require('cloudinary');
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

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

app.get('/', function(req, res) {
  res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>Image: <input type="file" name="image"/></p>'
    + '<p><input type="submit"></p>'
    + '</form>');
});

app.post('/', parser.single("image"), (req, res) => {
 console.log; // to see what is returned to you
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
console.log(`server running at: http://localhost:${port}/`);
app.listen(port);