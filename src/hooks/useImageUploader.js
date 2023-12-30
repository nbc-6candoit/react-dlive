import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "shared/firebase";
import { useState } from "react";

const useImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImageURL = async (file) => {
    try {
      setLoading(true);

      const filename = file.name;
      const storageRef = ref(storage, `spot_images/${filename}`);

      // 스토어에 업로드
      await uploadBytes(storageRef, file);

      // 다운로드 url 생성
      const url = await getDownloadURL(storageRef);

      return url;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const storeURLInFirestore = async (spotInfo, imageUrl) => {
    try {
      // 파이어스토어에 이미지 추가
      const docId = await addDoc(collection(db, "spot"), {
        ...spotInfo,
        images: [imageUrl],
      });
      console.log(docId);
    } catch (error) {
      console.error("파이어스토어 저장 실패:", error.message);
      setError(error.message);
    }
  };

  return {
    loading,
    error,
    uploadImageURL,
    storeURLInFirestore,
  };
};

export default useImageUploader;
