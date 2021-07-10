import firebase from "../../../firestores/firebase";

const db = firebase.firestore();

/*
  상세 피드 조회 API
  URL : /api/feed/{feedUid}
  method : GET
*/
async function getFeedDetail(feedUid) {
  const feedRef = db.collection("feed").doc(feedUid);
  const feedDoc = await feedRef.get();
  const feedDetail = feedDoc.data();
  return feedDetail;
}

/*
  상세 피드 수정 API
  URL : /api/feed/{feedUid}
  method : PATCH
*/
async function updateFeed(feedUid, updateData) {
  const feedRef = db.collection("feed").doc(feedUid);
  await feedRef.update(updateData);
}

/*
  상세 피드 삭제 API
  URL : /api/feed/{feedUid}
  method : DELETE
*/
async function deleteFeed(feedUid) {
  const feedRef = db.collection("feed").doc(feedUid);
  await feedRef.delete();

  // // 사용자 피드 리스트 업데이트 필요
}

export default async function handler(req, res) {
  const { feedUid } = req.query;

  if (req.method === "PATCH") {
    const updateData = req.body;
    await updateFeed(feedUid, updateData);
    return res.status(200).json({ message: "수정되었습니다." });
  }
  if (req.method === "DELETE") {
    await deleteFeed(feedUid);
    return res.status(200).json({ message: "삭제되었습니다." });
  } else {
    const feedDetail = await getFeedDetail(feedUid);
    return res.status(200).json(feedDetail);
  }
}
