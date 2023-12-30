import React from "react";
import styled from "styled-components";
import { Slide } from "./slide/Slide";
import SpotLog from "../../components/spotDetail/SpotLog";
import { Map } from "./Map/Map";
import HotSpotList from "./HotSpotList";
function body() {
  return (
    <>
      <StbodyContainer>
        <>
          <Slide />
        </>
        <StListContainer>
          <StcategoryContainer>
            <StCategoryButton>마운틴뷰</StCategoryButton>
            <StCategoryButton>리버뷰</StCategoryButton>
            <StCategoryButton>오션뷰</StCategoryButton>
            <StCategoryButton>신설</StCategoryButton>
          </StcategoryContainer>
          <StDetailInfo>
            <h3>지금뜨는 차박명소</h3>
            <StHorizontalLine />
            <HotSpotList />
          </StDetailInfo>
          <>
            <SpotLog />
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

export default body;

const StbodyContainer = styled.main`
  overflow-y: auto;
  max-width: 620px;
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
`;
const StCategoryButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 60px;
  background: #d9d9d9;
  margin: 20px auto 0 auto;
  gap: 5;
  cursor: pointer;
`;

const Sth1 = styled.div`
  width: 100%;
  max-width: 530px;
  margin: 0 20px;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.7;
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
