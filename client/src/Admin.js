import React, { useState, useEffect } from 'react';
import './Admin.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import moment from 'moment';

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(async() => {
    const response = await fetch('/submissions');
    const data = await response.json();
    setSubmissions(data.submissions);
  }, []);

  return (
    <Box sx={{
        padding: '15px 100px',
        '@media screen and (max-width: 600px)': {
          padding: '15px 25px',
        },
      }}
    >
      <h2>Admin</h2>
      <Grid container spacing={2}>
        {submissions.map((cur) => {
          const dob = moment(cur.dob);
          const appt_time = moment(cur.appt_time);
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cur.dob}>
              <Paper elevation={2}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    textAlign: 'left',
                  }}
                >
                  <Box 
                    className="card-image"
                  >
                    <img src={cur.photo_url} />
                  </Box>
                  <Box
                    sx={{
                      padding: '15px',
                    }}
                  >
                    <Box className="name">{cur.name}</Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginRight: '20px',
                        }}
                      >
                        <Box className="label">Age</Box>
                        <Box className="content">{moment().diff(dob, 'years')}</Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Box className="label">Date of Birth</Box>
                        <Box className="content">{dob.get('date')} {dob.format('MMMM')} {dob.get('year')}</Box>
                      </Box>
                    </Box>
                    <Box className="label">Appointment Date & Time</Box>
                    <Box className="content">{appt_time.get('date')} {appt_time.format('MMMM')} {appt_time.get('year')}</Box>
                    <Box className="label">Address</Box>
                    <Box className="content">{cur.address}</Box>
                    <Box className="label">Phone Number</Box>
                    <Box className="content">{cur.phone_num}</Box>
                    <Box className="label">Email Address</Box>
                    <Box className="content">{cur.email}</Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
}