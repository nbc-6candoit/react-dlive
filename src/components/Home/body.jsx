import React from "react";
import styled from "styled-components";
import { Slide } from "./slide/Slide";
import dlivelogo from "assets/img/logo.png";
import SpotLog from "components/SpotDetail/SpotLog";
function body() {
  return (
    <>
      <StbodyContainer>
        <>
          <Slide />
        </>

        <StcategoryContainer>
          <StCategoryButton>마운틴뷰</StCategoryButton>
          <StCategoryButton>리버뷰</StCategoryButton>
          <StCategoryButton>오션뷰</StCategoryButton>
          <StCategoryButton>신설</StCategoryButton>
        </StcategoryContainer>
        <Sth1>지금뜨는 차박명소</Sth1>
        <StHorizontalLine />
        <StspotContainer>
          <Stbox src={dlivelogo}></Stbox>
          <Stbox src={dlivelogo}></Stbox>
          <Stbox src={dlivelogo}></Stbox>
          <Stbox src={dlivelogo}></Stbox>
          <Stbox src={dlivelogo}></Stbox>
          <Stbox src={dlivelogo}></Stbox>
        </StspotContainer>
        <>
          <Sth1>
            <SpotLog />
          </Sth1>
        </>
        <Sth1>주변 차박명소</Sth1>
        <StHorizontalLine />
        <StgpsContainer>
          <div></div>
        </StgpsContainer>
      </StbodyContainer>
    </>
  );
}

export default body;

const StbodyContainer = styled.main`
  overflow-y: auto;
  height: fit-content;
  margin-bottom: 50px;
`;

const StcategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 30px;
  gap: 5px;
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

const StspotContainer = styled.div`
  display: grid;
  flex-wrap: wrap;
  flex-direction: row;
  flex-grow: auto;
  grid-template-columns: repeat(3, 1fr);
  margin: 40px;
  padding: 40px;
  flex: 3;
  border: 2px;
`;
const Sth1 = styled.h3`
  color: #000;
  font-size: 20px;
  font-weight: 800;
  margin-left: 85px;
  margin-top: 100px;
  line-height: 1.7;
`;

const Stbox = styled.img`
  align-items: center;
  text-align: center;
  justify-content: space-between;
  width: 130px;
  height: 130px;
  border: 1px solid black;
  margin: 20px;
  border-radius: 13px;
  background: #d9d9d9;
  cursor: pointer;
`;

const StHorizontalLine = styled.div`
  width: 80%;
  border-bottom: 1px solid gray;
  margin: 10px auto;
`;

const StgpsContainer = styled.div`
  display: flex;
  & div {
    width: 435px;
    height: 455px;
    margin: auto;
    background: #d9d9d9;
  }
`;
