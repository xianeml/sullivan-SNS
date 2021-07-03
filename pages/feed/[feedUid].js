import React, { useState, useEffect } from "react";
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
import db from "../../firestores/db";

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

  return {
    props: {
      feedUid,
    },
  };
};

const detail = ({ feedUid }) => {
  const classes = useStyles();
  const router = useRouter();

  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [inputs, setInputs] = useState({ comment: "" });
  const [comments, setComments] = useState(commentData);

  useEffect(() => {
    getUser();
    getFeedDetail();
  }, []);

  async function getUser() {
    const userRef = db.collection("myuser").doc("SFCKJmd9KzCpO5H77wz1");
    const userDoc = await userRef.get();
    const userInfo = userDoc.data();
    setUser(userInfo);
  }

  async function getFeedDetail() {
    const feedRef = db.collection("feed").doc(feedUid);
    const feedDoc = await feedRef.get();
    const feedDetail = feedDoc.data();
    setFeed(feedDetail);
    setLoading(false);
  }

  async function deleteFeed() {
    await db.collection("feed").doc(feedUid).delete();
    router.push({
      pathname: "/feed",
      query: { message: "삭제되었습니다." },
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

  if (loading) return <div>Loading...</div>;
  return (
    <Grid container>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <DetailFeed feed={feed} deleteHandler={deleteFeed} user={user} />
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
