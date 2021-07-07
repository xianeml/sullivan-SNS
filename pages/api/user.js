import firebase from "../../firestores/firebase";

const getUserInfo = async (req, res) => {
  const db = firebase.firestore();
  const userRef = db.collection("myuser").doc("SFCKJmd9KzCpO5H77wz1");
  const userDoc = await userRef.get();
  const userInfo = await userDoc.data();

  return res.status(200).json(userInfo);
};

export default getUserInfo;
