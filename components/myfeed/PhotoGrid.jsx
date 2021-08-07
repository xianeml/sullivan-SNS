import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoItem from "./PhotoItem";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px 50px",
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
