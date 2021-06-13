import { WbIncandescentTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed';
import db from '../firestores/db';
import UserStores from '../firestores/UserStore';
import { observer } from 'mobx-react-lite';
import router from 'next/router';
const index = observer(({index}) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: 'aeuna',
      comment: '정말 맛있겠다!',
    },
    {
      id: 2,
      username: 'kelee98',
      comment: '장소가 어디인가용?',
    },
    {
      id: 3,
      username: 'xianeml',
      comment: '가고 싶어요!',
    },
    {
      id: 4,
      username: 'huiji0315',
      comment: '나도 가고 싶어요!',
    },
  ]);
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeds = async () => {
      const feedsData = []; //받아온 데이터를 저장할 배열
      await db
        .collection('feed')
        .get() // "feed" 컬렉션의 모든 다큐먼트를 갖는 프로미스 반환
        .then((docs) => {
          docs.forEach((doc) => {
            feedsData.push({
              content: doc.data().content,
              like: doc.data().like,
              photoUrl: doc.data().photoUrl,
              author: {
                displayName: doc.data().author.displayName,
                photoUrl: doc.data().author.photoUrl,
                uid: doc.data().author.uid,
              },
              location: doc.data().location,
              tag: doc.data().tag,
              uid: doc.data().uid,
              create_at: doc.data().create_at.seconds,
            });
          });
          setFeeds(feedsData);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };
    fetchFeeds();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (UserStores.userinfo == null) {
    router.push('/login')
  }
  return (
    <div>
       

         {feeds.map((feed) => (
          <Feed feed={feed} comments={comments} setComments={setComments} />
        ))}
      
    </div>
  );
});

export default index;
