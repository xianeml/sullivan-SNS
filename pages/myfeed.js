import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "../components/common/Avatar";
import ProfileUpdatePopup from "../components/ProfileUpdatePopup";
import { Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "../components/common/Snackbar";
import db from "../firestores/db";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  primary: {
    color: "#2196f3",
    fontWeight: "bold",
  },
  divider: {
    margin: theme.spacing(6, 0),
  },
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
  profile: {
    paddingTop: "3rem",
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
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userRef = db.collection("myuser").doc("SFCKJmd9KzCpO5H77wz1");
    const userDoc = await userRef.get();
    const userInfo = userDoc.data();
    setUser(userInfo);

    const feedRef = db.collection("feed");
    const myFeedList = [];
    await feedRef
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          if (doc.data().author.uid === userInfo.uid)
            myFeedList.push(doc.data());
        });
        setFeedList(myFeedList);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const openProfileUpdatePopup = () => {
    setPopupOpen(true);
  };
  const closeProfileUpdatePopup = () => {
    setPopupOpen(false);
  };

  // 스낵바 알림창
  const [resultMessageOpen, setResultMessageOpen] = useState(false);

  const openResultMessage = () => {
    setResultMessageOpen(true);
  };
  const closeResultMessage = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setResultMessageOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.profile}
        spacing={4}
      >
        <Grid item>
          <Avatar
            size={2}
            displayName={user.displayName}
            photoUrl={user.photoUrl}
          />
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6" component="h2" paragraph>
                {user.displayName}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <Typography variant="body1" component="h2" paragraph>
                    게시물 {feedList.length}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" component="h2" paragraph>
                    좋아하는 피드 수{user.likeFeeds ? user.likeFeeds.length : 0}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="caption" component="h2">
                {user.caption}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                component="h2"
                gutterBottom
              >
                {user.webpage}
              </Typography>
            </Grid>
            <Button
              variant="outlined"
              color="primary"
              onClick={openProfileUpdatePopup}
            >
              프로필 수정하기
            </Button>
            <ProfileUpdatePopup
              open={popupOpen}
              closeHandler={closeProfileUpdatePopup}
              openResultMessageHandler={openResultMessage}
              user={user}
            />
            <Snackbar
              open={resultMessageOpen}
              closeHandler={closeResultMessage}
              message={"프로필이 수정되었습니다."}
              durationProps={1000}
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" light className={classes.divider} />
      <Grid container spacing={3} className={classes.container}>
        {loading ? (
          <div>Loading...</div>
        ) : feedList.length !== 0 ? (
          feedList.map((feed, idx) => (
            <Grid item md={4} sm={6} xs={12} key={idx}>
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
          ))
        ) : (
          <p>피드가 없습니다. 사진을 업로드하세요.</p>
        )}
      </Grid>
    </div>
  );
};

export default myFeed;
