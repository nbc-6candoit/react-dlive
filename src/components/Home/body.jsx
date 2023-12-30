import React, { useState } from "react";
import styled from "styled-components";
import { Slide } from "./slide/Slide";
import dlivelogo from "assets/img/logo.png";
import SpotLog from "components/SpotDetail/SpotLog";
import { Map } from "./Map/Map";
import mountains from "assets/img/산.png";
import rivers from "assets/img/강.png";
import seas from "assets/img/바다.png";

const body = () => {
  return (
    <>
      <StbodyContainer>
        <>
          <Slide />
        </>
        <StcategoryContainer>
          <StCategoryButton src={mountains} />
          <StCategoryButton src={rivers} />
          <StCategoryButton src={seas} />
        </StcategoryContainer>
        <Sth1>지금뜨는 차박명소</Sth1>
        <StHorizontalLine />
        <StspotContainer>
          {/* 데이터 연결 예정 */}
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
          <Map />
        </StgpsContainer>
      </StbodyContainer>
    </>
  );
};

export default body;

const StbodyContainer = styled.main`
  overflow-y: auto;
  max-width: 530px;
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
const StCategoryButton = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 60px;

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
  padding: 40px;
  gap: 20px;
  flex: 3;
`;
const Sth1 = styled.div`
  width: 100%;
  max-width: 530px;
  margin: 0 20px;
  color: #000;
  font-size: 20px;
  font-weight: 800;
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
  cursor: pointer;
`;

const StHorizontalLine = styled.div`
  border-bottom: 1px solid gray;
  margin: 10px 20px;
`;

const StgpsContainer = styled.div`
  display: flex;
  & div {
    width: 435px;
    height: 455px;
    margin: auto;
  }
`;
