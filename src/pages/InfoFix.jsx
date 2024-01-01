// // import { useEffect, useState } from "react";
// // import { auth, db } from "../shared/firebase";
// // import React from "react";
// // import styled from "styled-components";
// // import { updateDoc, doc, collection } from "firebase/firestore";
// // import Avatar from "components/common/Avatar";
// // import Button from "components/common/Button";
// // import { Link } from "react-router-dom";
// // import swal from "sweetalert";

// // const InfoFix = () => {
// //   const [userProfile, setUserProfile] = useState(null);
// //   const [username, setUsername] = useState("");
// //   const [avatar, setAvatar] = useState(null);

// //   useEffect(() => {
// //     const fetchProfileInfo = async () => {
// //       try {
// //         const user = auth.currentUser;
// //         console.log(user);

// //         if (user) {
// //           user.providerData.forEach((profile) => {
// //             const providerId = profile.providerId;
// //             const uid = profile.uid;
// //             const name = profile.displayName;
// //             const email = profile.email;
// //             const photoUrl = profile.photoURL;

// //             setUserProfile({ providerId, uid, name, email, photoUrl });
// //           });
// //         }
// //       } catch (error) {
// //         console.error("프로필 정보 가져오기 오류:", error);
// //       }
// //     };

// //     fetchProfileInfo();
// //   }, []);

// //   const updateUser = async (username, e) => {
// //     e.preventDefault();
// //     setUsername(username);
// //     const userDoc = doc(db, "users", auth.currentUser.uid);

// //     try {
// //       await updateDoc(userDoc, { nickname: username });
// //       swal("Good Job!", "회원가입이 완료되었습니다!", "success");
// //       console.log("프로필이 성공적으로 업데이트되었습니다!");
// //       setUsername("");
// //     } catch (e) {
// //       console.error("프로필 업데이트 오류:", e);
// //     } finally {
// //       console.log("end");
// //     }
// //   };

// //   return (
// //     <StContentContainer>
// //       {userProfile && (
// //         <>
// //           <StLogCard>
// //             <StLogWrapper>
// //               <form onSubmit={(e) => updateUser(username, e)}>
// //                 <Avatar />
// //                 <Stnameinput
// //                   type="text"
// //                   placeholder={`${userProfile.name}`}
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                 ></Stnameinput>
// //                 {username}
// //                 <Button
// //                   type="submit"
// //                   text="프로필 업데이트"
// //                   width="20%"
// //                 ></Button>
// //                 <Link to={`/mypage/:`}>
// //                   {/* ${authState.uid} */}
// //                   <Button
// //                     type="button"
// //                     text="mypage돌아가기"
// //                     width="70%"
// //                   ></Button>
// //                 </Link>
// //               </form>
// //             </StLogWrapper>
// //           </StLogCard>
// //         </>
// //       )}
// //     </StContentContainer>
// //   );
// // };

// // export default InfoFix;

// // const StContentContainer = styled.div`
// //   min-height: calc(50vh - 56px);
// //   padding-bottom: 20px;
// // `;

// // const Stnameinput = styled.input`
// //   border: 1px solid red;
// // `;

// // const StLogCard = styled.div`
// //   width: 80%;
// //   max-height: 120px;
// //   display: flex;
// //   align-items: center;
// //   gap: 1.2rem;
// // `;

// // const StLogWrapper = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   width: 100%;
// //   gap: 0.5rem;
// //   overflow: hidden;
// //   & div {
// //     display: flex;
// //     flex-direction: row;
// //     align-items: center;
// //     gap: 0.5rem;
// //   }
// //   & p {
// //     display: -webkit-box;
// //     -webkit-line-clamp: 3;
// //     -webkit-box-orient: vertical;
// //     overflow: hidden;
// //     text-overflow: ellipsis;
// //     font-size: 14px;
// //     line-height: 1.6;
// //   }
// // `;

// import { useEffect, useState } from "react";
// import { auth, db } from "../shared/firebase";
// import React from "react";
// import styled from "styled-components";
// import { updateDoc, doc, collection } from "firebase/firestore";
// import Avatar from "components/common/Avatar";
// import Button from "components/common/Button";
// import { Link } from "react-router-dom";
// import swal from "sweetalert";

// const InfoFix = () => {
//   const [userProfile, setUserProfile] = useState(null);
//   const [username, setUsername] = useState("");
//   const [avatar, setAvatar] = useState(null);

//   useEffect(() => {
//     const fetchProfileInfo = async () => {
//       try {
//         const user = auth.currentUser;
//         console.log(user);

//         if (user) {
//           user.providerData.forEach((profile) => {
//             const providerId = profile.providerId;
//             const uid = profile.uid;
//             const name = profile.displayName;
//             const email = profile.email;
//             const photoUrl = profile.photoURL;

//             setUserProfile({ providerId, uid, name, email, photoUrl });
//           });
//         }
//       } catch (error) {
//         console.error("프로필 정보 가져오기 오류:", error);
//       }
//     };

//     fetchProfileInfo();
//   }, []);

//   const updateUser = async (username, e) => {
//     e.preventDefault();
//     setUsername(username);
//     const userDoc = doc(db, "users", auth.currentUser.uid);

//     try {
//       await updateDoc(userDoc, { nickname: username });
//       swal("Good Job!", "회원가입이 완료되었습니다!", "success");
//       console.log("프로필이 성공적으로 업데이트되었습니다!");
//       setUsername("");
//     } catch (e) {
//       console.error("프로필 업데이트 오류:", e);
//     } finally {
//       console.log("end");
//     }
//   };

