import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles(() => ({
  imgContainer: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  feedImg: {
    margin: "0 auto",
    height: "400px",
    width: "400px",
    display: "block",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(70%)",
    },
  },
}));

const PhotoItem = ({ feed }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item md={4} sm={6} xs={12}>
        <div className={classes.imgContainer}>
          <Link href={`/feed/${feed.uid}`}>
            {feed.photoUrl ? (
              <img
                src={feed.photoUrl}
                alt={feed.photoUrl}
                className={classes.feedImg}
              />
            ) : (
              <img
                width="100%"
                height="100%"
                src={feed.author.photoUrl}
                alt={feed.photoUrl}
                className={classes.feedImg}
              />
            )}
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default PhotoItem;
