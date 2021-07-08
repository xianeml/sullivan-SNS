import firebase from "../../../firestores/firebase";
import { v4 as uuidv4 } from "uuid";

const db = firebase.firestore();
const uid = uuidv4();

/*
  전체 피드 리스트 조회 API
  URL : /api/feed
  method : GET
*/
async function getFeedList() {
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
async function createFeed(createData) {
  const feedRef = db.collection("feed").doc(uid);
  await feedRef.set(createData);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const createData = req.body;
    await createFeed(createData);
    return res.status(200).json({ message: "등록되었습니다." });
  } else {
    const feedList = await getFeedList();
    return res.status(200).json({ data: feedList });
  }
}
