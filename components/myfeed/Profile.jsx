import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '../common/Snackbar';
import ProfileUpdatePopup from '../myfeed/ProfileUpdatePopup';

const useStyles = makeStyles((theme) => ({
  profile: {
    paddingTop: '3rem',
  },
}));

const Profile = ({ user, feedList }) => {
  const classes = useStyles();

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
  const closeResultMessage = (reason) => {
    if (reason === 'clickaway') return;
    setResultMessageOpen(false);
  };

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='center'
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
                    좋아하는 피드 수{' '}
                    {user.likeFeeds ? user.likeFeeds.length : 0}
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
                <a href={user.webpage} target='_blank'>
                  {user.webpage}
                </a>
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
              user={user}
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
    </>
  );
};

export default Profile;
