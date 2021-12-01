import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import moment from 'moment';
import { Paper } from '@mui/material';

export default function Register() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [values, setValues] = React.useState({});

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleFormChange = (key, value) => {
    setValues({...values, [key]: value});
    console.log({...values, [key]: value});
  };

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
          width: '100%'
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
              value={values.dob}
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
          <FormControl sx={{marginBottom: '25px'}}>
            <div>Photo ID</div>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                Upload
              </Button>
            </label> 
          </FormControl>
          <FormControl>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker
                label="Appointment Time"
                value={values.appt_time}
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