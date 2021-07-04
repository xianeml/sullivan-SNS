import React, { useState, useRef, useEffect } from "react";
import Avatar from "../common/Avatar";
import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  CardActions,
  IconButton,
  Typography,
  makeStyles,
  Tooltip,
  Grow,
  ClickAwayListener,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useRouter } from "next/router";
import db from "../../firestores/db";

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
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
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
  }, [open]);

  var t = new Date(1970, 0, 1);
  t.setSeconds(create_at.seconds);

  const createAT =
    t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();

  const openSettingMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const closeSettingMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleUpdate = () => {
    router.push({
      pathname: "/edit",
      query: { feedUid },
    });
  };

  const handleDelete = () => {
    deleteHandler();
  };

  const handleHeartClick = () => {
    const likeNum = liked.status ? (liked.num -= 1) : (liked.num += 1);
    let updateFeedLike = [];
    if (liked.status) {
      updateFeedLike = user.likeFeeds.filter((feedId) => feedId !== uid);
    } else {
      updateFeedLike = [...user.likeFeeds, uid];
    }
    db.collection("feed")
      .doc(uid)
      .update({
        like: likeNum,
      })
      .catch((err) => {
        console.log(err);
      });

    db.collection("myuser")
      .doc(user.uid)
      .update({ likeFeeds: updateFeedLike })
      .catch((err) => console.log(err));

    setLiked({
      status: !liked.status,
      num: likeNum,
    });
    setLikeFeeds(updateFeedLike);
  };

  return (
    <div className={classes.feed}>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={closeSettingMenu}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleUpdate}>수정</MenuItem>
                  <MenuItem
                    className={classes.deleteText}
                    onClick={handleDelete}
                  >
                    삭제
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

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
            <IconButton
              aria-label="settings"
              aria-haspopup="true"
              onClick={openSettingMenu}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
            >
              <MoreVertIcon />
            </IconButton>
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
