// 로그인/회원가입(Login)
// import {
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
// } from "firebase/auth";
// import { useState } from "react";
// import { auth } from "../firebase";
import Glogo from "../assets/Images/logo.png";
import styled from "styled-components";
// import { useDispatch } from "react-redux";
// import {
//   changeLoginStatus,
//   changeMemberStatus,
// } from "../redux/modules/authSlice";
// import swal from "sweetalert";

const Login = () => {
  return (
    <LoginWrapper>
      <h1> D:Live에 오신 걸 환영합니다!</h1>
      <InputSection>
        <LoginInput placeholder="아이디" />
        {/* placeholder="아이디"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)} */}
        <LoginInput placeholder="비밀번호" />
        {/* placeholder="비밀번호"
        type="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)} */}
      </InputSection>
      <ButtonSection>
        <StyledButton>
          {/* type="button" onClick={loginHandler} */}
          로그인
        </StyledButton>
        <StyledGoogleButton>
          {/* type="button" onClick={googleLoginHandler} */}
          <img src={Glogo}></img>
          <p>Sign in with Google</p>
        </StyledGoogleButton>

        <StyledButton
        // type="button"
        // onClick={() => {
        //   dispatch(changeMemberStatus(false));
        // }}
        >
          회원가입
        </StyledButton>
      </ButtonSection>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  gap: 50px;
  & h1 {
    font-size: 20px;
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LoginInput = styled.input`
  width: 200px;
  height: 20px;
  border-radius: 20px;
  border: 1px solid black;
  padding: 15px;
  font-size: 16px;
`;
const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  width: 189px;
  height: 35px;
  border-radius: 20px;
  font-size: 16px;

  cursor: pointer;
`;
const StyledGoogleButton = styled.button`
  background-color: white;
  border: 1px solid black;
  width: 189px;
  height: 35px;
  border-radius: 20px;
  font-size: 16px;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  &:hover {
    background-color: #4285f4;
    color: white;
  }
  & img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    background-color: white;
  }
`;
export default Login;
