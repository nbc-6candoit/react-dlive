import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import { useSelector } from 'react-redux';

const LogCard = ({ title, content, images, index }) => {
    return (
        <>
            <StLogCard key={index}>
                <StImgWrapper>
                    <img src={`${images[0].url}`} alt={`img ${index}`} />
                </StImgWrapper>
                <StLogWrapper>
                    <StContent>
                        <h5>{title}</h5>
                        <p>{content}</p>
                    </StContent>
                    <div>
                        <Avatar />
                        <h6>nickname</h6>
                    </div>
                </StLogWrapper>
            </StLogCard>
        </>
    );
};

const StLogCard = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const StImgWrapper = styled.div`
    max-width: 128px;
    height: 128px;
    width: 27%;
    border-radius: 10px;
    overflow: hidden;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const StLogWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 27% - 10px);
    gap: 0.5rem;
    overflow: hidden;
    & div {
        display: flex;
        gap: 0.5rem;

        & h6 {
            font-size: 14px;
            font-weight: normal;
        }
    }
    & p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        line-height: 1.6;
    }
`;
const StContent = styled.div`
    display: flex;
    flex-direction: column;

    & h5 {
        font-size: 16px;
        font-weight: bold;
    }
    & p {
        font-weight: normal;
    }
`;

export default LogCard;
