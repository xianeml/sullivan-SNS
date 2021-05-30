import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, OutlinedInput, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
}));

const edit = () => {
  const classes = useStyles();

  return (
    <div>
      <Card variant='outlined'>
        <CardContent>
          <Grid container justify='center'>
            사진 미리보기
          </Grid>
        </CardContent>
      </Card>
      <Card variant='outlined'>
        <CardContent>
          <Grid container direction='row' alignItems='center'>
            <Grid item md={2} xs={12}>
              <label htmlFor='file' className={classes.label}>
                사진첨부
              </label>
            </Grid>
            <Grid item md={10} xs={12}>
              <input id='file' type='file' />
            </Grid>
          </Grid>
          <Grid container direction='row' alignItems='center'>
            <Grid item md={2} xs={12}>
              <label htmlFor='caption' className={classes.label}>
                문구입력
              </label>
            </Grid>
            <Grid item md={10} xs={12}>
              <TextField
                autoFocus
                margin='dense'
                id='caption'
                multiline
                variant='outlined'
                placeholder='문구 입력...'
                rows='4'
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container direction='row' alignItems='center'>
            <Grid item md={2} xs={12}>
              <label htmlFor='place' className={classes.label}>
                위치 추가
              </label>
            </Grid>
            <Grid item md={10} xs={12}>
              <TextField
                autoFocus
                margin='dense'
                id='place'
                type='text'
                variant='outlined'
                placeholder='위치 추가'
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container direction='row' alignItems='center'>
            <Grid item md={2} xs={12}>
              <label htmlFor='tagging' className={classes.label}>
                사람 태그
              </label>
            </Grid>
            <Grid item md={10} xs={12}>
              <TextField
                autoFocus
                margin='dense'
                id='tagging'
                type='text'
                variant='outlined'
                placeholder='태그하기'
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify='flex-end'>
            <Button size='small'>목록</Button>
            <Button size='small'>공유</Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default edit;
