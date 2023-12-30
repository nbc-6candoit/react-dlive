// 차박명소 상세페이지(Spot)
import React, { useEffect } from "react";
import SpotInfo from "components/spotDetail/SpotInfo";
import SpotLog from "components/spotDetail/SpotLog";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "shared/firebase";
import { useDispatch } from "react-redux";
import { setSpotDetails } from "../redux/modules/spotDataSlice";

const Spot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const spotDoc = await getDoc(doc(collection(db, "spot"), spotId));
        if (spotDoc.exists()) {
          const spotData = spotDoc.data();
          dispatch(setSpotDetails(spotData));
        } else {
          // Spot을 찾지 못한 경우 처리
        }
      } catch (error) {
        console.error("Spot details를 가져오는 중 오류 발생:", error.message);
      }
    };

    fetchSpotDetails();
  }, [spotId, dispatch]);

  return (
    <>
      <StImageWrapper>
        <img
          src="https://www.kkday.com/ko/blog/wp-content/uploads/chabak_camping_2.jpg"
          alt="차박명소"
        />
      </StImageWrapper>
      <SpotInfo />
      <StPageContainer>
        <SpotLog />
      </StPageContainer>
    </>
  );
};

export default Spot;

const StPageContainer = styled.div`
  overflow-y: auto;
  height: fit-content;
  margin-bottom: 50px;
`;

const StImageWrapper = styled.div`
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
