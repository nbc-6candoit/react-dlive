import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";

const LogCard = ({ title, content, images, index }) => {
  return (
    <>
      <StLogCard key={index}>
        <StImgWrapper>
          <img src={images[0].url} alt={`img ${index}`} />
        </StImgWrapper>
        <StLogWrapper>
          <StTitle>
            <h5>{title}</h5>
            <div>
              <h6>nickname</h6>
              <Avatar />
            </div>
          </StTitle>

          <StContent>
            <p>{content}</p>
          </StContent>
        </StLogWrapper>
      </StLogCard>
    </>
  );
};

const StLogCard = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const StImgWrapper = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 10px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  & div {
    display: flex;
    align-items: center;
  }
`;

const StLogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 27% - 10px);
  gap: 0.5rem;
  overflow: hidden;
  margin-top: 10px;
  & div {
    display: flex;
    gap: 0.5rem;

    & h6 {
      font-size: 15px;
      font-weight: normal;
    }
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
const StContent = styled.div`
  display: flex;
  flex-direction: column;

  & h5 {
    font-size: 16px;
    font-weight: bold;
  }
  & p {
    font-weight: normal;
  }
`;

export default LogCard;
