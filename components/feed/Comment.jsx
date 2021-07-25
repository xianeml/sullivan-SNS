import React, { useState } from "react";
import {
  Paper,
  TextField,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "../common/Avatar";
import CommentDetail from "./CommentDetail";
import commentData from "../../src/comments.js";

const useStyles = makeStyles(() => ({
  container: {
    padding: "20px",
  },
  displayName: {
    margin: "10px 0px",
  },
  commentSend: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
  },
  commentInput: {
    width: "600px",
  },
  sendBtn: {
    alignItems: "center",
  },
}));

const Comment = ({ user }) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState("");
  const [commentList, setCommentList] = useState(commentData);

  function handleTextChange(e) {
    setInputs(e.target.value);
  }

  function handleSendClick() {
    if (!inputs) return;

    const comment = {
      id: commentList.length + 1,
      username: user.displayName,
      photoUrl: user.photoUrl,
      comment: inputs,
    };
    setCommentList([...commentList, comment]);
    setInputs("");
  }

  return (
    <Paper className={classes.container}>
      {commentList.map((comment) => (
        <CommentDetail key={comment.id} data={comment} />
      ))}
      <Grid container wrap="nowrap" spacing={2} justify="flex-start">
        <Grid item>
          <Avatar photoUrl={user.photoUrl} size={1} />
        </Grid>
        <Grid item>
          <h4 className={classes.displayName}>{user.displayName}</h4>
          <Grid item className={classes.commentSend}>
            <TextField
              name="comment"
              multiline
              placeholder="댓글을 입력해주세요..."
              rowsMax={3}
              className={classes.commentInput}
              onChange={handleTextChange}
              value={inputs}
            />
            <IconButton
              className={classes.sendBtn}
              aria-label="send"
              onClick={handleSendClick}
            >
              <SendIcon color="primary" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
