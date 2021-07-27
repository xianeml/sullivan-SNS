import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  Collapse,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Avatar from "../common/Avatar";
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
  const classes = useStyles();

  const [commentExpanded, setCommentExpanded] = useState(false);
  const [likeBtn, setLikeBtn] = useState({
    clicked: false,
    displayNum: feed.like,
  });

  useEffect(() => {
    if (user.likeFeeds.includes(feed.uid)) {
      setLikeBtn({
        clicked: true,
        displayNum: feed.like,
      });
    }
  }, []);

  function handleExpandComment() {
    setCommentExpanded(!commentExpanded);
  }

  async function handleHeartClick() {
    try {
      // 피드 좋아요 수 업데이트
      const likeNum = likeBtn.clicked
        ? (likeBtn.displayNum -= 1)
        : (likeBtn.displayNum += 1);

      await fetch(`/api/feed/${feed.uid}`, {
        method: "PATCH",
        body: JSON.stringify({ like: likeNum }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // 사용자가 좋아요 한 피드 목록 업데이트
      let newUserLikeFeeds = [];
      if (likeBtn.clicked) {
        newUserLikeFeeds = user.likeFeeds.filter(
          (feedId) => feedId !== feed.uid
        );
      } else {
        newUserLikeFeeds = [...user.likeFeeds, feed.uid];
      }

      await fetch(`/api/user`, {
        method: "PATCH",
        body: JSON.stringify({ likeFeeds: newUserLikeFeeds }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      setLikeBtn({
        clicked: !likeBtn.clicked,
        displayNum: likeNum,
      });
    } catch (e) {
      console.error(e);
    }
  }

  let t = new Date(1970, 0, 1);
  t.setSeconds(feed.create_at.seconds);
  const createAT =
    t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();

  return (
    <div className={classes.feed}>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar size={1} photoUrl={feed.author.photoUrl} />}
          title={feed.author.displayName}
          subheader={createAT + " " + feed.location}
        />
        {feed.photoUrl && (
          <CardMedia className={classes.media} image={feed.photoUrl} />
        )}
        <CardContent>
          <Typography variant="body1" component="p">
            {feed.content.length < 180
              ? feed.content
              : feed.content.slice(0, 180) + "..."}
          </Typography>
          <Link href={`/feed/${feed.uid}`}>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.detailBtn}
            >
              더보기
            </Typography>
          </Link>
        </CardContent>
        <FeedIconBar
          tag={feed.tag}
          likeBtn={likeBtn}
          commentExpanded={commentExpanded}
          handleHeartClick={handleHeartClick}
          handleExpandComment={handleExpandComment}
          type={1}
        />
        <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comment user={user} feedType={"main"} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Feed;
