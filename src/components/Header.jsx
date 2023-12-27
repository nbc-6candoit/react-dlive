import React from "react";
import styled from "styled-components";
import dlivelogo from "../assets/img/dlivelogo.png";

const Header = () => {
  return (
    <FixedSide>
      <img src={dlivelogo} alt="로고" />
    </FixedSide>
  );
};

export default Header;

const FixedSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #11998e, #38ef7d);
  width: 50%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
`;
