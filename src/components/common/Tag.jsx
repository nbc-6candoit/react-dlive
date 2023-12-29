import React from "react";
import styled from "styled-components";

const Tag = ({ tagName, $fontSize }) => {
  return <StTag>{tagName}</StTag>;
};

export default Tag;

const StTag = styled.p`
  color: white;
  background-color: #11998e;
  padding: 0.4rem 1rem;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
  font-size: 13px;
`;
