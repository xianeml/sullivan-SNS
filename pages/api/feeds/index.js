import db from "../../../firestores/db";

const getFeedsData = async (req, res) => {
  const feedsData = []; //받아온 데이터를 저장할 배열

  await db
    .collection("test-feed")
    .get() // "feed" 컬렉션의 모든 다큐먼트를 갖는 프로미스 반환
    .then((docs) => {
      docs.forEach((doc) => {
        feedsData.push({
          // id: doc.data().id,
          content: doc.data().content,
          like: doc.data().like,
          photourl: doc.data().potourl,
          author: {
            displayName: doc.data().author.displayName,
            photoURL: doc.data().author.photoURL,
            uid: doc.data().author.uid,
          },
          tag: doc.data().tag,
          create_at: doc.data().create_at.na,
          // update_at: doc.data().update_at,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return res.status(200).json({ feeds: feedsData });
};

export default getFeedsData;
