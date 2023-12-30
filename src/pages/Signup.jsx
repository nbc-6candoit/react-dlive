import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import swal from "sweetalert";
import { auth, db, app } from "../shared/firebase";
import { changeMemberStatus } from "../redux/modules/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import defaultphoto from "../assets/img/avatar.png";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Button from "components/common/Button";

export default function Signup() {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupNickname, setSignupNickname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultavatar = defaultphoto;

  const checkInputs = () => {
    if (
      signupEmail.trim().length === 0 ||
      signupPassword.trim().length === 0 ||
      signupNickname.trim().length === 0
    ) {
      swal("정보를 모두 입력해주세요");

      return;
    }
    if (signupNickname.length < 2) {
      swal("닉네임은 2자 이상 10자 이하여야 합니다");
      setSignupNickname("");
      return;
    }
    if (signupNickname.length > 10) {
      swal("닉네임은 2자 이상 10자 이하여야 합니다");
      setSignupNickname("");
      return;
    }

    return true;
  };

  const handlersignup = async () => {
    if (!checkInputs()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      const userId = userCredential.user.uid;
      await updateProfile(auth.currentUser, {
        displayName: signupNickname,
        photoURL: defaultphoto,
      });

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, {
        email: signupEmail,
        nickname: signupNickname,
        avatar: defaultavatar,
        userId: userId,
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
    <StsignupWrapper>
      <h1>🏕️ D:Live의 회원이 되어보세요!</h1>
      <StinputSection>
        <StsignupInput
          placeholder="이메일"
          type="email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
        />
        <StsignupInput
          placeholder="비밀번호 (6자 이상)"
          type="password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        <StsignupInput
          placeholder="닉네임"
          type="text"
          value={signupNickname}
          onChange={(e) => setSignupNickname(e.target.value)}
        />
      </StinputSection>
      <StbuttonSection>
        <Link to="/login">
          <h4>이미 회원가입을 완료했다면?</h4>
          <Button
            text="로그인 하러가기"
            type="button"
            onClick={() => {
              dispatch(changeMemberStatus(true));
            }}
          />
        </Link>
        <Button text="회원가입 신청" type="button" onClick={handlersignup} />
      </StbuttonSection>
    </StsignupWrapper>
  );
}

const StsignupWrapper = styled.div`
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
const StinputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const StsignupInput = styled.input`
  width: 200px;
  height: 20px;
  border-radius: 20px;
  border: 1px solid black;
  padding: 15px;
  font-size: 16px;
`;
const StbuttonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
