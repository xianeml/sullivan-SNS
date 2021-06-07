import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Grid, OutlinedInput, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import db from "../firestores/db";
import {v4 as uuidv4, v4} from 'uuid'; // uid 생성 함수

const useStyles = makeStyles((theme) => ({
  primary: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
}));

//이미지와 한줄글 최종 저장하는 함수!
function imageStateMsgAllSave() {
    console.log("imageStateMsgAllSave로 들어왔습니다");

    //파일을 파이어 베이스 스토리지에 저장하는 로직
    var fileButton = document.getElementById("fileButton");
    comment = document.getElementById("comment").value;
    alert(comment);
    //수정 버튼을 눌러서 fileButton 객체가 생기면~! 작동
    if (fileButton) {
        //fileButton.addEventListener('change', function (e) {
        console.log("fileButton.addEventListener('change', function(e){ 함수 호출 - 들어왔습니다");
        var file = fileButton.files[0];
        //현재 유저 키를 파일이름으로 지정
        var storageRef = firebase.storage().ref(loginUserKey);
        var task = storageRef.put(file);
        // #.핵심
        //이곳에서 파이어베이스 스토리지에도 저장해주고, 데이터베이스에도 저장해줘야 함.
        //유저키(부모키)를 레퍼런스로 잡고 url 추가해줌 userSessionCheck() 먼저 실행
        //사진을 업데이트 하고 현재 상태글 업데이트 하고, 다시 불러오기
        //비동기 방식으로 움직임
        //최종완료되었을때 이곳에서 끝난다
        task.then(function (snapshot) {
            url = snapshot.downloadURL;
            console.log("파이어베이스 스토리지에 저장된 주소 =  " + url);
            //파이어베이스에 이미지를 저장한후 그 url을 바로 가져와서 img 태그에 적용해줌
            document.querySelector('#myimage').src = url;

            //여기에 user 레퍼런스에 사진 url 저장
            //선택된 키가 있으면 수정
            userRef = firebaseDatabase.ref('users/' + loginUserKey);
            userRef.update({
                createtime: currentTime,
                name: name,
                imgURl: url,
                comment: comment
            });
            console.log("파이어베이스 데이터베이스 user 레퍼런스에 성공적으로 저장 완료");
            alert("성공적으로 변경되었습니다.")

        })
            .catch(function (error) {
                console.error(error);
                return;
            });

        //});

    }
    return true;
}


const write = () =>{
 
        const now = new Date;
        const feed = {
          content: document.getElementById("caption").value,
          like:34,
          location: document.getElementById("placing").value,
          potourl: document.getElementById("file").value,
          author:{
            displayName:"test",
            photoURL: "test",
            uid: "test"
          },
          tag: document.getElementById("tagging").value,
          create_at:now,
          update_at:now,
        };
          const uid = uuidv4();
   db.collection('test-feed')
    .doc(uid)
    .set(feed)
    .then(res=>{
     console.log("sucess");
     document.getElementById("caption").value = " ";
    })
    .catch(error=>{
      console.log(error);
    })
    console.log("this.textarea.value");
    
}

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
            <Button size='small' onClick = {write} >저장</Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default edit;