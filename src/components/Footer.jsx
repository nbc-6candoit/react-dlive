import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <StyledDiv>
      <StyledAnchor>개인정보처리방침</StyledAnchor>
      <StyledAnchor>서비스 이용약관</StyledAnchor>
      <StyledAnchor>고객센터</StyledAnchor>
    </StyledDiv>
  );
}

export default Footer;

const StyledDiv = styled.div`
  background-color: #5eb470;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const StyledAnchor = styled.a`
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
`;
