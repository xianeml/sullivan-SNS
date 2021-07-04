import React, { useState, useEffect } from "react";
import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/myFeed/Profile";
import PhotoGrid from "../components/myFeed/PhotoGrid";
import db from "../firestores/db";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(6, 0),
  },
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

const myFeed = () => {
  const classes = useStyles();

  const [user, setUser] = useState(null);
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userRef = db.collection("myuser").doc("SFCKJmd9KzCpO5H77wz1");
    const userDoc = await userRef.get();
    const userInfo = userDoc.data();
    setUser(userInfo);

    const myFeedList = [];
    const feedRef = db.collection("feed");
    const feedSnapshot = await feedRef.orderBy("create_at", "desc").get();
    feedSnapshot.forEach((doc) => {
      if (doc.data().author.uid === userInfo.uid) {
        myFeedList.push(doc.data());
      }
    });
    setFeedList(myFeedList);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className={classes.root}>
      <Profile user={user} feedList={feedList} />
      <Divider variant="middle" light className={classes.divider} />
      <Grid container spacing={3} className={classes.container}>
        {loading ? (
          <div>Loading...</div>
        ) : feedList.length !== 0 ? (
          feedList.map((feed, idx) => <PhotoGrid feed={feed} key={idx} />)
        ) : (
          <p>피드가 없습니다. 사진을 업로드하세요.</p>
        )}
      </Grid>
    </div>
  );
};

export default myFeed;
