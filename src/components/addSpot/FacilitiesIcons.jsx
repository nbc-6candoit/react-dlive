import React from "react";
import styled from "styled-components";

const FacilitiesIcons = ({
  clicked,
  onClick,
  icon,
  label,
  disableCursor,
  uid,
}) => {
  return (
    <StIconWrapper
      clicked={clicked}
      onClick={onClick}
      disableCursor={disableCursor}
      key={uid}
    >
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
  cursor: ${(props) => (props.disableCursor ? "auto" : "pointer")};
  user-select: none;
  color: ${(props) =>
    props.clicked === true || props.clicked === "true" ? "#5eb470" : "#999"};
`;
