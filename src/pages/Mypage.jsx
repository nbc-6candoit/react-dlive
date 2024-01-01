// 마이페이지(Mypage)
import { useEffect, useState } from "react";
import { auth, db } from "../shared/firebase";
import React from "react";
import styled from "styled-components";
import Button from "components/common/Button";
import { Link } from "react-router-dom";
import { query, collection, where, getDocs } from "firebase/firestore"; // Import necessary functions
import Avatar from "components/common/Avatar";

const Mypage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userQuery = query(
            collection(db, "users"),
            where("userId", "==", user.uid) // Change 'user' to 'user.uid' to use the user's ID for comparison
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

  console.log(userData);

  return (
    <Stcontainer>
      {userData && (
        <>
          <StlogCard>
            <StlogWrapper>
              <Avatar />

              <Stdiv>{userData.nickname}</Stdiv>

              <Link to="/InfoFix">
                <Button type="button" text="내정보 관리" width="100%"></Button>
              </Link>
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
  flex-direction: row; // Change to row to align items horizontally
  align-items: center;
  color: #5eb470;
  border-radius: 5px;
  border: 1px solid #5eb470;
  width: 100%;
  gap: 0.5rem;
  overflow: hidden;

  & ${Stdiv} {
    font-size: 20px;
  }

  & ${Button} {
    width: 100%;
  }
`;
