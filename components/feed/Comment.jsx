import React, { useState } from "react";
import CommentDetail from "./CommentDetail";
import {
  Paper,
  TextField,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import commentData from "../../src/comments.js";
import Avatar from "../common/Avatar";

const useStyles = makeStyles(() => ({
  comment: {
    width: "600px",
    height: "75px",
  },
  commentItem: {
    marginTop: "10px",
  },
  commentSend: {
    display: "flex",
    flexDirection: "row",
  },
}));

const Comment = ({ user }) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({ comment: "" });
  const [comments, setComments] = useState(commentData);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSendClick = () => {
    const comment = {
      id: comments.length + 1,
      username: user.displayName,
      comment: inputs.comment,
    };
    setComments([...comments, comment]);
    setInputs({
      comment: "",
    });
  };

  return (
    <Paper style={{ padding: "20px 20px" }}>
      {comments.map((comment) => (
        <CommentDetail key={comment.id} data={comment} />
      ))}
      <Grid container wrap="nowrap" spacing={2} justify="flex-start">
        <Grid item>
          <Avatar photoUrl={user.photoUrl} size={1} />
        </Grid>
        <Grid className={classes.commentItem} item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{user.displayName}</h4>
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
              <SendIcon color="primary" />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comment;
