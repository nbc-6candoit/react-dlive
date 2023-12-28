import React, { useState } from "react";
import styled from "styled-components";

const Tag = ({ tagName, onClick, category }) => {
  const [clicked, setClicked] = useState(false);

  const handleTagClick = () => {
    setClicked(!clicked);
    onClick && onClick(tagName, category);
  };

  return (
    <StTag clicked={clicked} onClick={handleTagClick}>
      {tagName}
    </StTag>
  );
};

export default Tag;

const StTag = styled.p`
  color: ${(props) => (props.clicked ? "white" : "5eb470")};
  background-color: ${(props) => (props.clicked ? "#5eb470" : "white")};
  border: 1px solid ${(props) => (props.clicked ? "#5eb470" : "#5eb470")};
  padding: 0.4rem 1rem;
  width: fit-content;
  height: fit-content;
  border-radius: 0.25rem;
  font-size: 13px;
  cursor: pointer;
`;
