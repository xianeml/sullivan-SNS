import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import DetailFeed from "../../components/feed/DetailFeed";
import Comment from "../../components/feed/Comment";
import PageLoading from "../../components/common/PageLoading";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  feed: {
    textAlign: "center",
    height: "100%",
  },
}));

const detail = () => {
  const classes = useStyles();
  const router = useRouter();
  const { feedUid } = router.query;

  const [user, setUser] = useState({});
  const [feedDetail, setFeedDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (feedUid) return fetchData();
  }, []);

  async function fetchData() {
    try {
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();
      setUser(userInfo);

      const fetchFeedDetail = await fetch(`/api/feed/${feedUid}`);
      const feedInfo = await fetchFeedDetail.json();
      setFeedDetail(feedInfo);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteFeed() {
    try {
      const deleteResult = await fetch(
        `/api/feed/${feedUid}?userId=${feedDetail.author.uid}`,
        {
          method: "DELETE",
        }
      );
      const { message } = await deleteResult.json();

      router.push({
        pathname: "/feed",
        query: { message },
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <PageLoading />;
  return (
    <Grid container className={classes.container}>
      <Grid item xs={8} className={classes.feed}>
        <DetailFeed
          feed={feedDetail}
          deleteHandler={deleteFeed}
          userLikedFeeds={user.likeFeeds}
        />
      </Grid>
      <Grid item xs={4}>
        <Comment user={user} feedType={"detail"} />
      </Grid>
    </Grid>
  );
};

export default detail;
