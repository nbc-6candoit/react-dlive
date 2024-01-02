import { React } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Timestamp, collection, getDocs } from '@firebase/firestore';
import { db } from 'shared/firebase';
import Button from 'components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getQueryLogs } from '../../redux/modules/logSlice';
import LogCard from 'components/common/LogCard';
import { Link, useNavigate } from 'react-router-dom';

const SpotLog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logList = useSelector((state) => {
        return state.logSlice.snapshotLogs;
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'log'));
                const array = querySnapshot.docs.map((log) => {
                    let logData = log.data();
                    const docID = log.id;
                    logData = { ...logData, docID };

                    // 타임스탬프 인스턴스인 경우
                    if (logData.date instanceof Timestamp) {
                        logData.date = logData.date.toDate().toISOString();
                    }

                    return logData;
                });
                await dispatch(getQueryLogs(array));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(logList);

    return (
        <StSpotInfoContainer>
            <StDetailInfo>
                <h3>차박로그</h3>
            </StDetailInfo>
            <StLogListWrapper>
                {logList.slice(0, 3).map((log, index) => {
                    return (
                        <Link key={log.docID} to={`/log/${log.docID}`}>
                            <LogCard
                                title={log.title}
                                content={log.content}
                                index={index}
                                images={log.images}
                            ></LogCard>
                        </Link>
                    );
                })}
            </StLogListWrapper>
        </StSpotInfoContainer>
    );
};

export default SpotLog;

const StSpotInfoContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 12px;
    margin-top: 40px;
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
