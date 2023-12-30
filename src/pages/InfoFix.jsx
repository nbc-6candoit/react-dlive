import { useEffect, useState } from "react";
import { auth } from "../shared/firebase";
import React from "react";
import styled from "styled-components";
import defaultphoto from "../assets/img/avatar.png";
import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import { Link } from "react-router-dom";

const InfoFix = () => {
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
          <StLogCard>
            <StLogWrapper>
              <div>
                <Avatar />
                <input type="text" placeholder="닉네임 수정"></input>
                <h4>{userProfile.name}</h4>
                <Link to="/Mypage">
                  <Button type="button" text="수정완료" width="100%"></Button>
                </Link>
              </div>
            </StLogWrapper>
          </StLogCard>
        </>
      )}
    </div>
  );
};

export default InfoFix;

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
