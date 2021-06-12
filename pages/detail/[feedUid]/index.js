import React from "react";
import Grid from '@material-ui/core/Grid'
import { Avatar, Paper,TextField,IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import DetailFeed from '../../../components/DetailFeed';
import Comment from "../../../components/Comment";
import SendIcon from "@material-ui/icons/Send";
import GridList from '@material-ui/core/GridList';
import { observer } from 'mobx-react';
import { useRouter } from "next/router";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    post :{
        padding :theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:"100%",
    },
    gridList: {
        width: 500,
        height: 800,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
  }));
  
  
  const detail = observer(({detail}) =>{
    const router = useRouter();
    const { id } = router.query;
    const classes = useStyles();
    const [inputs, setInputs] = React.useState({
    comment: "",
  });
  const comments = [
    {
      id: 1,
      username: "aeuna",
      comment: "정말 맛있겠다!",
    },
    {
      id: 2,
      username: "kelee98",
      comment: "장소가 어디인가용?",
    },
    {
      id: 3,
      username: "xianeml",
      comment: "가고 싶어요!",
    },
    {
      id: 4,
      username: "huiji0315",
      comment: "나도 가고 싶어요!",
    },
  ];
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleSendClick = () => {
    const comments = {
      id: comments.length + 1,
      username: "aeuna",
      comment: inputs.comment,
    };
    setComments([...comments, comment]);
    setInputs({
      comment: "",
    });
  };
  return (
       <Grid container spacing={0}>
           <Grid item xs={8}>
               <Paper className={classes.paper}> 
               <DetailFeed />
               </Paper>
               </Grid>
               
               <Grid item xs={4} >
                   <Paper className={classes.paper}> 
                   <div>
                       <Avatar/>
                    <p> auna </p>
                </div>
                <GridList cellHeight={300} spacing={1} className={classes.gridList}>
                {comments.map((comment) => (
                <Comment key={comment.id} data={comment} />
              ))}
                 <Grid container wrap="nowrap" spacing={3}>
                <Grid item>
                  <Avatar size={5} />
                </Grid>
                <Grid
                  className={classes.commentItem}
                  justifyContent="left"
                  item
                  xs
                  zeroMinWidth
                >
                  <h4 style={{ margin: 0, textAlign: "left" }}>aeuna</h4>
                  <div className={classes.commentSend}>
                    <TextField
                      name="comment"
                      multiline
                      placeholder="댓글을 입력해주세요..."
                      rowsMax={3}
                      className={classes.comment}
                      onChange={handleTextChange}
                      value={inputs.comment}
                    />
                    <IconButton aria-label="send" onClick={handleSendClick}>
                      <SendIcon />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
              </GridList>
           
           </Paper></Grid>
           </Grid>
   
  );
});

export default detail;
