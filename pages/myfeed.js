import React, { useState, useEffect } from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/myFeed/Profile";
import PhotoGrid from "../components/myFeed/PhotoGrid";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(6, 0),
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

  async function getUserInfo() {
    const fetchUserInfo = await fetch("/api/user");
    const userInfo = await fetchUserInfo.json();
    setUser(userInfo);

    const fetchFeedList = await fetch(`/api/feed?userId=${userInfo.uid}`);
    const myFeedList = await fetchFeedList.json();
    setFeedList(myFeedList.data);
    setLoading(false);
  }

  if (loading) return <div>Loading...</div>;
  return (
    <div className={classes.root}>
      <Profile user={user} feedList={feedList} />
      <Divider variant="middle" light className={classes.divider} />
      <PhotoGrid loading={loading} feedList={feedList} />
    </div>
  );
};

export default myFeed;
