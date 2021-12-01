// server/index.js

const express = require("express");
var bodyParser = require('body-parser')
const {Client} = require('pg')
const client = new Client()
client.connect()

const PORT = process.env.PORT || 3001;

const app = express();

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/submit", jsonParser, async(req, res) => {
  const text = 'INSERT INTO patients(name, dob, phone_num, email, address, appt_time) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
  const values = Object.values(req.body).reduce((vals, cur) => {
    vals.push(cur);
    return vals;
  }, []);
  let patient = null;
  try {
    const res = await client.query(text, values)
    patient = res.rows[0];
    console.log(res.rows)
  } catch (err) {
    console.log(err)
    res.json({error: 'Error adding patient to database.'})
  }
  res.json({patient});
});

app.get("/submissions", async(req, res) => {
  const test = await client.query('SELECT * FROM patients')
  res.json(
    {
      // submissions: [
      //   {
      //     name: 'John Doe',
      //     dob: 'Thu Apr 05 1990 00:00:00 GMT-0400 (Eastern Daylight Time)',
      //     phone_num: '2015934809',
      //     email: 'john123doe@gmail.com',
      //     address: '101 Johnson St',
      //     photo_url: 'https://m.media-amazon.com/images/I/71xpUOAu-PL._AC_SX450_.jpg',
      //     appt_time: 'Wed Nov 10 2021 22:31:28 GMT-0500 (Eastern Standard Time)'
      //   },
      //   {
      //     name: 'Kanye West',
      //     dob: 'Wed Mar 03 1999 00:00:00 GMT-0500 (Eastern Standard Time)',
      //     phone_num: '2015934809',
      //     email: 'john123doe@gmail.com',
      //     address: '101 Johnson St',
      //     photo_url: 'https://i.ebayimg.com/images/g/zlMAAOSwbPJbLWmB/s-l300.jpg',
      //     appt_time: 'Wed Dec 15 2021 22:36:20 GMT-0500 (Eastern Standard Time)'
      //   },

      // ]
      submissions: test.rows,
    }
  );
});
