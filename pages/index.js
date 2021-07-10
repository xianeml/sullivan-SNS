import React, { useEffect } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();

  const getUser = async () => {
    try {
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();

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
