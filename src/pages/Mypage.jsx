// 마이페이지(Mypage)
import { useEffect, useState } from "react";
import { auth } from "../shared/firebase";

const Mypage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          // 사용자의 제공자 데이터를 반복
          user.providerData.forEach((profile) => {
            // 제공자의 ID (예: google.com)
            const providerId = profile.providerId;

            // 제공자에 특정한 UID
            const uid = profile.uid;

            // 이름, 이메일 주소 및 프로필 사진 URL
            const name = profile.displayName;
            const email = profile.email;
            const photoUrl = profile.photoURL;

            // 사용자 프로필 정보 상태 업데이트
            setUserProfile({ providerId, uid, name, email, photoUrl });
          });
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 오류:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  return (
    <div>
      {userProfile && (
        <>
          <div>제공자 ID: {userProfile.providerId}</div>
          <div>UID: {userProfile.uid}</div>
          <div>이름: {userProfile.name}</div>
          <div>이메일: {userProfile.email}</div>
          <div>프로필 사진 URL: {userProfile.photoUrl}</div>
        </>
      )}
    </div>
  );
};

export default Mypage;
