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
                        <h3>{title}</h3>
                        <p>{content}</p>
                    </StContent>
                    <div>
                        <Avatar />
                        <h4>nickname</h4>
                    </div>
                </StLogWrapper>
            </StLogCard>
        </>
    );
};

const StLogCard = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

const StImgWrapper = styled.div`
    width: 128px;
    height: 128px;
    border-radius: 0.5rem;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const StLogWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    overflow: hidden;
    & div {
        display: flex;
        gap: 0.5rem;

        & h4 {
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

    & h3 {
        font-size: 16px;
    }
    & p {
        font-weight: normal;
    }
`;

export default LogCard;
