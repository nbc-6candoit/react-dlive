import { useEffect, useState } from "react";
import { auth, db } from "../shared/firebase";
import React from "react";
import styled from "styled-components";
import { updateDoc, doc, collection } from "firebase/firestore";
import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import { Link } from "react-router-dom";

const InfoFix = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const user = auth.currentUser;
        console.log(user);

        if (user) {
          user.providerData.forEach((profile) => {
            const providerId = profile.providerId;
            const uid = profile.uid;
            const name = profile.displayName;
            const email = profile.email;
            const photoUrl = profile.photoURL;

            setUserProfile({ providerId, uid, name, email, photoUrl });
          });
        }
      } catch (error) {
        console.error("프로필 정보 가져오기 오류:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  const updateUser = async (username, e) => {
    e.preventDefault();
    setUsername(username);
    const userDoc = doc(db, "users", auth.currentUser.uid);

    try {
      await updateDoc(userDoc, { nickname: username });
      console.log("프로필이 성공적으로 업데이트되었습니다!");
    } catch (e) {
      console.error("프로필 업데이트 오류:", e);
    } finally {
      console.log("end");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;

      // 프로필 업데이트
      await updateDoc(doc(collection(db, "users"), user.uid), {
        name: username,
      });

      console.log("프로필이 성공적으로 업데이트되었습니다!");

      // 업데이트 된 프로필 정보를 다시 가져와서 상태 업데이트
      const userDoc = await doc(collection(db, "users"), user.uid);
      const userData = await userDoc.data();

      setUserProfile({
        providerId: userData.providerId,
        uid: userData.uid,
        name: userData.name,
        email: userData.email,
        photoUrl: userData.photoUrl,
      });
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
    }
  };

  return (
    <div>
      {userProfile && (
        <>
          <StLogCard>
            <StLogWrapper>
              <form onSubmit={(e) => updateUser(username, e)}>
                <Avatar />
                <Stnameinput
                  type="text"
                  placeholder={`${userProfile.name}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Stnameinput>
                {username}
                <Button
                  type="submit"
                  text="프로필 업데이트"
                  width="20%"
                ></Button>
                <Link to="/Mypage">
                  <Button
                    type="button"
                    text="mypage돌아가기"
                    width="70%"
                  ></Button>
                </Link>
              </form>
            </StLogWrapper>
          </StLogCard>
        </>
      )}
    </div>
  );
};

export default InfoFix;

const Stnameinput = styled.input`
  border: 1px solid red;
`;

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
