import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiPhoneNumber from "material-ui-phone-number";
import firebase from 'firebase';
import {useState , useEffect}  from 'react'
import {GoogleOutlined , FacebookOutlined} from '@ant-design/icons'
const Login = (props) => {
    console.log(props)
    const { history, location } = props
    let test = false
    // const {email, setEmail , password , setPassword , emailError, setEmailError , passwordError , setPasswordError, handleLogin , handleSignup , hasAccount , setHasAccount} = props;
    if (location.pathname === '/login'){
      test = true;
    }
    else{
      test = false; 
    }

    const [user, setUser]  = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError , setPasswordError] = useState('')
    const [hasAccount, setHasAccount] = useState(test)
  
    const clearInput = () => {
      setEmail('')
      setPasswordError('')
    }
  
    const clearError = ()  => {
      setEmailError('')
      setPasswordError('')
    }  
  
    const handleLogin = () => {
      clearError()
      firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch((err => {
          switch(err.code){
            case 'auth/invalid-email':
            case 'auth/user-disabled':
            case 'auth/user-not-found':
              setEmailError(err.message)
              break;
            case 'auth/wrong-password':
              setPasswordError(err.message)
              break;
          }
        }))
  
       
    }
  
    const handleSignup = () =>{
      clearError()
      firebase
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch((err => {
          switch(err.code){
            case 'auth/email-already-in-use':
            case 'auth/invalid-email':
              setEmailError(err.message)
              break;
            case 'auth/weak-password':
              setPasswordError(err.message)
              break;
          }
        }))
    }
  
  
  const handleLogout = () => {
    firebase.auth().signOut();
  }
  
  
  const authListner = () => {
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        clearInput()
        setUser(user);
        localStorage.setItem('userId',user.uid)
        if(location.pathname === '/login' || location.pathname === '/signup')
        history.push('/')
        else
        history.push(location.pathname)
      }else{
        setUser('');
      }
    })
  }
  
  
  useEffect(() => {
    authListner();
  }, [])













  const handleSignin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    
      setEmail(data.get('email'))
      setPassword(data.get('password'))
      handleLogin()
      
    };

    const handleRegister = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      
        setEmail(data.get('email'))
        setPassword(data.get('password'))
        handleSignup()
        
      };

  return (
    
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {hasAccount?(
            <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSignin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <div 
                    className="login-button google"
                    onClick={() => firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                > 
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      <GoogleOutlined />Sign In With Google
                    </Button>
                </div>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Don't have an account? <a href="#" onClick ={() => setHasAccount(!hasAccount) }>Sign Up</a>
                  </Typography>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
          ) : (     // ---------------------------------------/////////////-------------------------------------------------------- ////////////////////
            <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {/* <MuiPhoneNumber
                    name="phone"
                    label="Phone Number"
                    data-cy="user-phone"
                    defaultCountry={"in"}
                  /> */}
                  
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Typography variant="body2">
                    Already have an account? <a href="#" onClick ={() => setHasAccount(!hasAccount) }>Sign In</a>
                  </Typography>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
          ) 
          }
          
          <p style={{ margin: "5px 30px", backgroundColor: "#eae9e9", color: "red"}}>{emailError}</p>
          <p style={{ margin: "5px 30px", backgroundColor: "#eae9e9", color: "red" }}>{passwordError}</p>
          
        </Grid>
      </Grid>
    
  );
}

export default Login