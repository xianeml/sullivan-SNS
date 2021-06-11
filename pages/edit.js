import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import db from '../firestores/db';
import { v4 as uuidv4, v4 } from 'uuid';

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
  const router = useRouter();

  const [photoUrl, setPhotoUrl] = useState();
  const [content, setContent] = useState();
  const [location, setLocation] = useState();
  const [tag, setTag] = useState();
  const [author, setAuthor] = useState({
    displayName: 'mihyun',
    photoURL: 'url',
    uid: 'test',
  });

  async function submitHandler(event) {
    event.preventDefault();

    // setAuthor() 현재 로그인한 사용자로 setState 추가하기

    const feedData = {
      photoUrl: '',
      content,
      location,
      tag,
      author,
      create_at: new Date(),
    };
    try {
      await uploadFeed(feedData);
    } catch (error) {
      console.log(error);
    }
  }

  const uploadFeed = (feedData) => {
    const uid = uuidv4();

    db.collection('test-feed')
      .doc(uid)
      .set(feedData)
      .then((res) => {
        router.push('/myfeeds');
      })
      .catch((err) => console.log(err));
  };

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
          <form id='edit' className={classes.form} onSubmit={submitHandler}>
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <Grid container direction='row' alignItems='center'>
              <Grid item md={2} xs={12}>
                <label htmlFor='location' className={classes.label}>
                  위치 추가
                </label>
              </Grid>
              <Grid item md={10} xs={12}>
                <TextField
                  autoFocus
                  margin='dense'
                  id='location'
                  type='text'
                  variant='outlined'
                  placeholder='위치 추가'
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Grid>
            </Grid>
            <CardActions>
              <Grid container justify='flex-end'>
                <Button size='small'>목록</Button>
                <Button size='small' type='submit' form='edit'>
                  공유
                </Button>
              </Grid>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default edit;
