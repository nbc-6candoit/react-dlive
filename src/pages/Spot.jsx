// 차박명소 상세페이지(Spot)
import React from "react";
import SpotInfo from "components/SpotDetail/SpotInfo";
import SpotLog from "components/SpotDetail/SpotLog";
import styled from "styled-components";

const Spot = () => {
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
