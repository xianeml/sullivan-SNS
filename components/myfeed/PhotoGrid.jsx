import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoItem from "./PhotoItem";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(0, 30),
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
}));

const PhotoGrid = ({ feedList }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} className={classes.container}>
        {feedList ? (
          feedList.map((feed, idx) => <PhotoItem feed={feed} key={idx} />)
        ) : (
          <p>피드가 없습니다. 사진을 업로드하세요.</p>
        )}
      </Grid>
    </>
  );
};

export default PhotoGrid;
