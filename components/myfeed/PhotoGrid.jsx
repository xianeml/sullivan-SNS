import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  imgContainer: {
    overflow: "hidden",
    width: "400px",
    height: "400px",
  },
  feedImg: {
    padding: theme.spacing(1),
    maxWidth: "100%",
    height: "auto",
    display: "block",
    "&:hover": {
      cursor: "pointer",
      filter: "brightness(70%)",
    },
  },
}));

const FeedImgGrid = ({ feed }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item md={4} sm={6} xs={12}>
        <div className={classes.imgContainer}>
          <Link href="/feed/[feedUid]" as={"/feed/" + feed.uid}>
            <img
              src={feed.photoUrl}
              alt={feed.content}
              className={classes.feedImg}
            />
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default FeedImgGrid;
