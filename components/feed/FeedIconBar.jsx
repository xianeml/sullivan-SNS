import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import {
  CardActions,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";

export default function FeedIconBar({
  tag,
  liked,
  expanded,
  handleHeartClick,
  handleExpandClick,
  type,
}) {
  return (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={handleHeartClick}>
        {liked.status ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
      </IconButton>
      <Typography>{liked.num <= 0 || !liked.num ? 0 : liked.num}</Typography>
      {type && (
        <IconButton
          aria-label="comment"
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ChatIcon />
        </IconButton>
      )}
      <Tooltip title={tag || "태그 없음"} placement="top" arrow>
        <IconButton aria-label="tag" className>
          <LocalOfferIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
}
