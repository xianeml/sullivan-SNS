import React from "react";
import Feed from "../components/Feed";

const index = () => {
  const [comments, setComments] = React.useState([
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

  return (
    <>
      <Feed comments={comments} setComments={setComments} />
      <Feed comments={comments} setComments={setComments} />
      <Feed comments={comments} setComments={setComments} />
    </>
  );
};

export default index;
