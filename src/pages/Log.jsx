// 차박로그 상세페이지(Log)
import React from 'react';
import styled from 'styled-components';
import spotThumnail from 'assets/img/spot_thumbnail.jpg';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';

const Log = () => {
    return (
        <StContainer>
            {/* 유저 정보 */}
            <StUser>
                <FaUserCircle className='user' size='24' fill='#dddddd' />
                <h4>노마드차박1004</h4>
            </StUser>

            {/* 차박명소 정보 */}
            <StLink to={`Spot/:id`}>
                <StThumnail>
                    <img src={spotThumnail} alt='명소 썸네일 이미지' />
                </StThumnail>
                <StSpotInpo>
                    <p>강원 영월군</p>
                    <h3>차박명소 - 무릉도원</h3>
                </StSpotInpo>
                <StTag>마운틴뷰</StTag>
                <SlArrowRight fill='#5eb470' size='18' />
            </StLink>

            {/* 로그 내용 */}
            <StLog>
                <h2>강원도 차박하기 좋은곳 추천</h2>
                <p>
                    강원도 영월은 작은 한반도에 숨어있는 도시라고 하고 에메랄드 빛으로 유명한 평창강이 둘러싸고 있는
                    지역입니다. 행정구역으로 영월읍, 상동읍, 중동면, 김삿갓면, 북면, 남면, 한반도면, 주천면, 무릉도원면
                    등이 있습니다. 그럼 강원도 영월의 차박지와 노지 캠핑장 장소를 알아보겠습니다.{' '}
                </p>
                <img alt='로그 이미지1' />
            </StLog>
        </StContainer>
    );
};

const StContainer = styled.div`
    max-width: 530px;
    padding: 40px 20px;
    color: #333;
`;
const StUser = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #efefef;

    & .user {
        margin-right: 8px;
    }
    & h4 {
        font-size: 14px;
        font-weight: 600;
    }
`;
const StThumnail = styled.div`
    width: 56px;
    height: 56px;
    margin-right: 10px;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }
`;
const StLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 20px 10px;
    margin: 20px 0;
    /* border-bottom: 1px solid #efefef; */
    border-radius: 10px;
    border: 1px solid #d3e9d8;
    & svg {
    }
`;
const StSpotInpo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    & p {
        font-size: 13px;
        color: #777;
    }
    & h3 {
        margin-top: 6px;
        font-size: 14px;
        font-weight: 600;
    }
`;
const StTag = styled.div`
    margin-left: auto;
    margin-right: 10px;
    padding: 6px 12px;
    font-size: 12px;
    color: #fff;
    background: #5eb470;
    border-radius: 20px;
`;
const StLog = styled.div`
    padding: 40px 0;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
    & h2 {
        font-size: 18px;
        margin-bottom: 20px;
    }
    & p {
        line-height: 1.8;
        color: #777;
    }
    & img {
        margin: 40px 0;
    }
`;

export default Log;
