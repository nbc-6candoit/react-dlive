import { React } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Timestamp, collection, getDocs } from '@firebase/firestore';
import { db } from 'shared/firebase';
import Button from 'components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getQueryLogs } from '../../redux/modules/logSlice';
import LogCard from 'components/common/LogCard';
import { Link, useNavigate, useParams } from 'react-router-dom';

const SpotLog = ({ filterBySpot = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { spotId } = useParams();
    console.log(spotId);

    const logList = useSelector((state) => {
        return state.logSlice.snapshotLogs;
    });

    console.log(logList);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let querySnapshot;

                if (filterBySpot) {
                    querySnapshot = await getDocs(collection(db, 'log').where('spotId', '==', spotId));
                } else {
                    querySnapshot = await getDocs(collection(db, 'log'));
                }

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
    }, [dispatch, filterBySpot, spotId]);

    const filteredLogList = filterBySpot ? logList.filter((log) => log.spotId === spotId) : logList;
    console.log(filteredLogList);

    return (
        <StSpotInfoContainer>
            <StDetailInfo>
                <h3>차박로그</h3>
            </StDetailInfo>
            <StLogListWrapper>
                {filteredLogList.length === 0 ? (
                    <p>해당 명소의 로그가 없습니다. 차박로그를 등록해 주세요!</p>
                ) : (
                    filteredLogList.slice(0, 3).map((log, index) => (
                        <Link key={log.docID} to={`/log/${log.docID}/${spotId}`}>
                            <LogCard title={log.title} content={log.content} index={index} images={log.images} />
                        </Link>
                    ))
                )}
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
    margin-bottom: 40px;
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
