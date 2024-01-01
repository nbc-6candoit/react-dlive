// 마이페이지(Mypage)
import { useEffect, useState } from "react";
import { auth, db } from "../shared/firebase";
import React from "react";
import styled from "styled-components";
import Button from "components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { query, collection, where, getDocs } from "firebase/firestore"; // Import necessary functions
import Avatar from "components/common/Avatar";
import HotSpotList from "components/Home/HotSpotList";

const Mypage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const handleMoreDetailButtonClick = (contentType) => {
    navigate(`/spotdetail/${contentType}`);
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

  console.log(userData);

  return (
    <>
      <Stcontainer>
        {userData && (
          <>
            <StlogCard>
              <StlogWrapper>
                <Avatar />
                <Stdiv>{userData.nickname}</Stdiv>

                <Link to="/InfoFix">
                  <Button
                    type="button"
                    text="내정보 관리"
                    width="100%"
                  ></Button>
                </Link>
              </StlogWrapper>
            </StlogCard>
          </>
        )}
      </Stcontainer>
      <StDetailInfo>
        <h3>내가작성한 차박명소</h3>
        <StHorizontalLine />
        <HotSpotList />
        <Button
          type={"button"}
          onClick={() => handleMoreDetailButtonClick("spot")}
          text={"차박명소 더보기"}
        />
      </StDetailInfo>
    </>
  );
};

export default Mypage;

const Stdiv = styled.div`
  font-size: 20px;
`;

const Stcontainer = styled.div`
  width: 100%;
  margin: 30px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
`;
const StlogCard = styled.div`
  width: 60%;
  max-height: 120px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #5eb470;
`;

const StlogWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #5eb470;
  width: 100%;
  gap: 1rem; // Increased the gap for better spacing
  overflow: hidden;

  & ${Stdiv} {
    font-size: 20px;
    margin-right: auto; // Aligns the div to the left
  }

  & ${Button} {
    width: 40%; // Reduced the width
  }
`;

const StHorizontalLine = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
`;
const StDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  line-height: 1.7;
  & h3 {
    font-size: 20px;
  }
`;
