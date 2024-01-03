// 뷰별 상세페이지(SpotDetail)
import LogCard from 'components/common/LogCard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getSpots } from '../redux/modules/spotDataSlice';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';

const SpotDetail = () => {
    const dispatch = useDispatch();
    const { type } = useParams();
    const { spot } = useSelector((state) => state.spotData);
    const [visibleItems, setVisibleItems] = useState(5);
    const logList = useSelector((state) => {
        return state.logSlice.snapshotLogs;
    });

    useEffect(() => {
        dispatch(__getSpots());
    }, [dispatch, type]);

    const displayedItems = type === 'log' ? logList.slice(0, visibleItems) : spot.slice(0, visibleItems);

    const handleLoadMoreClick = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
    };

    const totalItems = type === 'log' ? logList.length : spot.length;

    const isAllItemsVisible = visibleItems >= totalItems;

    return (
        <StSpotInfoContainer>
            <StDetailInfo>
                <h3>{`${type === 'spot' ? '차박명소' : '차박로그'}`}</h3>
                <StHorizontalLine />
            </StDetailInfo>
            <StLogListWrapper>
                {displayedItems.map((spot, index) => {
                    return (
                        <Link key={spot.id} to={`/${type}/${spot.docID}/${spot.spotId}`}>
                            <LogCard
                                key={index}
                                title={type === 'log' ? spot.title : spot.name}
                                content={spot.content}
                                images={spot.images}
                                index={spot.id}
                            />
                        </Link>
                    );
                })}
            </StLogListWrapper>
            {!isAllItemsVisible && (
                <Button
                    type={'button'}
                    text={type === 'spot' ? '차박명소 더보기' : '차박로그 더보기'}
                    onClick={handleLoadMoreClick}
                />
            )}
        </StSpotInfoContainer>
    );
};

export default SpotDetail;

const StSpotInfoContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 620px;
    flex-direction: column;
    gap: 2rem;
    padding: 40px;
`;

const StLogListWrapper = styled.div`
    flex: 1;
    height: fit-content;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const StDetailInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    line-height: 1.7;
    & h3 {
        font-size: 20px;
    }
`;

export const StHorizontalLine = styled.div`
    width: 100%;
    border-bottom: 1px solid #dedede;
`;
