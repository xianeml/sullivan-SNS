import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "../../components/common/Snackbar";
import Feed from "../../components/feed/Feed";
import commentData from "../../src/comments.js";
import PageLoading from "../../components/common/PageLoading";

const index = () => {
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(commentData);

  // 스낵바 알림창
  const [resultMessageOpen, setResultMessageOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const router = useRouter();
  const { message } = router.query;

  const openResultMessage = () => {
    setResultMessageOpen(true);
  };
  const closeResultMessage = (reason) => {
    if (reason === "clickaway") return;
    setResultMessageOpen(false);
  };

  useEffect(() => {
    fetchData();
    if (message) {
      setResultMessage(message);
      openResultMessage();
    }
  }, []);

  const fetchData = async () => {
    try {
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();
      setUser(userInfo);

      const fetchFeedList = await fetch("/api/feed");
      const feedList = await fetchFeedList.json();
      setFeeds(feedList.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <PageLoading />;
  return (
    <div>
      {feeds.map((feed, index) => (
        <Feed
          key={index}
          user={user}
          feed={feed}
          comments={comments}
          setComments={setComments}
        />
      ))}
      <Snackbar
        open={resultMessageOpen}
        closeHandler={closeResultMessage}
        message={resultMessage}
        durationProps={1500}
      />
    </div>
  );
};

export default index;
