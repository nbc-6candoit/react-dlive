import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { __getSpots } from '../../../redux/modules/spotDataSlice';

const Ocean = () => {
    const [viewName] = useState(['오션뷰']);
    const dispatch = useDispatch();
    const { spot } = useSelector((state) => state.spotData);

    useEffect(() => {
        dispatch(__getSpots([]));
    }, []);

    const viewSpots = spot.filter((spot) => spot.view === '오션뷰') ?? [];

    return (
        <StbodyContainer>
            <h2>{viewName}</h2>
            {viewSpots.map((spot) => (
                <React.Fragment key={spot.id}>
                    <Link to={`/spot/${spot.id}`} key={spot.id}>
                        <StImageWrapper>
                            <StImage key={spot.id} src={spot.images[0]?.url} alt={spot.name} />
                        </StImageWrapper>
                        <StInfoBox key={spot.id}>
                            <StviewStyle>{spot.view}</StviewStyle>
                            <h3>{spot.name}</h3>
                            <p> {spot.location}</p>
                            <StWrapper>
                                {spot.facilities.map((facility, index) => (
                                    <React.Fragment key={index}>
                                        <span>{facility}</span>
                                        {index < spot.facilities.length - 1}
                                    </React.Fragment>
                                ))}
                            </StWrapper>
                        </StInfoBox>
                    </Link>
                </React.Fragment>
            ))}
        </StbodyContainer>
    );
};
const StbodyContainer = styled.main`
    max-width: 620px;
    width: 100%;
    padding: 40px 20px;
    h2 {
        font-size: 20px;
        margin-bottom: 12px;
    }
`;

const StImageWrapper = styled.div`
    max-width: 580px;
    width: 100%;
    height: 300px;
`;

const StImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
`;

const StInfoBox = styled.div`
    color: #777;
    h3 {
        font-size: 18px;
        color: #000;
    }
    p {
        margin: 10px 0 12px;
    }
    span {
        padding: 6px 12px;
        background-color: #f2f2f2ca;
        font-size: 13px;
        border-radius: 8px;
    }
`;
const StviewStyle = styled.p`
    color: white;
    background-color: #5eb470;
    padding: 6px 12px;
    width: fit-content;
    height: fit-content;
    margin: 14px 0 10px;
    border-radius: 0.25rem;
    font-size: 13px;
    user-select: none;
`;

const StWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 40px;
`;

export default Ocean;
