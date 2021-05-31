import React from "react";
import Link from "next/link";
import Avatar from "./Avatar";
import Comment from "./Comment";
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
    marginTop: "20px",
    maxWidth: "1000px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  comment: {
    width: "600px",
    height: "75px",
  },
  cheader:{
    width: "600px",
    height: "55px",
  },
  commentItem: {
    marginTop: "10px",
  },
  commentSend: {
    display: "flex",
    flexDirection: "row",
  },
 
}));

export default function DetailFeed() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHeartClick = () => {
    setLiked(!liked);
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

  return (
    <div className={classes.feed}>
      <Card className={classes.root}>
        <CardHeader
           className={classes.cheader}
          avatar={<Avatar size={1} />}
          title="aeuna"
          subheader="May 14, 2020"
        />
        <CardMedia
          className={classes.media}
          image="/images/test.jpeg"
          title="food"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.... (데이터 들어오면 몇자 이내로 자를 예정!)
          </Typography>
          <Link href="/">
            <Typography variant="body1">더보기</Typography>
          </Link>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleHeartClick}>
            {liked ? <FavoriteIcon color="secondary" /> : <FavoriteIcon />}
            <ChatIcon />
          </IconButton>
        </CardActions>
       
      </Card>
    </div>
  );
}
