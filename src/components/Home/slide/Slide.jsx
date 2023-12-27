import React from "react";
import styled from "styled-components";

export const Slide = () => {
  return (
    <>
      <SlideImage alt="Slide" />
    </>
  );
};

const SlideImage = styled.img`
  display: flex;
  padding: 100px;
  width: 100%;
  height: 100%;

  background-color: greenyellow;
`;
