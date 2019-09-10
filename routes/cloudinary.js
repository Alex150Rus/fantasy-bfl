const express = require('express');
const router = express.Router();
const fs = require('fs');

var cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

// var app = express.createServer(express.logger());

router.get('/', function(req, res) {
  res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>Public ID: <input type="text" name="title"/></p>'
    + '<p>Image: <input type="file" name="image"/></p>'
    + '<p><input type="submit" value="Upload"/></p>'
    + '</form>');
});

router.post('/', function(req, res, next) {
  stream = cloudinary.uploader.upload_stream(function(result) {
    console.log(result);
    res.send('Done:<br/> <img src="' + result.url + '"/><br/>' +
             cloudinary.image(result.public_id, { format: "png", width: 100, height: 130, crop: "fill" }));
  }, { public_id: req.body.title } );
  fs.createReadStream(req.files.image.path, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
});

// if (!module.parent) {
//   var port = process.env.PORT || 5000;
//   app.listen(port, function() {
//     console.log("Listening on " + port);
//   });
// }

module.exports = router;