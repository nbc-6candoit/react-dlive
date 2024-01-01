// 마이페이지(Mypage)
import { useEffect, useState } from "react";
import { auth } from "../shared/firebase";
import React from "react";
import styled from "styled-components";
// import defaultphoto from "../assets/img/avatar.png";
// import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import { Link } from "react-router-dom";
const Mypage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const user = auth.currentUser;
        console.log(auth.currentUser);

        // if (user) {
        //   // 사용자의 제공자 데이터를 반복
        //   // user.providerData.forEach((profile)
        //   user.forEach((profile) => {
        //     console.log(profile);
        //     // 제공자의 ID (예: google.com)
        //     // const providerId = profile.providerId;

        //     // 제공자에 특정한 UID
        //     const uid = profile.uid;
        //     console.log(uid);
        //     // 이름, 이메일 주소 및 프로필 사진 URL
        //     const nickname = profile.auth.displayName;
        //     console.log(nickname);
        //     const email = profile.auth.email;
        //     console.log(email);
        //     const photoUrl = profile.reloadUserInfo.photoUrl;
        //     console.log(photoUrl);
        //     // 사용자 프로필 정보 상태 업데이트
        //     setUserProfile({ uid, nickname, email, photoUrl });
        //   });
        // }
        if (user) {
          console.log(user);
          const uid = user.uid;
          const nickname = user.displayName;
          const email = user.email;
          const photoUrl = user.photoURL;

          setUserProfile({ uid, nickname, email, photoUrl });
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 오류:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  console.log(userProfile);

  return (
    <Stcontainer>
      {userProfile && (
        <>
          <StlogCard>
            <StlogWrapper>
              <div>
                {/* <Avatar /> */}
                {/* <img
                  src={
                    "https://static.wikia.nocookie.net/shinchan/images/d/d8/Shinnoske.jpg/revision/latest?cb=20131020030755&path-prefix=ko"
                  }
                ></img> */}
                <Stdiv>{userProfile.nickname}</Stdiv>

                <Link to="/InfoFix">
                  <Button
                    type="button"
                    text="내정보 관리"
                    width="100%"
                  ></Button>
                </Link>
              </div>
            </StlogWrapper>
          </StlogCard>
        </>
      )}
    </Stcontainer>
  );
};

export default Mypage;

const Stdiv = styled.div`
  margin: 20px 50px;
  font-size: 20px;
`;

const Stcontainer = styled.div`
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
`;
const StlogCard = styled.div`
  width: 80%;
  max-height: 120px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #5eb470;
  border-radius: 5px;
  border: 1px solid #5eb470;
  width: 100%;
  gap: 0.5rem;
  overflow: hidden;
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    padding: 10px;
  }
`;
