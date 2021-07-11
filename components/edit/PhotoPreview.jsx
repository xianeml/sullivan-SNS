import React from 'react';
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '2rem 0',
  },
  imgPreview: {
    width: '45rem',
  },
  initialPreview: {
    width: '35rem',
    height: '20rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  previewText: {
    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(120%)',
      transform: 'scale(1.1)',
      transition: 'all 0.2s ',
    },
  },
  fileBtn: {
    display: 'none',
  },
}));

const PhotoPreview = ({ photoUrl, attachFile, loading }) => {
  const classes = useStyles();

  const handleAttachFile = () => {
    attachFile();
  };

  return (
    <Grid container justifyContent='center' className={classes.container}>
      {photoUrl ? (
        <img src={photoUrl} alt='미리보기' className={classes.imgPreview} />
      ) : (
        <Paper elevation={0} className={classes.initialPreview}>
          {loading ? (
            <CircularProgress color='primary' />
          ) : (
            <Typography
              variant='h2'
              component='div'
              align='center'
              color='primary'
              className={classes.previewText}
              onClick={handleAttachFile}
            >
              사진을 업로드 하세요.
              <input type='file' id='upload' className={classes.fileBtn} />
            </Typography>
          )}
        </Paper>
      )}
    </Grid>
  );
};

export default PhotoPreview;
