import { Grid, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { getFeedDetail } from "../api/feed/[feedUid].js";
import { getUserInfo } from "../api/user";
import DetailFeed from "../../components/feed/DetailFeed";
import Comment from "../../components/feed/Comment";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  feed: {
    textAlign: "center",
    height: "100%",
  },
}));

export const getServerSideProps = async (context) => {
  const { feedUid } = context.query;

  const user = await getUserInfo();
  const feedDetail = await getFeedDetail(feedUid);

  return {
    props: {
      feedUid,
      user,
      feedDetail,
    },
  };
};

const detail = ({ feedUid, user, feedDetail }) => {
  const classes = useStyles();
  const router = useRouter();

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

  return (
    <Grid container className={classes.container}>
      <Grid item xs={8} className={classes.feed}>
        <DetailFeed feed={feedDetail} deleteHandler={deleteFeed} user={user} />
      </Grid>
      <Grid item xs={4}>
        <Comment user={user} feedType={"detail"} />
      </Grid>
    </Grid>
  );
};

export default detail;
