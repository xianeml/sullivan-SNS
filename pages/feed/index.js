import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "../../components/common/Snackbar";
import Feed from "../../components/feed/Feed";
import db from "../../firestores/db";

const index = () => {
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "aeuna",
      comment: "정말 맛있겠다!",
    },
    {
      id: 2,
      username: "kelee98",
      comment: "장소가 어디인가용?",
    },
    {
      id: 3,
      username: "xianeml",
      comment: "가고 싶어요!",
    },
    {
      id: 4,
      username: "huiji0315",
      comment: "나도 가고 싶어요!",
    },
  ]);

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
    const feedsData = [];
    await db
      .collection("myuser")
      .doc("SFCKJmd9KzCpO5H77wz1")
      .get()
      .then((doc) => {
        setUser(doc.data());
      })
      .catch((err) => console.log(err));

    await db
      .collection("feed")
      .orderBy("create_at", "desc")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          feedsData.push({
            content: doc.data().content,
            like: doc.data().like,
            photoUrl: doc.data().photoUrl,
            author: {
              displayName: doc.data().author.displayName,
              photoUrl: doc.data().author.photoUrl,
              uid: doc.data().author.uid,
            },
            location: doc.data().location,
            tag: doc.data().tag,
            uid: doc.data().uid,
            create_at: doc.data().create_at.seconds,
          });
        });
        setFeeds(feedsData);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
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
