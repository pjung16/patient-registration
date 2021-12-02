import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Register from './Register';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Box 
            sx={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '25px 50px 0 50px',
              '@media screen and (max-width: 600px)': {
                padding: '15px',
                flexDirection: 'column',
              },
            }}
          >
            <Box><Link to="/"><h2>Patient Registration</h2></Link></Box>
            <Box>
              <Link to="/"><Button sx={{textDecoration: 'none'}}>Home</Button></Link>
              <Link to="/register"><Button>Register</Button></Link>
              <Link to="/admin"><Button>Admin</Button></Link>
            </Box>
          </Box>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <div>
              <header className="App-header">
                <h2>Welcome to the patient registration website. Please register at the <Link to="/register">register link</Link>. To see submissions, check the <Link to="/admin">admin page</Link>.</h2>
              </header>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
