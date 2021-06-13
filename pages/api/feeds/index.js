import db from '../../../firestores/db';

const getFeedsData = async (req, res) => {
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
          create_at: doc.data().create_at.toDate(),
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return res.status(200).json({ feeds: feedsData });
};

export default getFeedsData;
