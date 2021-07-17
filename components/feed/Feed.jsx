import React, { useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "../common/Avatar";
import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Comment from "./Comment";

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

export default function Feed({ feed, user }) {
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
  const [likeFeeds, setLikeFeeds] = useState([]);

  useEffect(() => {
    let checkFeed = [];
    if (user.likeFeeds.length != 0) {
      setLikeFeeds(user.likeFeeds);
      checkFeed = [...user.likeFeeds];
    }
    for (const feedId of checkFeed) {
      if (uid === feedId) {
        setLiked({
          ...liked,
          status: true,
        });
        break;
      }
    }
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  async function handleHeartClick() {
    const likeNum = liked.status ? (liked.num -= 1) : (liked.num += 1);
    let updateFeedLike = [];
    if (liked.status) {
      updateFeedLike = likeFeeds.filter((feedId) => feedId !== uid);
    } else {
      updateFeedLike = [...likeFeeds, uid];
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
          <Link href="/feed/[feedUid]" as={"/feed/" + uid}>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.detailBtn}
            >
              더보기
            </Typography>
          </Link>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleHeartClick}>
            {liked.status ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
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
          <Tooltip title={tag || "태그 없음"} placement="top" arrow>
            <IconButton aria-label="tag" className>
              <LocalOfferIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Comment user={user} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
