// 마이페이지(Mypage)
import { useEffect, useState } from 'react';
import { auth, db } from '../shared/firebase';
import React from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { FaUserCircle } from 'react-icons/fa';
import HotSpotList from 'components/Home/HotSpotList';
import { useLocation } from 'react-router-dom';

const Mypage = () => {
    const [userData, setUserData] = useState(null);
    const [userSpots, setUserSpots] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get('userId');

    const handleMoreDetailButtonClick = (contentType) => {
        navigate(`/spotdetail/${contentType}`);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;

                if (user) {
                    // 사용자 데이터 가져오기
                    const userQuery = query(collection(db, 'users'), where('userId', '==', user.uid));
                    const userSnapshot = await getDocs(userQuery);

                    if (userSnapshot.docs.length > 0) {
                        const userData = {
                            id: userSnapshot.docs[0].id,
                            ...userSnapshot.docs[0].data(),
                        };
                        setUserData(userData);

                        // 사용자가 작성한 차박 명소 가져오기
                        const spotsQuery = query(collection(db, 'spots'), where('userId', '==', user.uid));
                        const spotsSnapshot = await getDocs(spotsQuery);
                        const userSpotsData = spotsSnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setUserSpots(userSpotsData);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, []);

    console.log(userData);

    return (
        <>
            <Stcontainer>
                {userData && (
                    <>
                        <StlogCard>
                            <StlogWrapper>
                                <FaUserCircle className='user' size='40' fill='#dddddd' />
                                <Stdiv>{userData.nickname}</Stdiv>

                                <Link to={`/InfoFix?userId=${auth.currentUser.uid}`}>
                                    <Button type='button' text='내정보 관리' width='100%'></Button>
                                </Link>
                            </StlogWrapper>
                        </StlogCard>
                    </>
                )}
            </Stcontainer>
            <StDetailInfo>
                <h3>내가 작성한 차박명소</h3>
                {userSpots.length > 0 ? <HotSpotList spots={userSpots} /> : <p>작성한 차박명소가 없습니다.</p>}
            </StDetailInfo>
        </>
    );
};

export default Mypage;

const Stdiv = styled.div`
    font-size: 20px;
`;

const Stcontainer = styled.div`
    width: 100%;
    max-width: 620px;
    margin: 40px 0;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StlogCard = styled.div`
    width: 100%;
    max-height: 120px;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #5eb470;
`;

const StlogWrapper = styled.div`
    display: flex;
    align-items: center;
    color: #5eb470;
    width: 100%;
    gap: 1rem; // Increased the gap for better spacing
    overflow: hidden;

    & ${Stdiv} {
        font-size: 20px;
        margin-right: auto; // Aligns the div to the left
    }

    & ${Button} {
        width: 40%; // Reduced the width
    }
`;

const StDetailInfo = styled.div`
    max-width: 620px;
    padding: 0 20px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    line-height: 1.7;
    & h3 {
        font-size: 20px;
    }
`;
