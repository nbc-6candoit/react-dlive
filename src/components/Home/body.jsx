import React from "react";
import styled from "styled-components";
import { Slide } from "./slide/Slide";
import SpotLog from "../SpotDetail/SpotLog";
import { Map } from "./Map/Map";
import HotSpotList from "./HotSpotList";
import Button from "components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import mountains from "assets/img/산.png";
import rivers from "assets/img/강.png";
import seas from "assets/img/바다.png";

function Body() {
  const navigate = useNavigate();
  const handleMoreDetailButtonClick = (contentType) => {
    navigate(`/spotdetail/${contentType}`);
  };

  return (
    <>
      <StbodyContainer>
        <>
          <Slide />
        </>
        <StListContainer>
          <StcategoryContainer>
            <StCategory type="img" src={mountains} />
            <StCategory type="img" src={rivers} />
            <StCategory type="img" src={seas} />
          </StcategoryContainer>
          <Button
            type={"button"}
            onClick={() => (window.location.href = "/addspot")}
            text={"나만의 차박명소 등록하기"}
          />
          <StDetailInfo>
            <h3>지금뜨는 차박명소</h3>
            <StHorizontalLine />
            <HotSpotList />
            <Button
              type={"button"}
              onClick={() => handleMoreDetailButtonClick("spot")}
              text={"차박명소 더보기"}
            />
          </StDetailInfo>
          <>
            <SpotLog />
            <Button
              type="button"
              text="차박로그 더보기"
              onClick={() => handleMoreDetailButtonClick("log")}
            />
          </>
          <StDetailInfo>
            <h3>주변 차박명소</h3>
            <StHorizontalLine />
            <StgpsContainer>
              <Map />
            </StgpsContainer>
          </StDetailInfo>
        </StListContainer>
      </StbodyContainer>
    </>
  );
}

export default Body;

const StbodyContainer = styled.main`
  overflow-y: auto;
  max-width: 620px;
  height: fit-content;
  margin-bottom: 50px;
  overflow-y: auto;
  height: fit-content;
  margin-bottom: 50px;
`;

const StListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 3rem;
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

const StcategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 30px;
  gap: 5px;
`;
const StCategory = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 60px;
  margin: 20px auto 0 auto;
  gap: 5;
  cursor: pointer;
`;

const StHorizontalLine = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
`;

const StgpsContainer = styled.div`
  display: flex;
  & div {
    width: 435px;
    height: 455px;
    margin: auto;
  }
`;
