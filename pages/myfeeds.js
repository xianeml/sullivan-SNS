import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '../components/Avatar';
import ProfileUpdatePopup from '../components/ProfileUpdatePopup';
import { Divider, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

const myFeed = () => {
  const classes = useStyles();

  const [popupOpen, setPopupOpen] = React.useState(false);

  const openProfileUpdatePopup = () => {
    setPopupOpen(true);
  };

  const closeProfileUpdatePopup = () => {
    setPopupOpen(false);
  };

  function FormRow() {
    return (
      <>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper} min>
            item
          </Paper>
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
          <Avatar size={2} />
        </Grid>
        <Grid item>
          <Grid container direction='column'>
            <Grid item>
              <Typography variant='h6' component='h2' paragraph>
                계정 아이디(DB 연동 예정)
              </Typography>
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
              <Typography variant='subtitle2' component='h2'>
                사용자 이름
              </Typography>
              <Typography variant='caption' component='h2'>
                프로필 설명
              </Typography>
              <Typography
                variant='subtitle2'
                color='primary'
                component='h2'
                gutterBottom
              >
                www.sullivan-sns.com
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
};

export default myFeed;
