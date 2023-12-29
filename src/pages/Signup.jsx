import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import swal from "sweetalert";
import { auth } from "../shared/firebase";
import { changeMemberStatus } from "../redux/modules/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultphoto from "../assets/img/avatar.png";

export default function Signup() {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupNickname, setSignupNickname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetInputs = () => {
    setSignupEmail("");
    setSignupPassword("");
    setSignupNickname("");
  };

  const checkInputs = () => {
    if (
      signupEmail.trim().length === 0 ||
      signupPassword.trim().length === 0 ||
      signupNickname.trim().length === 0
    ) {
      swal("정보를 모두 입력해주세요");

      return;
    }
    if (2 < signupNickname.length < 10) {
      swal("닉네임은 2자 이상 10자 이하여야 합니다");
      setSignupNickname("");
      return;
    }

    return true;
  };

  const signupHandler = async () => {
    if (!checkInputs()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      await updateProfile(auth.currentUser, {
        displayName: signupNickname,
        photoURL: defaultphoto,
      });

      swal("Good Job!", "회원가입이 완료되었습니다!", "success");

      dispatch(changeMemberStatus(true));
      setSignupEmail("");
      setSignupPassword("");
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        swal("Oops...", "이미 사용중인 이메일입니다!", "error");
      } else if (errorCode === "auth/missing-password") {
        swal("Oops...", "비밀번호를 입력해주세요!", "error");
      } else if (errorCode === "auth/invalid-email") {
        swal("Oops...", "이메일을 확인해주세요!", "error");
      } else if (errorCode === "auth/weak-password") {
        swal("Oops...", "비밀번호는 6자 이상이어야 합니다!", "error");
      }
      console.log("error with signup", errorCode);
    }
  };
  return (
    <SignupWrapper>
      <h1>🏕️ D:Live의 회원이 되어보세요!</h1>
      <InputSection>
        <SignupInput
          placeholder="이메일"
          type="email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
        />
        <SignupInput
          placeholder="비밀번호 (6자 이상)"
          type="password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        <SignupInput
          placeholder="닉네임"
          type="text"
          value={signupNickname}
          onChange={(e) => setSignupNickname(e.target.value)}
        />
      </InputSection>
      <ButtonSection>
        <StyledButton
          type="button"
          onClick={() => {
            dispatch(changeMemberStatus(true));
          }}
        >
          <Link to="/login">로그인 페이지로 이동</Link>
        </StyledButton>
        <StyledButton type="button" onClick={signupHandler}>
          회원가입 신청
        </StyledButton>
      </ButtonSection>
    </SignupWrapper>
  );
}

const SignupWrapper = styled.div`
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
const SignupInput = styled.input`
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
