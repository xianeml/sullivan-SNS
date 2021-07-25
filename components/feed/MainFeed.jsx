import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  Collapse,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Comment from "./Comment";
import FeedIconBar from "./FeedIconBar";

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
  detailBtn: {
    cursor: "pointer",
  },
}));

const Feed = ({ feed, user }) => {
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
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState({
    status: false,
    num: like,
  });

  useEffect(() => {
    if (user.likeFeeds.includes(uid)) {
      setLiked({
        status: true,
        num: like,
      });
    }
  }, []);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

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
        newUserLikeFeeds = user.likeFeeds.filter((feedId) => feedId !== uid);
      } else {
        newUserLikeFeeds = [...user.likeFeeds, uid];
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

  let t = new Date(1970, 0, 1);
  t.setSeconds(create_at.seconds);
  const createAT =
    t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();

  return (
    <div className={classes.feed}>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar size={1} photoUrl={author.photoUrl} />}
          title={author.displayName}
          subheader={createAT + " " + location}
        />
        {photoUrl && <CardMedia className={classes.media} image={photoUrl} />}
        <CardContent>
          <Typography variant="body1" component="p">
            {content.length < 180 ? content : content.slice(0, 180) + "..."}
          </Typography>
          <Typography
            onClick={() => {
              window.location.href = `/feed/${uid}`;
            }}
            variant="body2"
            color="textSecondary"
            className={classes.detailBtn}
          >
            더보기
          </Typography>
        </CardContent>
        <FeedIconBar
          tag={tag}
          liked={liked}
          expanded={expanded}
          handleHeartClick={handleHeartClick}
          handleExpandClick={handleExpandClick}
          type={1}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comment user={user} feedType={"main"} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Feed;
