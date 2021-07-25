import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

  useEffect(() => {
    for (const feedId of userLikedFeeds) {
      if (feedId === uid) {
        setLiked({
          status: true,
          num: like,
        });
        break;
      }
    }
  }, []);

  async function handleHeartClick() {
    try {
      // 피드 좋아요 수 업데이트
      const likeNum = liked.status ? (liked.num -= 1) : (liked.num += 1);

      await fetch(`/api/feed/${uid}`, {
        method: "PATCH",
        body: JSON.stringify({ like: likeNum }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // 사용자가 좋아요 한 피드 목록 업데이트
      let newUserLikeFeeds = [];
      if (liked.status) {
        newUserLikeFeeds = userLikedFeeds.filter((feedId) => feedId !== uid);
      } else {
        newUserLikeFeeds = [...userLikedFeeds, uid];
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
  t.setSeconds(create_at.seconds);
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
        <FeedIconBar
          tag={tag}
          liked={liked}
          handleHeartClick={handleHeartClick}
        />
      </Card>
    </div>
  );
};

export default DetailFeed;
