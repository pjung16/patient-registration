const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

require('dotenv').config();
const {Pool} = require('pg');
let poolConfigs = null;
if(isProduction) {
  poolConfigs = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  poolConfigs = {
    connectionString: connectionString,
  };
};
const pool = new Pool(poolConfigs)
pool.connect();

var jsonParser = bodyParser.json();
const cloudinary = require('cloudinary').v2;

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json({limit: '50mb'}));

const publicPath = path.join(__dirname, '..', './client/build');
app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/submit", jsonParser, async(req, res) => {
  const data = req.body;
  let patient = null;
  // image upload logic
  try {
    const imgUpload = await cloudinary.uploader.upload(data.photo_url, {
      resource_type: 'image',
    })
    data.photo_url = imgUpload.secure_url;
  } catch(err) {
    console.log(err);
    res.status(500).json(({error: 'Error uploading image.'}));
  };
  // insert data into db
  try {
    const text = 'INSERT INTO patients(name, dob, phone_num, email, address, photo_url, appt_time) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [
      data.name,
      data.dob,
      data.phone_num,
      data.email,
      data.address,
      data.photo_url,
      data.appt_time,
    ];
    const queryRes = await pool.query(text, values);
    patient = queryRes.rows[0];
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Error adding patient to database.'});
  };
  res.json({patient});
});

app.get("/submissions", async(req, res) => {
  const data = await pool.query('SELECT * FROM patients');
  res.json({submissions: data.rows});
});

// serve build of react app
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});
