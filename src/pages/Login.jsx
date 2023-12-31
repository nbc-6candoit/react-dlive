import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
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
    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            setCurrentUser(user?.email);
        });
    }, []);

    const handlerlogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setLoginEmail('');
            setLoginPassword('');
            dispatch(changeLoginStatus(true));
            dispatch(setAuthChecked(true));

            await swal('로그인 완료 🏕️', '어서오세요!', 'success');
            setCurrentUser(userCredential.user.email);

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
                <Button type='button' onClick={handlerlogin} text='로그인' width={'320px'}></Button>
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
    width: 100%;
    max-width: 620px;
    margin: 40px 0;
    gap: 30px;
    & h1 {
        font-size: 20px;
    }
`;

const StinputSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

const StloginInput = styled.input`
    max-width: 320px;
    width: 100%;
    height: 48px;
    background: #f1f1f1;
    border-radius: 8px;
    padding: 0 20px;
    font-size: 16px;
`;
const StbuttonSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const StstyledGoogleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    max-width: 320px;
    width: 100%;
    height: 48px;
    font-size: 16px;
    color: #5eb470;
    border-radius: 5px;
    border: 1px solid #5eb470;
    margin: 20px 0;
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
