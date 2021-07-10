import firebase from "../../firestores/firebase";

const userId = "SFCKJmd9KzCpO5H77wz1";
const db = firebase.firestore();

/*
  내 정보 조회 API
  URL : /api/user/
  method : GET
*/
async function getUserInfo() {
  const userRef = db.collection("myuser").doc(userId);
  const userDoc = await userRef.get();
  const userInfo = await userDoc.data();
  return userInfo;
}

/*
  내 프로필 수정 API
  URL : /api/user/
  method : PATCH
*/
async function updateUserFeedList(updateData) {
  const userRef = db.collection("myuser").doc(userId);
  await userRef.update(updateData);
}

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const updateData = req.body;
    await updateUserFeedList(updateData);
    return res.status(200);
  } else {
    const userInfo = await getUserInfo();
    console.log(userInfo);
    return res.status(200).json(userInfo);
  }
}
