import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const LogCard = ({ src, spotName, nickName, contents }) => {
  return (
    <StLogCard>
      <StImgWrapper>
        <img src={src} alt={spotName} />
      </StImgWrapper>
      <StLogWrapper>
        <div>
          <Avatar />
          <h4>{nickName}</h4>
        </div>
        <div>
          <p>{contents}</p>
        </div>
      </StLogWrapper>
    </StLogCard>
  );
};

export default LogCard;

const StLogCard = styled.div`
  width: 80%;
  max-height: 120px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StImgWrapper = styled.div`
  width: 150px;
  height: 120px;
  border-radius: 0.5rem;
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
