import React, { useState, useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import db from '../firestores/db';
import { v4 as uuidv4, v4 } from 'uuid';
import firebase from '../firestores/firebase';
import UserStore from '../firestores/UserStore';

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
  const uid = uuidv4();

  // 이미지 초기값은 프리뷰 이미지 등으로 세팅해두기
  const [photoUrl, setPhotoUrl] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('');
  const author = {
    displayName: UserStore.userinfo.displayName,
    photoURL: '',
    uid: UserStore.userinfo.uid,
  };
  const fileButton = useRef();

  const getPhotoUrl = () => {
    const file = fileButton.current.files[0];
    // reference 안에 key값 수정해야함
    const storageRef = firebase.storage().ref('mihyun123');
    const task = storageRef.put(file);
    task.then((snapshot) => {
      const getUrl = snapshot.ref.getDownloadURL();
      getUrl.then((url) => {
        setPhotoUrl(url);
      });
    });
  };

  async function submitHandler(event) {
    event.preventDefault();

    const feedData = {
      photoUrl,
      content,
      location,
      tag,
      author,
      create_at: new Date(),
    };
    try {
      await updateUserFeedList();
      await createFeed(feedData);
    } catch (error) {
      console.log(error);
    }
  }

  const updateUserFeedList = () => {
    // 1. 로그인한 사용자의 feedList 가져오기
    let userFeedList;
    db.collection('user')
      .doc(UserStore.userinfo.uid)
      .get()
      .then((res) => {
        userFeedList = res.data().feedList;
      });

    // 2. 업데이트를 위한 새로운 feedList 만들기
    let newFeedList;
    if (userFeedList) {
      newFeedList = [...userFeedList, { feedId: uid }];
    } else {
      newFeedList = [{ feedId: uid }];
    }

    // 3. 사용자의 feedList 업데이트하기
    db.collection('user')
      .doc(UserStore.userinfo.uid)
      .update({ feedList: newFeedList })
      .then((res) => {
        console.log('선생 피드리스트 업뎃 성공!');
      })
      .catch((err) => console.log(err));
  };

  const createFeed = (feedData) => {
    db.collection('feed')
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
                  ref={fileButton}
                  onChange={getPhotoUrl}
                />
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
