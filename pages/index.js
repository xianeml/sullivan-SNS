import React, { useEffect, useState } from "react";
import Feed from "../components/Feed";
import axios from "axios";

const index = () => {
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
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get(`/api/feeds`);
        setFeeds(response.data.feeds);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetchFeeds();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {feeds.map((feed) => (
        <Feed
          // key={feed.id}
          feed={feed}
          comments={comments}
          setComments={setComments}
        />
      ))}
    </div>
  );
};

export default index;
