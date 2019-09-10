const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const multer = require("multer");
const cloudinaryStorage = require("multer-storage-cloudinary");
const dotenv = require('dotenv');

const users = require('./routes/users');
const teams = require('./routes/teams');
const news = require('./routes/news');
const results = require('./routes/results');
const leagueTable = require('./routes/league-table');

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

app.get('/cloudinary', function(req, res) {
  res.send('<form method="post" action="/cloudinary" enctype="multipart/form-data">'
    + '<p>Image: <input type="file" name="image"/></p>'
    + '<p><input type="submit"></p>'
    + '</form>');
});

app.post('/cloudinary', parser.single("image"), (req, res) => {
 res.send(req.file); // to see what is returned to you
});

//обязательно ограничивать домены
app.use(cors({origin: true}));

app.use('/users', users);
app.use('/teams', teams);
app.use('/news', news);
app.use('/results', results);
app.use('/league-table', leagueTable);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
console.log(`server running at: http://localhost:${port}/`);
app.listen(port);

