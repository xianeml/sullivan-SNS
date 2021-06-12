import React from "react";
import Link from "next/link";
import Avatar from "./Avatar";
import Comment from "./Comment";
import db from "../firestores/db";
import {
  Paper,
  TextField,
  Grid,
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles(() => ({
  feed: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    marginTop: "55px",
    width: "800px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
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

export default function Feed({ feed, comments, setComments }) {
  const {
    content,
    like = 0,
    photoUrl,
    author,
    tag,
    create_at,
    uid,
    location,
  } = feed;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState({
    status: false,
    num: like,
  });
  const [inputs, setInputs] = React.useState({
    comment: "",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHeartClick = () => {
    const likeNum = liked.status ? (liked.num -= 1) : (liked.num += 1);
    setLiked({
      status: !liked.status,
      num: likeNum,
    });
    db.collection("feed")
      .doc(uid)
      .update({
        like: likeNum,
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      username: "aeuna",
      comment: inputs.comment,
    };
    setComments([...comments, comment]);
    setInputs({
      comment: "",
    });
  };

  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(create_at);
  const createAT =
    t.getDate() + "/" + (t.getMonth() + 1) + "/" + t.getFullYear();

  return (
    <div className={classes.feed}>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar size={1} photoUrl={author.photoUrl} />}
          title={author.displayName}
          subheader={createAT}
        />
        <CardMedia className={classes.media} image={photoUrl} title="food" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tag}
          </Typography>
          <Link href="/detail/[feedUid]" as="/detail/first">
            <Typography variant="body1">더보기</Typography>
          </Link>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleHeartClick}>
            {liked.status ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
          <Typography>
            {liked.num <= 0 || !liked.num ? 0 : liked.num}
          </Typography>
          <IconButton
            aria-label="comment"
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ChatIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Paper style={{ padding: "20px 20px" }}>
              {comments.map((comment) => (
                <Comment key={comment.id} data={comment} />
              ))}
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar size={1} />
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
            </Paper>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
