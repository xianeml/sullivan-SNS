import React, { useEffect } from "react";
import { useRouter } from "next/router";
import db from "../firestores/db";

const index = () => {
  const router = useRouter();

  const getUser = async () => {
    try {
      const userRef = db.collection("myuser").doc("SFCKJmd9KzCpO5H77wz1");
      const userDoc = await userRef.get();
      const userInfo = userDoc.data();
      userInfo ? router.push("/feed") : <div>유저 정보가 없습니다.</div>;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <div></div>;
};

export default index;
