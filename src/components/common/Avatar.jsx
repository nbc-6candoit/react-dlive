import styled, { css } from "styled-components";
import avatar from "assets/img/avatar.png";
import { useEffect, useState } from "react";
import { auth, db } from "shared/firebase";
import React from "react";

import { query, collection, where, getDocs } from "firebase/firestore";

export default function Avatar({ size }) {
  const [userData, setUserData] = useState(null);

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
            const fetchedUserData = {
              id: userSnapshot.docs[0].id,
              ...userSnapshot.docs[0].data(),
            };
            setUserData(fetchedUserData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, []);

  return (
    <AvatarFigure size={size}>
      {userData && <img src={userData.avatar ?? avatar} alt="아바타이미지" />}
    </AvatarFigure>
  );
}

const AvatarFigure = styled.figure`
  ${(props) => {
    switch (props.size) {
      case "large":
        return css`
          width: 70px;
          height: 70px;
        `;
      default:
        return css`
          width: 24px;
          height: 24px;
        `;
    }
  }}
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
