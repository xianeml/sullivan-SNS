import firebase from "../../../firestores/firebase";

/*
  전체 피드 리스트 조회 API
  URL : /api/feed
  method : GET
*/
async function getFeedList() {
  const db = firebase.firestore();
  let feedList = [];
  const feedRef = db.collection("feed");
  const feedSnapshot = await feedRef.orderBy("create_at", "desc").get();
  feedSnapshot.forEach((doc) => {
    feedList.push(doc.data());
  });
  return feedList;
}

/*
  피드 생성 API
  URL : /api/feed
  method : POST
*/
function createFeed() {}

export default async function handler(req, res) {
  const feedList = await getFeedList();

  return res.status(200).json({ data: feedList });
}
