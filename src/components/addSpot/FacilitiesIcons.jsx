import React from "react";
import styled from "styled-components";

const FacilitiesIcons = ({ clicked, onClick, icon, label }) => {
  return (
    <StIconWrapper clicked={clicked} onClick={onClick}>
      {icon}
      <p>{label}</p>
    </StIconWrapper>
  );
};

export default FacilitiesIcons;

const StIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  gap: 0.7rem;
  cursor: pointer;
  color: ${(props) =>
    props.clicked === true || props.clicked === "true" ? "#5eb470" : "#999"};
`;
