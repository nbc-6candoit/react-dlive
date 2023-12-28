import React from "react";
import styled from "styled-components";

const Tag = ({ tagName }) => {
  return <StTag>{tagName}</StTag>;
};

export default Tag;

const StTag = styled.div`
  color: white;
  background-color: #11998e;
  padding: 0.25rem 1rem;
  width: fit-content;
  height: fit-content;
  border-radius: 2rem;
`;
