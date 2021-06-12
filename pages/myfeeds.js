import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '../components/common/Avatar';
import ProfileUpdatePopup from '../components/ProfileUpdatePopup';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Snackbar from '../components/common/Snackbar';
import { observer } from 'mobx-react';
import UserStore from '../firestores/UserStore';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  divider: {
    margin: theme.spacing(10, 0),
  },
  paper: {
    padding: theme.spacing(20, 2), //grid padding
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  profile: {
    paddingTop: '2rem',
  },
  container: {
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(0, 30),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}));

const myFeed = observer(({ myFeed }) => {
  const classes = useStyles();
  const [user, setUser] = useState({
    displayName: UserStore.userinfo.displayName,
    photoUrl: UserStore.userinfo.photoUrl,
    caption: UserStore.userinfo.caption,
    webpage: UserStore.userinfo.webpage,
  });
  // 프로필 업데이트 팝업
  const [popupOpen, setPopupOpen] = useState(false);

  const openProfileUpdatePopup = () => {
    setPopupOpen(true);
  };
  const closeProfileUpdatePopup = () => {
    setPopupOpen(false);
  };

  // 스낵바 알림창
  const [resultMessageOpen, setResultMessageOpen] = useState(false);

  const openResultMessage = () => {
    setResultMessageOpen(true);
  };
  const closeResultMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setResultMessageOpen(false);
  };

  function FormRow() {
    return (
      <>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </>
    );
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.profile}
        spacing={4}
      >
        <Grid item>
          <Avatar
            size={2}
            displayName={user.displayName}
            photoUrl={user.photoUrl}
          />
        </Grid>
        <Grid item>
          <Grid container direction='column'>
            <Grid item>
              {/* 로그인 되어 있을 경우 사용자 이름 display */}
              {UserStore.userinfo != null && (
                <Typography variant='h6' component='h2' paragraph>
                  {UserStore.userinfo.displayName}
                </Typography>
              )}
              {UserStore.userinfo == null && (
                <Typography variant='h6' component='h2' paragraph>
                  로그인 안되어 있음
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Grid container direction='row' spacing={2}>
                <Grid item>
                  <Typography variant='body1' component='h2' paragraph>
                    게시물 200
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1' component='h2' paragraph>
                    팔로워 200
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1' component='h2' paragraph>
                    팔로우 200
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='caption' component='h2'>
                {user.caption}
              </Typography>
              <Typography
                variant='subtitle2'
                color='primary'
                component='h2'
                gutterBottom
              >
                {user.website}
              </Typography>
            </Grid>
            <Button
              variant='outlined'
              color='primary'
              onClick={openProfileUpdatePopup}
            >
              프로필 수정하기
            </Button>
            <ProfileUpdatePopup
              open={popupOpen}
              closeHandler={closeProfileUpdatePopup}
              openResultMessageHandler={openResultMessage}
              defaultUserInfo={user}
            />
            <Snackbar
              open={resultMessageOpen}
              closeHandler={closeResultMessage}
              message={'프로필이 수정되었습니다.'}
              durationProps={1000}
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider variant='middle' light className={classes.divider} />
      <Grid container spacing={3} className={classes.container}>
        <FormRow />
      </Grid>
    </div>
  );
});

export default myFeed;
