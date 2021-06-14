import React, { useEffect } from 'react';
import UserStore from '../firestores/UserStore';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

const index = observer(({ index }) => {
  const router = useRouter();

  useEffect(() => {
    console.log('로그인정보 있나요?', UserStore.userinfo);
    if (!UserStore.userinfo) {
      router.push('/login');
    } else {
      router.push('/feed');
    }
  }, []);

  return <div></div>;
});

export default index;
