import React, { useEffect } from "react";
import { useRouter } from "next/router";
import db from "../firestores/db";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    db.collection("myuser")
      .doc("SFCKJmd9KzCpO5H77wz1")
      .get()
      .then((doc) => {
        if (doc.data()) {
          router.push("/feed");
        } else {
          <div>유저 정보가 없습니다.</div>;
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return <div></div>;
};

export default index;
