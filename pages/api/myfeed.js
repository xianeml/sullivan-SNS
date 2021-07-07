import firebase from "../../firestores/firebase";

const getMyFeedList = async (req, res) => {
  const { userId } = req.query;

  const db = firebase.firestore();
  const myFeedList = [];
  const feedRef = db.collection("feed");
  const feedSnapshot = await feedRef.orderBy("create_at", "desc").get();
  feedSnapshot.forEach((doc) => {
    if (doc.data().author.uid === userId) {
      myFeedList.push(doc.data());
    }
  });

  return res.status(200).json({ data: myFeedList });
};

export default getMyFeedList;
