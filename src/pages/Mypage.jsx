// 마이페이지(Mypage)
import { useEffect, useState } from "react";
import { auth } from "../shared/firebase";
import React from "react";
import styled from "styled-components";
import defaultphoto from "../assets/img/avatar.png";
import Avatar from "components/common/Avatar";
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
          <div>UID: {userProfile.uid}</div>
          <div>닉네임: {userProfile.name}</div>
          <div>사용자 이메일: {userProfile.email}</div>
          <div>프로필 사진 URL: {userProfile.photoUrl}</div>
          {/* <div>
            프로필 사진:
            <img
              src={userProfile.photoUrl}
              alt={defaultphoto}
              style={{ width: "100px", height: "100px" }}
            />
          </div> */}
          <StLogCard>
            <StLogWrapper>
              <div>
                <Avatar />
                <h4>{userProfile.name}</h4>
              </div>
              <div>
                <p>{userProfile.email}</p>
              </div>
            </StLogWrapper>
          </StLogCard>
        </>
      )}
    </div>
  );
};

export default Mypage;

const StLogCard = styled.div`
  width: 80%;
  max-height: 120px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  overflow: hidden;
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  & p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 1.6;
  }
`;
