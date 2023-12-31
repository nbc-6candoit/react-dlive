import React from "react";
import styled from "styled-components";

const Tag = ({ tagName, onClick, category, clicked, disableCursor }) => {
  const handleTagClick = () => {
    onClick && onClick(tagName, category, !clicked);
  };

  return (
    <StTag
      clicked={clicked}
      onClick={handleTagClick}
      disableCursor={disableCursor}
    >
      {tagName}
    </StTag>
  );
};

export default Tag;

const StTag = styled.p`
  color: ${(props) => (props.clicked ? "white" : "5eb470")};
  background-color: ${(props) => (props.clicked ? "#5eb470" : "white")};
  border: 1px solid #5eb470;
  padding: 0.4rem 1rem;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
  font-size: 13px;
  cursor: ${(props) => (props.disableCursor ? "auto" : "pointer")};
  user-select: none;
`;