//   return (
//     <StContentContainer>
//       {userProfile && (
//         <>
//           <StLogCard>
//             <StLogWrapper>
//               <form onSubmit={(e) => updateUser(username, e)}>
//                 <Avatar />
//                 <Stnameinput
//                   type="text"
//                   placeholder={`${userProfile.name}`}
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 ></Stnameinput>
//                 {username}
//                 <Button
//                   type="submit"
//                   text="프로필 업데이트"
//                   width="20%"
//                 ></Button>
//                 <Link to={`/mypage/:`}>
//                   {/* ${authState.uid} */}
//                   <Button
//                     type="button"
//                     text="mypage돌아가기"
//                     width="70%"
//                   ></Button>
//                 </Link>
//               </form>
//             </StLogWrapper>
//           </StLogCard>
//         </>
//       )}
//     </StContentContainer>
//   );
// };

// export default InfoFix;

// const StContentContainer = styled.div`
//   min-height: calc(50vh - 56px);
//   padding-bottom: 20px;
// `;

// const Stnameinput = styled.input`
//   border: 1px solid red;
// `;

// const StLogCard = styled.div`
//   width: 80%;
//   max-height: 120px;
//   display: flex;
//   align-items: center;
//   gap: 1.2rem;
// `;

// const StLogWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   gap: 0.5rem;
//   overflow: hidden;
//   & div {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     gap: 0.5rem;
//   }
//   & p {
//     display: -webkit-box;
//     -webkit-line-clamp: 3;
//     -webkit-box-orient: vertical;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     font-size: 14px;
//     line-height: 1.6;
//   }
// `;

import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../shared/firebase";
import styled from "styled-components";
import Button from "components/common/Button";
import { Link } from "react-router-dom";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import Avatar from "components/common/Avatar";
import swal from "sweetalert";

const InfoFix = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleNicknameChange = async () => {
    const newNickname = prompt("Enter new nickname:");
    if (newNickname) {
      try {
        const userDoc = doc(db, "users", userData.id);
        await updateDoc(userDoc, { nickname: newNickname });
        swal("Good Job!", "Nickname has been updated!", "success");
        setUserData({ ...userData, nickname: newNickname });
      } catch (error) {
        console.error("Error updating nickname:", error);
      }
    }
  };

  const handleProfilePictureChange = () => {
    const fileInput = document.getElementById("profilePictureInput");
    fileInput && fileInput.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const avatarRef = storage
          .ref()
          .child(`avatars/${auth.currentUser.uid}`);
        await avatarRef.put(file);
        const avatarUrl = await avatarRef.getDownloadURL();

        const userDoc = doc(db, "users", userData.id);
        await updateDoc(userDoc, { avatar: avatarUrl });

        setUserData({ ...userData, avatar: avatarUrl });

        swal("Good Job!", "Profile picture has been updated!", "success");
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  const handleNicknameEdit = () => {
    setNickname(userData.nickname);
    setIsEditing(true);
  };

  const handleNicknameSave = async () => {
    try {
      const userDoc = doc(db, "users", userData.id);
      await updateDoc(userDoc, { nickname: nickname });
      setUserData({ ...userData, nickname: nickname });
      setIsEditing(false);
      swal("Good Job!", "Nickname has been updated!", "success");
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userQuery = query(
            collection(db, "users"),
            where("userId", "==", user.uid)
          );
          const userSnapshot = await getDocs(userQuery);

          if (userSnapshot.docs.length > 0) {
            const userData = {
              id: userSnapshot.docs[0].id,
              ...userSnapshot.docs[0].data(),
            };
            setUserData(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Stcontainer>
      {userData && (
        <>
          <StlogCard>
            <StlogWrapper>
              {!isEditing && <Avatar imageUrl={userData.avatar} />}
              {isEditing ? (
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={10}
                  minLength={2}
                />
              ) : (
                <Stdiv>{userData.nickname}</Stdiv>
              )}

              {isEditing ? (
                <>
                  <Button
                    type="button"
                    text="Save"
                    onClick={handleNicknameSave}
                  />
                  <Button
                    type="button"
                    text="Cancel"
                    onClick={() => setIsEditing(false)}
                  />
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    text="닉네임  변경"
                    onClick={handleNicknameEdit}
                    width="20%"
                  />

                  <input
                    type="file"
                    id="profilePictureInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    text="프로필 이미지 변경"
                    onClick={handleProfilePictureChange}
                    width="20%"
                  />
                </>
              )}
            </StlogWrapper>
          </StlogCard>
        </>
      )}
    </Stcontainer>
  );
};

export default InfoFix;

const Stdiv = styled.div`
  align-items: center;
  justify-content: center;
  margin: 2px 5px;
  font-size: 10px;
`;

const Stcontainer = styled.div`
  width: 110%;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20%;
`;

const StlogCard = styled.div`
  width: 100%;
  max-height: 120px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-right: 35px;
`;

const StlogWrapper = styled.div`
  padding-left: 30px;
  padding-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #5eb470;
  border-radius: 5px;
  border: 1px solid #5eb470;
  width: 100%;
  gap: 2rem;
  overflow: hidden;

  & ${Stdiv} {
    font-size: 25px;
  }

  & input {
    border: ${(props) =>
      props.isEditing ? "1px solid red" : "1px solid #5eb470"};
    width: 100%;
    height: 30px;
    border-radius: 10px;
    &:focus {
      outline: 1px solid #5eb470;
    }
  }
`;
