import React from 'react';
import firebase from '../firestores/firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import db from '../firestores/db';
import { v4 as uuidv4, v4 } from 'uuid'; // uid 생성 함수
import UserStore from '../firestores/UserStore';
import { observer } from 'mobx-react';
import Index from '.';
import redirect from 'nextjs-redirect';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import UserStores from '../firestores/UserStore';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
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
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
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

// 로그인 버튼 클릭시 firebase 와 로그인 연결
const loginfuntion = () => {
  var count = 0;
   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    // 파이어 베이스가 셰션에 유지 되어 있는지 확인
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        db.collection('user')
        .get()
        .then((answer) => {
          answer.forEach((element) => {
            if (element.data().uid == user.uid) {
              count = count + 1;
              UserStore.userinfo = {
                uid: element.data().uid,
                displayName: element.data().displayName,
                photoUrl: element.data().photoUrl,
                webpage: element.data().webpage,
                caption: element.data().caption,
                likeFeeds: element.data().likeFeeds,
                feedList: element.data().feedList,
              };
              console.log('존재 하는 유저');
            }
          })
        })
        .catch((error) => {
          alert('error' + error.message);
          console.log(error);
        });
      }
      else{
        firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log(
        'result.credential.accessToken',
        result.credential.accessToken
      );
      console.log('result.user', result.user);
      db.collection('user')
        .get()
        // user db 중 uid 가 같은 것이 있나 탐색(같은 것이 있을 경우 이미 회원가입 된 유저)
        .then((answer) => {
          answer.forEach((element) => {
            if (element.data().uid == result.user.uid) {
              count = count + 1;
              UserStore.userinfo = {
                uid: element.data().uid,
                displayName: element.data().displayName,
                photoUrl: element.data().photoUrl,
                webpage: element.data().webpage,
                caption: element.data().caption,
                likeFeeds: element.data().likeFeeds,
                feedList: element.data().feedList,
              };
              console.log('존재 하는 유저');
            }
          });

          if (count == 0) {
            console.log('새로운 사용자');
            // No user is signed in.
            UserStore.userinfo = {
              uid: result.user.uid,
              displayName: result.user.displayName,
              photoUrl: result.user.photoURL,
              webpage: '',
              caption: '',
              likeFeeds: '',
              feedList: [],
            };
            db.collection('user')
              .doc(result.user.uid)
              .set(UserStore.userinfo)
              .then((res) => {
                console.log('db에들어감');
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          alert('error' + error.message);
          console.log(error);
        });
    })
    .catch((error) => {
      alert('login error:' + error.message);
      console.log(error);
    });
      }
      
    
  })
})
  .catch((error) => {
    alert('login error:' + error.message);
    console.log(error);
  });


  
};

const login = observer(({ login }) => {
  const classes = useStyles();
  const router = useRouter();
  if (UserStores.userinfo !=null){
    router.push('/')
  }
  return (
    <div>
      {UserStore.userinfo == null && (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sullivan-SNS
            </Typography>
            <form className={classes.form} noValidate>
              <Button
                fullWidth
                variant='contained'
                size='small'
                color='primary'
                onClick={loginfuntion}
              >
                <Avatar src='images/google.png' className={classes.avatar} />
                <Typography component='p' variant='h6'>
                  Sign in with Google
                </Typography>
              </Button>

              <Box mt={8}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Container>
      )}
      {/* {UserStore.userinfo!= null&&(
         window.location.href = '/'
      )} */}
    </div>
  );
});

export default login;
