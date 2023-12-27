import React from "react";
import styled from "styled-components";
import { Slide } from "./slide/Slide";

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
        <StspotContainer>
          <h1>지금뜨는 차박명소</h1>
        </StspotContainer>
        <div>{/* 차박로그 영역 */}</div>
        <div>{/* 주변 차박명소 지도 api 불러와서 그리기 */}</div>
      </StbodyContainer>
    </>
  );
}

export default body;

const StbodyContainer = styled.div`
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
`;
const StCategoryButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 60px;
  background: #d9d9d9;
  margin: 20px auto 0 auto;
  gap: 5;
`;

const StspotContainer = styled.div`
  display: grid;

  & h1 {
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    margin-left: 30px;
    margin-top: 100px;
  }
`;
