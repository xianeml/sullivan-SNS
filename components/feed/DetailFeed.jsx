import React, { useState, useEffect } from "react";
import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "../common/Avatar";
import PopperMenu from "./PopperMenu";
import PageLoading from "../common/PageLoading";
import FeedIconBar from "./FeedIconBar";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
  },
  feed: {
    width: "100%",
  },
  header: {
    margin: "1rem 0",
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
    width: "100%",
    display: "block",
  },
  content: {
    textAlign: "left",
  },
}));

const DetailFeed = ({ feed, deleteHandler, userLikedFeeds }) => {
  if (!feed) {
    return <PageLoading />;
  }
  const classes = useStyles();

  const [liked, setLiked] = useState({
    status: false,
    num: feed.like,
  });

  useEffect(() => {
    if (userLikedFeeds.includes(feed.uid)) {
      setLiked({
        status: true,
        num: feed.like,
      });
    }
  }, []);

  async function handleHeartClick() {
    try {
      // 피드 좋아요 수 업데이트
      const likeNum = liked.status ? (liked.num -= 1) : (liked.num += 1);

      await fetch(`/api/feed/${feed.uid}`, {
        method: "PATCH",
        body: JSON.stringify({ like: likeNum }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // 사용자가 좋아요 한 피드 목록 업데이트
      let newUserLikeFeeds = [];
      if (liked.status) {
        newUserLikeFeeds = userLikedFeeds.filter(
          (feedId) => feedId !== feed.uid
        );
      } else {
        newUserLikeFeeds = [...userLikedFeeds, feed.uid];
      }

      await fetch(`/api/user`, {
        method: "PATCH",
        body: JSON.stringify({ likeFeeds: newUserLikeFeeds }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      setLiked({
        status: !liked.status,
        num: likeNum,
      });
    } catch (e) {
      console.error(e);
    }
  }

  var t = new Date(1970, 0, 1);
  t.setSeconds(feed.create_at.seconds);
  const createAT =
    t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();

  return (
    <div className={classes.root}>
      <Card className={classes.feed}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar
              size={1}
              photoUrl={feed.author.photoUrl}
              displayName={feed.author.displayName}
            />
          }
          action={
            <PopperMenu deleteHandler={deleteHandler} feedUid={feed.uid} />
          }
          title={feed.author.displayName}
          subheader={createAT + " " + feed.location}
        />
        {feed.photoUrl && (
          <CardMedia className={classes.media}>
            <img
              src={feed.photoUrl}
              alt={feed.content}
              className={classes.mediaImg}
            />
          </CardMedia>
        )}
        <CardContent className={classes.content}>
          <Typography variant="body1" component="p">
            {feed.content}
          </Typography>
        </CardContent>
        <FeedIconBar
          tag={feed.tag}
          liked={liked}
          handleHeartClick={handleHeartClick}
        />
      </Card>
    </div>
  );
};

export default DetailFeed;
