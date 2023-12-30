// 차박명소 상세페이지(Spot)
import React from "react";
import SpotInfo from "components/spotDetail/SpotInfo";
import SpotLog from "components/spotDetail/SpotLog";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Spot = () => {
  const { spotId } = useParams();

  return (
    <StPageContainer>
      <SpotInfo />
      <StSpotLogWrapper>
        <SpotLog />
      </StSpotLogWrapper>
    </StPageContainer>
  );
};

export default Spot;

const StPageContainer = styled.div`
  max-width: 620px;
`;

const StSpotLogWrapper = styled.div`
  overflow-y: auto;
  height: fit-content;
  margin-bottom: 50px;
  padding: 40px;
`;
