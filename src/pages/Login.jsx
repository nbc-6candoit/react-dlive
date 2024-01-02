import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../shared/firebase';
import Glogo from '../assets/img/g-logo.png';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useDispatch } from 'react-redux';
import { changeLoginStatus, changeMemberStatus, setAuthChecked } from '../redux/modules/authSlice';
import swal from 'sweetalert';
import { Await, Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerlogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setLoginEmail('');
            setLoginPassword('');
            dispatch(changeLoginStatus(true));
            dispatch(setAuthChecked(true));

            await swal('로그인 완료 🏕️', '어서오세요!', 'success');

            console.log('일반 로그인 성공!');
            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            swal('Oops...', '등록되지 않은 회원이거나 유효하지 않은 이메일입니다.', 'error');
            console.log('error with Login', errorCode, errorMessage);
        }
    };
    const handlergoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);

            console.log('구글 로그인 성공!');

            swal('로그인 완료 🏕️', '어서오세요!', 'success');

            dispatch(changeLoginStatus(true));
            dispatch(setAuthChecked(true));
            navigate('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error with GoogleLogIn', errorCode, errorMessage);
        }
    };

    return (
        <StloginWrapper>
            <h1>🏕️ D:Live에 오신 걸 환영합니다!</h1>
            <StinputSection>
                <StloginInput placeholder='아이디' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                <StloginInput
                    placeholder='비밀번호'
                    type='password'
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
            </StinputSection>
            <StbuttonSection>
                <Button type='button' onClick={handlerlogin} text='로그인'></Button>
                <StstyledGoogleButton type='button' onClick={handlergoogleLogin}>
                    <img src={Glogo}></img>
                    <p>Sign in with Google</p>
                </StstyledGoogleButton>
                <Link to='/signup'>
                    <Button
                        text='회원가입'
                        type='button'
                        onClick={() => {
                            dispatch(changeMemberStatus(false));
                        }}
                    ></Button>
                </Link>
            </StbuttonSection>
        </StloginWrapper>
    );
}

const StloginWrapper = styled.div`
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

const StloginInput = styled.input`
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
`;

const StstyledGoogleButton = styled.button`
    width: ${(props) => (props.width ? props.width : '100%')};
    height: 48px;
    font-size: 16px;
    color: #5eb470;
    border-radius: 8px;
    border: 1px solid #5eb470;
    margin-top: 30px;
    cursor: pointer;
    transition: background 200ms;
    &:hover {
        color: #fff;
        background: #5eb470;
    }

    & img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        object-fit: cover;
        background-color: white;
    }
`;
