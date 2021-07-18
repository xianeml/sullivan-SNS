import React from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '1rem',
  },
  feedBtn: {
    marginRight: '1rem',
  },
}));

const SubmitButton = () => {
  const classes = useStyles();
  const router = useRouter();

  function moveToFeedPage() {
    router.push('/feed');
  }

  return (
    <Grid container justify='flex-end' className={classes.container}>
      <Button
        className={classes.feedBtn}
        size='large'
        variant='outlined'
        color='secondary'
        onClick={moveToFeedPage}
      >
        목록
      </Button>
      <Button
        form='edit'
        type='submit'
        variant='outlined'
        color='primary'
        size='large'
      >
        공유
      </Button>
    </Grid>
  );
};

export default SubmitButton;
