import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';

export default function Register() {
  const [values, setValues] = React.useState({});

  const handleFormChange = (key, value) => {
    setValues({...values, [key]: value});
    console.log({...values, [key]: value});
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const uploadHandler = async(event) => {
    console.log(event.target.files[0]);
    if(event.target.files[0]) {
      const file = await toBase64(event.target.files[0])
      setValues({...values, photo_url: file});
    } else {
      setValues({...values, photo_url: null});
    }
  }

  const sendData = async() => {
    console.log(values);
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    // waits until the request completes...
    console.log(response);
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper 
        elevation={2} 
        sx={{
          padding: '15px 50px', 
          maxWidth: '500px', 
          width: '100%',
          marginBottom: '50px',
        }}
      >
        <Box 
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <h2>Register</h2>
          <FormControl>
            <InputLabel htmlFor="name-outlined">Name</InputLabel>
            <OutlinedInput
              id="name-outlined"
              onChange={(e) => handleFormChange('name', e.target.value)}
              label="Name"
              sx={{
                marginBottom: '25px',
              }}
            />
          </FormControl>
          <FormControl sx={{marginBottom: '25px'}}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="MM/DD/yyyy"
              value={values.dob || null}
              onChange={(e) => handleFormChange('dob', moment(e).format('MM/DD/yyyy'))}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="phonenum-outlined">Phone Number</InputLabel>
            <OutlinedInput
              id="phonenum-outlined"
              onChange={(e) => handleFormChange('phone_number', e.target.value)}
              label="Phone Number"
              sx={{
                marginBottom: '25px',
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="email-outlined">Email</InputLabel>
            <OutlinedInput
              id="email-outlined"
              onChange={(e) => handleFormChange('email', e.target.value)}
              label="Email"
              sx={{
                marginBottom: '25px',
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="address-outlined">Address</InputLabel>
            <OutlinedInput
              id="address-outlined"
              onChange={(e) => handleFormChange('address', e.target.value)}
              label="Address"
              sx={{
                marginBottom: '25px',
              }}
            />
          </FormControl>
          <FormControl 
            sx={{
              marginBottom: '25px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <Box 
              sx={{
                marginBottom: '5px', 
                fontSize: '14px',
                color: 'rgba(0, 0, 0, 0.6)',

              }}
            >
              Photo ID
            </Box>
            <Input
              accept="image/*"
              style={{display: 'none'}}
              id="contained-button-file"
              onChange={uploadHandler}
              type="file"
            />
            <label htmlFor="contained-button-file" style={{display: 'flex', alignItems: 'center'}}>
              <Button variant="contained" component="span" sx={{marginRight: '5px'}}>
                {`${values.photo_url ? 'Change Photo' : 'Upload'}`}
              </Button>
              {values.photo_url ? <CheckCircleIcon sx={{color: 'green'}} /> : null}
            </label> 
          </FormControl>
          <FormControl>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker
                label="Appointment Time"
                value={values.appt_time || null}
                onChange={(e) => handleFormChange('appt_time', moment(e).format('MM/DD/yyyy HH:mm'))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <Button 
            variant="contained" 
            onClick={sendData}
            sx={{
              margin: '25px 0',
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}