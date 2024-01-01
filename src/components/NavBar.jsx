import React from "react";
import Button from "./common/Button";
import { auth } from "shared/firebase";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";
import {
  changeLoginStatus,
  changeMemberStatus,
} from "../redux/modules/authSlice";
import { signOut } from "firebase/auth";

export const NavBar = () => {
  const authState = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  console.log(authState.isLogin);
  // const dispatch = useDispatch();
  // const isLogin = useSelector((state) => state.authSlice.isLogin);

  const handlerlogout = async () => {
    await signOut(auth);

    swal("로그아웃", "로그아웃 되었습니다.", "success");

    dispatch(changeLoginStatus(false));
    console.log(authState.isLogin);
  };

  return (
    <StNavContainer>
      <Link to="/">
        <StNavLogo type="logo" src={logo} />
      </Link>
      <StBtnInputWrapper>
        <StHeaderButton>
          <div>
            {authState.isLogin === true ? (
              <>
                <Link to={`/mypage/:${authState.uid}`}>마이페이지</Link>

                <button onClick={handlerlogout}>로그아웃</button>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
              </>
            )}
          </div>
        </StHeaderButton>
      </StBtnInputWrapper>
    </StNavContainer>
  );
};

export default NavBar;

const StNavContainer = styled.div`
  width: 100%;
  max-width: 565px;
  height: 56px;
  display: flex;
  padding: 5px;
  margin-left: 34px;
  justify-content: space-between;
  background: #5eb470;
`;
const StNavLogo = styled.img`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 44px;
  cursor: pointer;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;
export const StHeaderButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
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
