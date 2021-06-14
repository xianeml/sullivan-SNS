import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Avatar from './common/Avatar';
import Comment from './Comment';
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
  Tooltip,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import db from '../firestores/db';
import UserStore from '../firestores/UserStore';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  feed: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
  },
  header: {
    margin: '1rem 0',
    width: '600px',
    height: '55px',
    textAlign: 'left',
  },
  media: {
    maxHeight: '600px',
    width: '100%',
    overflow: 'auto',
  },
  mediaImg: {
    height: 'auto',
    width: '600px',
    display: 'block',
  },
  content: {
    textAlign: 'left',
  },
}));

export default function DetailFeed({ feedData }) {
  const classes = useStyles();
  const router = useRouter();

  const [feed, setFeed] = useState({});
  const [liked, setLiked] = useState({
    status: false,
    num: feed.like,
  });

  useEffect(() => {
    if (!UserStore.userinfo) {
      router.push('/login');
    }
    try {
      setFeed(feedData);
      getFeedDetail();
    } catch (error) {
      console.log(error);
    }
  }, []);

  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(feed.create_at);

  const createAT =
    t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHeartClick = () => {
    const likeNum = liked.status ? (liked.num -= 1) : (liked.num += 1);
    setLiked({
      status: !liked.status,
      num: likeNum,
    });
    db.collection('feed')
      .doc(feed.uid)
      .update({
        like: likeNum,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.feed}>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar
              size={1}
              photoUrl={feed.author.photoUrl}
              displayName={feed.author.displayName}
            />
          }
          title={feed.author.displayName}
          subheader={feed.location}
        />
        <CardMedia className={classes.media}>
          <img
            src={feed.photoUrl}
            alt={feed.content}
            className={classes.mediaImg}
          />
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography variant='body1' component='p'>
            {feed.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites' onClick={handleHeartClick}>
            {liked.status ? (
              <FavoriteIcon color='secondary' />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
          <Typography>
            {liked.num <= 0 || !liked.num ? 0 : liked.num}
          </Typography>
          <IconButton
            aria-label='comment'
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ChatIcon />
          </IconButton>
          <Tooltip title={feed.tag || '태그 없음'} placement='top' arrow>
            <IconButton aria-label='tag' className>
              <LocalOfferIcon />
            </IconButton>
          </Tooltip>
          <Typography variant='body2' color='textSecondary'>
            {createAT}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}
