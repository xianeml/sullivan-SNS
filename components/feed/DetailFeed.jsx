import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  CardActions,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Avatar from "../common/Avatar";
import PopperMenu from "./PopperMenu";

const useStyles = makeStyles((theme) => ({
  feed: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
  },
  header: {
    margin: "1rem 0",
    width: "1200px",
    height: "55px",
    textAlign: "left",
  },
  media: {
    maxHeight: "600px",
    width: "100%",
    overflow: "auto",
  },
  mediaImg: {
    height: "auto",
    width: "1200px",
    display: "block",
  },
  content: {
    textAlign: "left",
  },
  deleteText: {
    color: "red",
  },
}));

export default function DetailFeed({ feed, deleteHandler, user }) {
  if (!feed) {
    return null;
  }

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
  const router = useRouter();
  const { feedUid } = router.query;

  const [liked, setLiked] = useState({
    status: false,
    num: like,
  });
  const [likeFeeds, setLikeFeeds] = useState([]);

  useEffect(() => {
    let checkFeed = [];
    if (likeFeeds !== "") {
      setLikeFeeds(user.likeFeeds);
      checkFeed = [...user.likeFeeds];
    }
    for (const feedId of checkFeed) {
      if (feedId === uid) {
        setLiked({
          ...liked,
          status: true,
        });
        break;
      }
    }
  }, []);

  var t = new Date(1970, 0, 1);
  t.setSeconds(create_at.seconds);

  const createAT =
    t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();

  async function handleHeartClick() {
    const likeNum = liked.status ? (liked.num -= 1) : (liked.num += 1);
    let updateFeedLike = [];
    if (liked.status) {
      updateFeedLike = user.likeFeeds.filter((feedId) => feedId !== uid);
    } else {
      updateFeedLike = [...user.likeFeeds, uid];
    }
    try {
      await fetch(`/api/feed/${uid}`, {
        method: "PATCH",
        body: JSON.stringify({ like: likeNum }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      await fetch(`/api/user`, {
        method: "PATCH",
        body: JSON.stringify({ likeFeeds: updateFeedLike }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      setLiked({
        status: !liked.status,
        num: likeNum,
      });
      setLikeFeeds(updateFeedLike);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={classes.feed}>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar
              size={1}
              photoUrl={author.photoUrl}
              displayName={author.displayName}
            />
          }
          action={
            <PopperMenu deleteHandler={deleteHandler} feedUid={feedUid} />
          }
          title={author.displayName}
          subheader={createAT + " " + location}
        />
        {photoUrl && (
          <CardMedia className={classes.media}>
            <img src={photoUrl} alt={content} className={classes.mediaImg} />
          </CardMedia>
        )}
        <CardContent className={classes.content}>
          <Typography variant="body1" component="p">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleHeartClick}>
            {liked.status ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
          </IconButton>
          <Typography>
            {liked.num <= 0 || !liked.num ? 0 : liked.num}
          </Typography>
          <Tooltip title={tag || "태그 없음"} placement="top" arrow>
            <IconButton aria-label="tag" className>
              <LocalOfferIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  );
}
