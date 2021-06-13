import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '../components/common/Avatar';
import ProfileUpdatePopup from '../components/ProfileUpdatePopup';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Snackbar from '../components/common/Snackbar';
import { observer } from 'mobx-react';
import db from '../firestores/db';
import UserStore from '../firestores/UserStore';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  divider: {
    margin: theme.spacing(6, 0),
  },
  imgContainer: {
    overflow: 'hidden',
    width: '400px',
    height: '400px',
  },
  feedImg: {
    padding: theme.spacing(1),
    width: 'auto',
    height: '100%',
  },
  profile: {
    paddingTop: '3rem',
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
    uid: UserStore.userinfo.uid,
    displayName: UserStore.userinfo.displayName,
    photoUrl: UserStore.userinfo.photoUrl,
    caption: UserStore.userinfo.caption,
    webpage: UserStore.userinfo.webpage,
    feedList: UserStore.userinfo.feedList,
    likeFeeds: UserStore.userinfo.likeFeeds,
  });
  const [feedList, setFeedList] = useState(user.feedList);
  const [popupOpen, setPopupOpen] = useState(false);

  const getUserFeedList = () => {
    const myFeedList = [];
    db.collection('feed')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          if (doc.data().author.uid === user.uid) {
            myFeedList.push(doc.data());
            setFeedList(myFeedList);
          }
        });
      });
  };

  useEffect(() => {
    getUserFeedList();
  }, []);

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
              <Typography variant='h6' component='h2' paragraph>
                {user.displayName}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction='row' spacing={2}>
                <Grid item>
                  <Typography variant='body1' component='h2' paragraph>
                    게시물 {feedList.length}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body1' component='h2' paragraph>
                    좋아하는 피드 수 {user.likeFeeds}
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
                {user.webpage}
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
        <Grid item md={4} sm={6} xs={12}>
          <div className={classes.imgContainer}>
            <img
              src={feedList[0].photoUrl}
              alt={feedList[0].caption}
              className={classes.feedImg}
            />
          </div>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <div className={classes.imgContainer}>
            <img
              src={feedList[0].photoUrl}
              alt={feedList[0].caption}
              className={classes.feedImg}
            />
          </div>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <div className={classes.imgContainer}>
            <img
              src={feedList[0].photoUrl}
              alt={feedList[0].caption}
              className={classes.feedImg}
            />
          </div>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <div className={classes.imgContainer}>
            <img
              src={feedList[0].photoUrl}
              alt={feedList[0].caption}
              className={classes.feedImg}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
});

export default myFeed;
