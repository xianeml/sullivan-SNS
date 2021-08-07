import React, { useState, useEffect } from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/myFeed/Profile";
import PhotoGrid from "../components/myFeed/PhotoGrid";
import PageLoading from "../components/common/PageLoading";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(6, 0),
  },
}));

const myfeed = () => {
  const classes = useStyles();

  const [user, setUser] = useState(null);
  const [feedList, setFeedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();
      setUser(userInfo);

      const fetchFeedList = await fetch(`/api/feed?userId=${userInfo.uid}`);
      const myFeedList = await fetchFeedList.json();
      setFeedList(myFeedList.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <PageLoading />;
  return (
    <>
      <Profile user={user} getUserInfo={getUserInfo} />
      <Divider variant="middle" light className={classes.divider} />
      <PhotoGrid feedList={feedList} />
    </>
  );
};

export default myfeed;
