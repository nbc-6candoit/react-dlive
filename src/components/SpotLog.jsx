import React from 'react';
import styled from 'styled-components';
import LogCard from './common/LogCard';
import { useEffect } from 'react';
import { collection, getDoc, getDocs } from '@firebase/firestore';
import { db } from 'shared/firebase';
import { useState } from 'react';

const SpotLog = () => {
    const handleMoreLogClick = () => {
        alert('더보기');
    };
    const [logList, setLogList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'log'), {});
                const array = [];
                querySnapshot.forEach((log) => {
                    array.push(log.data());
                });
                setLogList(array);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <StSpotInfoContainer>
            <StDetailInfo>
                <h3>차박로그</h3>
                <StHorizontalLine />
            </StDetailInfo>
            <StLogListWrapper>
                {logList.map((log, index) => {
                    console.log('log.images[0]}', log.images[0]);
                    <div key={index}>
                        <img src={log.images[0]} alt={`${index}`} />
                        <h3>{log.title}</h3>
                        <p>{log.content}</p>
                    </div>;
                })}
                <LogCard
                    src='https://www.readersnews.com/news/photo/201809/90001_50000_293.jpg'
                    spotName='안반데기'
                    nickName='닉네임'
                    contents='한국에서 가장 높은 곳에 위치한 마을강릉 안반데기는
        해발 1,100m에 위치한 만큼가슴 속까지 뻥- 뚫리는 뷰를 마주할 수 있어요.
        사실 안반데기의 진가는 밤이 되면 나타나는데요.
        칠흑같은 밤하늘을 수놓은 별들이마치 쏟아질 듯 아름다운 풍경을 자아낸답니다.
        깨끗한 공기와 영롱한 자연의 진가를확인하기에는 최적의 차박 명소예요.'
                />
                <LogCard
                    src='https://www.readersnews.com/news/photo/201809/90001_50000_293.jpg'
                    spotName='안반데기'
                    nickName='닉네임'
                    contents='한국에서 가장 높은 곳에 위치한 마을강릉 안반데기는
        해발 1,100m에 위치한 만큼가슴 속까지 뻥- 뚫리는 뷰를 마주할 수 있어요.
        사실 안반데기의 진가는 밤이 되면 나타나는데요.
        칠흑같은 밤하늘을 수놓은 별들이마치 쏟아질 듯 아름다운 풍경을 자아낸답니다.
        깨끗한 공기와 영롱한 자연의 진가를확인하기에는 최적의 차박 명소예요.'
                />
                <LogCard
                    src='https://www.readersnews.com/news/photo/201809/90001_50000_293.jpg'
                    spotName='안반데기'
                    nickName='닉네임'
                    contents='한국에서 가장 높은 곳에 위치한 마을강릉 안반데기는
        해발 1,100m에 위치한 만큼가슴 속까지 뻥- 뚫리는 뷰를 마주할 수 있어요.
        사실 안반데기의 진가는 밤이 되면 나타나는데요.
        칠흑같은 밤하늘을 수놓은 별들이마치 쏟아질 듯 아름다운 풍경을 자아낸답니다.
        깨끗한 공기와 영롱한 자연의 진가를확인하기에는 최적의 차박 명소예요.'
                />
            </StLogListWrapper>
            <StMoreLogButton onClick={handleMoreLogClick}>차박로그 더보기</StMoreLogButton>
        </StSpotInfoContainer>
    );
};

export default SpotLog;

export const StHorizontalLine = styled.div`
    width: 80%;
    border-bottom: 1px solid gray;
`;

const StSpotInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 40px;
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

const StLogListWrapper = styled.div`
    flex: 1;
    height: fit-content;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

const StMoreLogButton = styled.button`
    border: 1px solid lightgray;
    border-radius: 4px;
    width: 80%;
    padding: 0.7rem;
    text-align: center;
    cursor: pointer;
`;
