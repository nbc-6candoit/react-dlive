import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "shared/firebase";
import { useState } from "react";

const useImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImageURL = async (docID, images) => {
    console.log("업로드 실행");
    try {
      console.log("Console Log 2: 실행", images);

      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageID = `image_${i + 1}`;
        const imagePath = `log_images/${docID}/${imageID}`;
        const imageRef = ref(storage, imagePath);
        const file = await fetch(image).then((res) => res.blob());
        await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push({
          path: imagePath,
          url: imageUrl,
        });
      }
      console.log("Console Log 1: Image URLs", imageUrls);
      return imageUrls;
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
