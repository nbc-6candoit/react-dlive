import React from 'react';
import Button from './common/Button';
import { auth, db } from 'shared/firebase';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import swal from 'sweetalert';
import { changeLoginStatus, changeMemberStatus, setAuthChecked } from '../redux/modules/authSlice';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export const NavBar = () => {
    const authState = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();
    console.log(authState.isLogin);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            setCurrentUser(user?.email);
        });
    }, []);

    const handlerlogout = async () => {
        await signOut(auth);

        swal('로그아웃', '로그아웃 되었습니다.', 'success');
        navigate('/');

        setCurrentUser(null);
        dispatch(changeLoginStatus(false));
        dispatch(setAuthChecked(false));
        console.log(authState.isLogin);
    };

    return (
        <StNavContainer>
            <Link to='/'>
                <StNavLogo type='logo' src={logo} />
            </Link>
            <StBtnInputWrapper>
                <StHeaderButton>
                    {/* {authState.isLogin === true ? ( */}
                    {currentUser ? (
                        <>
                            <Link to={`/mypage/:${auth.currentUser.uid}`}>마이페이지</Link>
                            <button onClick={handlerlogout}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <StLoginLink to='/login'>로그인</StLoginLink>
                        </>
                    )}
                </StHeaderButton>
            </StBtnInputWrapper>
        </StNavContainer>
    );
};

export default NavBar;

const StNavContainer = styled.div`
    width: 100%;
    max-width: 620px;
    height: 56px;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    background: #5eb470;
`;
const StNavLogo = styled.img`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 80px;
    cursor: pointer;
`;
export const StBtnInputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;
export const StHeaderButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    color: #fff;
    cursor: pointer;
    & button {
        padding: 8px 12px;
        border: 1px solid #fff;
        border-radius: 8px;
    }
`;

const StLoginLink = styled(Link)`
    padding: 8px 12px;
    border: 1px solid #fff;
    border-radius: 8px;
`;
