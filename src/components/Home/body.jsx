import React from 'react';
import styled from 'styled-components';
import { Slide } from './slide/Slide';
import SpotLog from '../SpotDetail/SpotLog';
import { Map } from './Map/Map';
import HotSpotList from './HotSpotList';
import Button from 'components/common/Button';
import { useNavigate } from 'react-router-dom';
import mountains from 'assets/img/산2.png';
import rivers from 'assets/img/강2.png';
import seas from 'assets/img/바다2.png';

function Body() {
    const navigate = useNavigate();
    const handleMoreDetailButtonClick = (contentType) => {
        navigate(`/spotdetail/${contentType}`);
    };
    const handleMountainsClick = () => {
        navigate('/viewDetail/mountains');
    };

    const handleRiverClick = () => {
        navigate('/viewDetail/river');
    };
    const handleOceanClick = () => {
        navigate('/viewDetail/Ocean');
    };

    return (
        <>
            <StbodyContainer>
                <>
                    <Slide />
                </>
                <StListContainer>
                    <StcategoryContainer>
                        <h3>뷰 카테고리</h3>
                        <StWrapper>
                            <StBox onClick={handleMountainsClick}>
                                <StCategory type='img' src={mountains} />
                                <span>마운틴뷰</span>
                            </StBox>
                            <StBox onClick={handleRiverClick}>
                                <StCategory type='img' src={rivers} />
                                <span>리버뷰</span>
                            </StBox>
                            <StBox onClick={handleOceanClick}>
                                <StCategory type='img' src={seas} />
                                <span>오션뷰</span>
                            </StBox>
                        </StWrapper>
                    </StcategoryContainer>
                    <Button
                        type={'button'}
                        onClick={() => (window.location.href = '/addspot')}
                        text={'나만의 차박명소 등록하기'}
                    />
                    <StDetailInfo>
                        <h3>지금뜨는 차박명소</h3>
                        <HotSpotList />
                        <Button
                            type={'button'}
                            onClick={() => handleMoreDetailButtonClick('spot')}
                            text={'차박명소 더보기'}
                        />
                    </StDetailInfo>
                    <>
                        <SpotLog />
                        <Button
                            type='button'
                            text='차박로그 더보기'
                            onClick={() => handleMoreDetailButtonClick('log')}
                        />
                    </>
                    <StDetailInfo>
                        <h3>주변 차박명소</h3>
                        <StgpsContainer>
                            <Map />
                        </StgpsContainer>
                    </StDetailInfo>
                </StListContainer>
            </StbodyContainer>
        </>
    );
}

export default Body;

const StbodyContainer = styled.main`
    overflow-y: auto;
    max-width: 620px;
    height: fit-content;
    margin-bottom: 50px;
`;

const StListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
`;

const StDetailInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 40px;
    line-height: 1.7;
    & h3 {
        font-size: 20px;
    }
`;

const StcategoryContainer = styled.div`
    & h3 {
        font-size: 20px;
        margin-bottom: 12px;
    }
`;

const StWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    max-width: 320px;
    width: 100%;
    gap: 20px;
`;

const StBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    & span {
        font-size: 15px;
        color: #777;
    }
`;

const StCategory = styled.img`
    width: 72px;
    height: 72px;
    border-radius: 60px;
    margin: 20px auto 0 auto;
    gap: 5;
`;

const StgpsContainer = styled.div`
    display: flex;
    & div {
        width: 100%;
        height: 455px;
        margin: auto;
    }
`;
