import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Avatar from "../../components/common/Avatar";
import DetailFeed from "../../components/feed/DetailFeed";
import Comment from "../../components/feed/Comment";
import commentData from "../../src/comments.js";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "100%",
  },
  commentItem: {
    width: "100%",
    fontWeight: "bold",
    textAlign: "left",
  },
}));

export const getServerSideProps = async (ctx) => {
  const { feedUid } = ctx.query;

  const fetchUserInfo = await fetch("http://localhost:3000/api/user");
  const user = await fetchUserInfo.json();

  const fetchFeedDetail = await fetch(
    `http://localhost:3000/api/feed/${feedUid}`
  );
  const feedDetail = await fetchFeedDetail.json();

  return {
    props: {
      feedUid,
      user,
      feedDetail,
    },
  };
};

const detail = ({ feedUid, user, feedDetail }) => {
  const classes = useStyles();
  const router = useRouter();

  const [inputs, setInputs] = useState({ comment: "" });
  const [comments, setComments] = useState(commentData);

  async function deleteFeed() {
    const createResult = await fetch(`/api/feed/${feedUid}`, {
      method: "DELETE",
    });
    const { message } = await createResult.json();
    router.push({
      pathname: "/feed",
      query: { message },
    });
  }

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
    <Grid container>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <DetailFeed
            feed={feedDetail}
            deleteHandler={deleteFeed}
            user={user}
          />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Grid container direction="column">
            {comments.map((comment) => (
              <Grid item key={comment.id}>
                <Comment key={comment.id} data={comment} />
              </Grid>
            ))}
          </Grid>
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item>
              <Avatar
                size={1}
                photoUrl={user.photoUrl}
                displayName={user.displayName}
              />
            </Grid>
            <Grid item>
              <Grid container direction="column" justify="flex-start">
                <Grid item>
                  <Typography
                    variant="body1"
                    component="h4"
                    display="block"
                    className={classes.commentItem}
                  >
                    {user.displayName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={2}>
                    <Grid item>
                      <TextField
                        name="comment"
                        placeholder="댓글을 입력해주세요..."
                        onChange={handleTextChange}
                        value={inputs.comment}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="send" onClick={handleSendClick}>
                        <SendIcon color="primary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default detail;
