import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "shared/firebase";

// 모든 게시물 검색
export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "post"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
// id로 'post'  게시물 검색
export const getPost = async (postId) => {
  const q = query(collection(db, "post"), where("id", "==", `${postId}`));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data())[0];
};
//postId를 매개변수로 받아서 'post' 컬렉션에서 일치하는 게시물 검색
export const getFilterdPosts = async (property, value) => {
  const q = query(collection(db, "post"), where(property, "==", value));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
// 게시물 추가
export const addPost = async (newPost) => {
  await addDoc(collection(db, "post"), newPost);
};
