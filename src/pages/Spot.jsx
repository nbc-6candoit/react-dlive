// 차박명소 상세페이지(Spot)
import React from 'react';
import SpotInfo from 'components/SpotDetail/SpotInfo';
import SpotLog from 'components/SpotDetail/SpotLog';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Button from 'components/common/Button';

const Spot = () => {
    const { spotId } = useParams();
    console.log(spotId);

    return (
        <StPageContainer>
            <SpotInfo />
            <StButton>
                <Button text={'차박로그 등록하기'} onClick={() => (window.location.href = `/addlog/${spotId}`)} />
            </StButton>
            <StSpotLogWrapper>
                <SpotLog filterBySpot={true} />
            </StSpotLogWrapper>
        </StPageContainer>
    );
};

export default Spot;

const StPageContainer = styled.div`
    max-width: 620px;
`;

const StButton = styled.div`
    margin-bottom: 20px;
    padding: 0 40px;
`;

const StSpotLogWrapper = styled.div`
    overflow-y: auto;
    height: fit-content;
    margin-bottom: 50px;
    padding: 40px;
`;
