import React from 'react';
import Button from './common/Button';
import { auth } from 'shared/firebase';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import { useDispatch, useSelector } from 'react-redux';

import swal from 'sweetalert';
import { changeLoginStatus, changeMemberStatus, setAuthChecked } from '../redux/modules/authSlice';
import { signOut } from 'firebase/auth';

export const NavBar = () => {
    const authState = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(authState.isLogin);
    // const dispatch = useDispatch();
    // const isLogin = useSelector((state) => state.authSlice.isLogin);

    const handlerlogout = async () => {
        await signOut(auth);

        swal('로그아웃', '로그아웃 되었습니다.', 'success');
        navigate('/');

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
                    <div>
                        {authState.isLogin === true ? (
                            <>
                                <MypageLink to={`/mypage/:${authState.uid}`}>마이페이지</MypageLink>
                                <StBorder></StBorder>
                                <button onClick={handlerlogout}>로그아웃</button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>로그인</Link>
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
    height: auto;
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
    gap: 30px;

    margin: 0 auto 5 30px;
    cursor: pointer;
    & button {
        padding: 0 10px;
        font-size: 15px;
    }
    & div {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 15px;
        color: #fff;
    }
`;

const MypageLink = styled(Link)`
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
`;

const StBorder = styled.div`
    width: 1px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.6);
`;
