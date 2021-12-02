// server/index.js

const express = require('express');
var bodyParser = require('body-parser');
const {Client} = require('pg');
const client = new Client();
require('dotenv').config();
const cloudinary = require('cloudinary').v2
client.connect()

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json({limit: '50mb'}));

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/submit", jsonParser, async(req, res) => {
  const data = req.body;
  let patient = null;
  try {
    const imgUpload = await cloudinary.uploader.upload(data.photo_url, {
      resource_type: 'image',
    })
    console.log(imgUpload);
    data.photo_url = imgUpload.secure_url;
  } catch(err) {
    console.log(err)
    res.status(500).json(({error: 'Error uploading image.'}))
  }
  try {
    const text = 'INSERT INTO patients(name, dob, phone_num, email, address, photo_url, appt_time) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [
      data.name,
      data.dob,
      data.phone_num,
      data.email,
      data.address,
      data.photo_url,
      data.appt_time,
    ];
    const queryRes = await client.query(text, values)
    patient = queryRes.rows[0];
  } catch(err) {
    console.log(err)
    res.status(500).json({error: 'Error adding patient to database.'})
  }
  res.json({patient});
});

app.get("/submissions", async(req, res) => {
  const test = await client.query('SELECT * FROM patients')
  res.json(
    {
      submissions: test.rows,
    }
  );
});
