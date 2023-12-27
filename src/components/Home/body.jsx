import React from "react";
import styled from "styled-components";
import { Slide } from "./slide/Slide";

function Body() {
  return (
    <>
      <StbodyContainer>
        <>
          <Slide />
        </>
        <StcategoryContainer>
          <StCategoryButton>마운틴 뷰</StCategoryButton>
        </StcategoryContainer>
        <div>{/* 지금뜨는 차박명소 이미지 영역 */}</div>
        <div>{/* 차박로그 영역 */}</div>
        <div>{/* 주변 차박명소 지도 api 불러와서 그리기 */}</div>
      </StbodyContainer>
    </>
  );
}

export default Body;

const StbodyContainer = styled.div`
  overflow-y: auto;
  height: fit-content;
  margin-bottom: 50px;
  /* display: flex;
  width: 100%;
  height: 100%; */
`;

const StcategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;
const StCategoryButton = styled.div`
  width: 100%;
  height: 67px;
  display: flex;
`;
