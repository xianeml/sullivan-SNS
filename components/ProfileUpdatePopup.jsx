import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from './Avatar';
import { Divider, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  link: {
    cursor: 'pointer',
    margin: '1rem 0',
    color: '#2196f3',
    fontWeight: 'bold',
  },
  formGroup: {
    padding: '2rem',
  },
  label: {
    fontWeight: 'bold',
  },
}));

export default function ProfileUpdatePopup() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        프로필 수정하기
      </Button>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent>
          <form>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            >
              <Avatar />
              <Link
                component='label'
                variant='contained'
                className={classes.link}
                underline='none'
              >
                프로필 사진 바꾸기
                <input type='file' hidden />
              </Link>
            </Grid>
            <Divider variant='middle' light />
            <div className={classes.formGroup}>
              <Grid container direction='row' alignItems='center'>
                <Grid item md={2} xs={12}>
                  <label htmlFor='userName' className={classes.label}>
                    사용자 이름
                  </label>
                </Grid>
                <Grid item md={10} xs={12}>
                  <TextField
                    margin='dense'
                    id='userName'
                    type='text'
                    variant='outlined'
                    placeholder='사용자 이름'
                    disabled
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container direction='row' alignItems='center'>
                <Grid item md={2} xs={12}>
                  <label htmlFor='webPage' className={classes.label}>
                    웹사이트
                  </label>
                </Grid>
                <Grid item md={10} xs={12}>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='webPage'
                    type='text'
                    variant='outlined'
                    placeholder='웹사이트'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container direction='row' alignItems='center'>
                <Grid item md={2} xs={12}>
                  <label htmlFor='caption' className={classes.label}>
                    소개
                  </label>
                </Grid>
                <Grid item md={10} xs={12}>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='caption'
                    multiline
                    variant='outlined'
                    placeholder='소개'
                    rows='4'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size='large'>
            취소
          </Button>
          <Button
            className={classes.primary}
            onClick={handleClose}
            size='large'
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
