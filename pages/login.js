import React from 'react';
import firebase from '../firestores/firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import db from "../firestores/db";
import {v4 as uuidv4, v4} from 'uuid'; // uid 생성 함수

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   
  },
  avatar: {
    margin: theme.spacing(1),

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
 

}));
const loginfuntion=() => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then(function (result){
    console.log('result.credential.accessToken',result.credential.accessToken);
    console.log('result.user',result.user);
    alert("login sucessed:"+result.user);
    const userContent ={
      uid:result.user.uid,
      displayName:result.user.displayName,
      profilUrl: result.user.photoURL,
      webpage:"" ,
      caption:"" ,
      likeFeeds:"",
      feedList:"",
  
    }
    db.collection('user')
    .doc(result.user.uid)
    .set(userContent)
    .then( res =>{
      console.log("db에들어감");
    }
    )
    .catch(error=>{
      console.log(error);
    })
    // myStore.use = {
    //   displayName: result.user.displayName,
    //   photoURL:result.user.photoURL,
    //   email:result.user.email,
    //   uid:result.user.uid
    // }
  })
  .catch(error =>{
    alert('login error:' +error.message);
    console.log(error);
  });

};

const login = () => {
  
  const classes = useStyles();
  return (
  
<Container  component="main" maxWidth="xs">
      <CssBaseline />
  
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sullivan-SNS
        </Typography>
        <form className={classes.form} noValidate>
          {/* <TextField
            variant="outlined"
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
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          <Button fullWidth variant="contained"  size="small" color="primary" onClick={loginfuntion}>
        <Avatar src="images/google.png" className={classes.avatar} />
         <Typography component='p' variant='h6' >
          Sign in with Google
        </Typography>
        </Button>
        
        <Box mt={8}>
        <Copyright />
      </Box>
        </form>
      </div>

    </Container>
     
    
 
  );
};

export default login;