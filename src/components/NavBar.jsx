import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
// import { useDispatch, useSelector } from "react-redux";

export const NavBar = () => {
  // const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.authSlice.isLogin);
  return (
    <StNavContainer>
      <Link to="/">
        <StNavLogo type="logo" src={logo} />
      </Link>
      <StBtnInputWrapper>
        <StHeaderButton>
          <Link to="/mypage">
            <button>마이페이지</button>
          </Link>
          <Link to="/login">
            <button>로그인</button>
          </Link>
          <button>로그아웃</button>
        </StHeaderButton>
      </StBtnInputWrapper>
    </StNavContainer>
  );
};

export default NavBar;

const StNavContainer = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  background: #ebebeb;
`;
const StNavLogo = styled.img`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 44px;
  cursor: pointer;
`;
export const StBtnInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;
export const StHeaderButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;

  margin: 0 auto 5 30px;
  cursor: pointer;
  & button {
    color: #5eb470;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
