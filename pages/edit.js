import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firestores/firebase";
import PhotoPreview from "../components/edit/PhotoPreview";
import SubmitButton from "../components/edit/SubmitButton";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "3rem",
  },
  label: {
    fontWeight: "bold",
  },
  fileInput: {
    display: "none",
  },
}));

const edit = () => {
  const classes = useStyles();
  const router = useRouter();
  const { feedUid } = router.query;
  const uid = uuidv4();

  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [author, setAuthor] = useState({});
  const fileButton = useRef();

  useEffect(() => {
    if (feedUid) {
      setUpdateMode(true);
      getFeedDetail();
    }
    getUser();
  }, []);

  async function getUser() {
    const fetchUserInfo = await fetch("/api/user");
    const userInfo = await fetchUserInfo.json();
    setAuthor(userInfo);
  }

  async function getPhotoUrl() {
    setLoading(true);
    const file = fileButton.current.files[0];
    const storageRef = firebase.storage().ref(author.uid + "/" + uid);
    const saveFileTask = await storageRef.put(file);
    const downloadedPhotoUrl = await saveFileTask.ref.getDownloadURL();
    setLoading(false);
    setPhotoUrl(downloadedPhotoUrl);
  }

  const attachFile = () => {
    fileButton.current.click();
  };

  async function getFeedDetail() {
    try {
      const fetchFeedDetail = await fetch(`/api/feed/${feedUid}`);
      const feedDetail = await fetchFeedDetail.json();
      setPhotoUrl(feedDetail.photoUrl);
      setContent(feedDetail.content);
      setLocation(feedDetail.location);
      setTag(feedDetail.tag);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      if (updateMode) {
        updateFeed();
      } else {
        await createFeed();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createFeed() {
    const createParams = {
      uid,
      photoUrl,
      content,
      location,
      tag,
      author,
      create_at: new Date(),
      like: 0,
    };

    try {
      const createResult = await fetch("/api/feed", {
        method: "POST",
        body: JSON.stringify(createParams),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { message } = await createResult.json();

      router.push({
        pathname: "/feed",
        query: { message },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateFeed() {
    const updateParams = {
      content,
      location,
      tag,
      author,
    };

    try {
      const updateResult = await fetch(`/api/feed/${feedUid}`, {
        method: "PATCH",
        body: JSON.stringify(updateParams),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const { message } = await updateResult.json();

      router.push({
        pathname: "/feed",
        query: { message },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <PhotoPreview
            photoUrl={photoUrl}
            attachFile={attachFile}
            loading={loading}
          />
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <form id="edit" className={classes.form} onSubmit={submitHandler}>
            <input
              id="file"
              type="file"
              ref={fileButton}
              onChange={getPhotoUrl}
              className={classes.fileInput}
            />
            <Grid container direction="row" alignItems="center">
              <Grid item md={2} xs={12}>
                <label htmlFor="caption" className={classes.label}>
                  문구입력
                </label>
              </Grid>
              <Grid item md={10} xs={12}>
                <TextField
                  id="caption"
                  multiline
                  rows="4"
                  placeholder="문구 입력..."
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  autoFocus
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item md={2} xs={12}>
                <label htmlFor="location" className={classes.label}>
                  위치 추가
                </label>
              </Grid>
              <Grid item md={10} xs={12}>
                <TextField
                  id="location"
                  type="text"
                  placeholder="위치 추가"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  autoFocus
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item md={2} xs={12}>
                <label htmlFor="tagging" className={classes.label}>
                  태그
                </label>
              </Grid>
              <Grid item md={10} xs={12}>
                <TextField
                  id="tagging"
                  type="text"
                  placeholder="태그하기"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  autoFocus
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Grid>
            </Grid>
            <CardActions>
              <SubmitButton />
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default edit;
