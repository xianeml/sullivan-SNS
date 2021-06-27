import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import db from '../firestores/db';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firestores/firebase';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  imgPreview: {
    width: '60%',
  },
}));

const edit = () => {
  const classes = useStyles();
  const router = useRouter();
  const { feedUid } = router.query;
  const uid = uuidv4();

  const [updateMode, setUpdateMode] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('');
  const [author, setAuthor] = useState({});
  const fileButton = useRef();

  useEffect(() => {
    if (feedUid) {
      setUpdateMode(true);
      getFeedDetail();
    }
    getUser();
  }, []);

  const getUser = async () => {
    const userRef = db.collection('myuser').doc('SFCKJmd9KzCpO5H77wz1');
    const userSnapshot = await userRef.get();
    const userInfo = userSnapshot.data();
    setAuthor({
      uid: userInfo.uid,
      photoUrl: userInfo.photoUrl,
      displayName: userInfo.displayName,
    });
  };

  async function getPhotoUrl() {
    const file = fileButton.current.files[0];
    const storageRef = firebase.storage().ref(author.uid + '/' + uid);
    const saveFileTask = await storageRef.put(file);
    const downloadedPhotoUrl = await saveFileTask.ref.getDownloadURL();
    setPhotoUrl(downloadedPhotoUrl);
  }

  async function getFeedDetail() {
    try {
      const feedRef = db.collection('feed').doc(feedUid);
      const feedSnapshot = await feedRef.get();
      const feedDetail = feedSnapshot.data();
      setPhotoUrl(feedDetail.photoUrl);
      setContent(feedDetail.content);
      setLocation(feedDetail.location);
      setTag(feedDetail.tag);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      if (updateMode) {
        updateFeed();
      } else {
        await updateUserFeedList();
        await createFeed();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUserFeedList() {
    try {
      const userRef = db.collection('myuser').doc(author.uid);
      const userSnapshot = await userRef.get();
      const userFeedList = await userSnapshot.data().feedList;
      let newFeedList;
      if (userFeedList) {
        newFeedList = [...userFeedList, { feedId: uid }];
      } else {
        newFeedList = [{ feedId: uid }];
      }
      await userDocsRef.update({ feedList: newFeedList });
    } catch (error) {
      console.log(error);
    }
  }

  async function createFeed() {
    const createParams = {
      uid,
      photoUrl,
      content,
      location,
      tag,
      author,
      create_at: new Date(),
      like: 0,
    };

    try {
      const feedRef = db.collection('feed').doc(uid);
      await feedRef.set(createParams);
      moveToFeedPage();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateFeed() {
    const updateParams = {
      content,
      location,
      tag,
      author,
    };

    try {
      const feedRef = db.collection('feed').doc(feedUid);
      await feedRef.update(updateParams);
      moveToFeedPage();
    } catch (error) {
      console.log(error);
    }
  }

  const moveToFeedPage = () => {
    router.push('/feed');
  };

  return (
    <div>
      <Card variant='outlined'>
        <CardContent>
          <Grid container justify='center'>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt='미리보기'
                className={classes.imgPreview}
              />
            ) : (
              '사진 미리보기'
            )}
          </Grid>
        </CardContent>
      </Card>
      <Card variant='outlined'>
        <CardContent>
          <form id='edit' className={classes.form} onSubmit={submitHandler}>
            {!updateMode && (
              <Grid container direction='row' alignItems='center'>
                <Grid item md={2} xs={12}>
                  <label htmlFor='file' className={classes.label}>
                    사진첨부
                  </label>
                </Grid>
                <Grid item md={10} xs={12}>
                  <input
                    id='file'
                    type='file'
                    required
                    ref={fileButton}
                    onChange={getPhotoUrl}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container direction='row' alignItems='center'>
              <Grid item md={2} xs={12}>
                <label htmlFor='caption' className={classes.label}>
                  문구입력
                </label>
              </Grid>
              <Grid item md={10} xs={12}>
                <TextField
                  id='caption'
                  multiline
                  rows='4'
                  placeholder='문구 입력...'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  autoFocus
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                  id='location'
                  type='text'
                  placeholder='위치 추가'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  autoFocus
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
                  id='tagging'
                  type='text'
                  placeholder='태그하기'
                  variant='outlined'
                  margin='dense'
                  fullWidth
                  autoFocus
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Grid>
            </Grid>
            <CardActions>
              <Grid container justify='flex-end'>
                <Button size='large' onClick={moveToFeedPage}>
                  목록
                </Button>
                <Button
                  form='edit'
                  type='submit'
                  className={classes.primary}
                  size='large'
                >
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
