import { db } from "shared/firebase";

const { doc, getDoc } = require("firebase/firestore");

// 데이터 가져오기
const getSpotById = async (id) => {
  const docRef = doc(db, "spot", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error(`해당 id로 존재하는 게시물 없음 : ${id}`);
  }
};

export { getSpotById };
