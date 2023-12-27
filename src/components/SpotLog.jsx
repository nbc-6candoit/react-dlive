import React from "react";
import styled from "styled-components";
import LogCard from "./common/LogCard";

const SpotLog = () => {
  return (
    <StSpotInfoContainer>
      <StDetailInfo>
        <h3>차박로그</h3>
        <StHorizontalLine />
      </StDetailInfo>
      <StLogListWrapper>
        <LogCard />
        <LogCard />
        <LogCard />
      </StLogListWrapper>
    </StSpotInfoContainer>
  );
};

export default SpotLog;

const StHorizontalLine = styled.div`
  width: 80%;
  border-bottom: 1px solid gray;
`;

const StSpotInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 40px;
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

const StLogListWrapper = styled.div`
  flex: 1;
  height: fit-content;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
