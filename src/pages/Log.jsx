// 차박로그 상세페이지(Log)
import React, { useEffect } from 'react';
import styled from 'styled-components';
import spotThumnail from 'assets/img/spot_thumbnail.jpg';
import { Link, useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Timestamp, doc, getDoc } from '@firebase/firestore';
import { db } from 'shared/firebase';
import { fetchLog } from '../redux/modules/logSlice';

const Log = () => {
    const { id, spotId } = useParams();
    const { spot } = useSelector((state) => state.spotData);
    const dispatch = useDispatch();

    const filteredSpot = spot.filter((spot) => spot.id === spotId);
    const selectedSpot = filteredSpot[0];

    const targetLog = useSelector((state) => state.logSlice.targetLog);

    useEffect(() => {
        const getLog = async (id) => {
            try {
                // 초기화 추가
                await dispatch(fetchLog({ title: '', content: '', images: [] }));

                const docRef = doc(db, 'log', id);
                const docSnap = await getDoc(docRef);
                const docData = docSnap.data();

                // 타임스탬프 인스턴스인 경우
                if (docData.date instanceof Timestamp) {
                    docData.date = docData.date.toDate().toLocaleDateString();
                }

                await dispatch(fetchLog(docData));
            } catch (error) {
                console.log('error', error);
            }
        };

        getLog(id);
    }, []);

    return (
        <StContainer>
            {/* 유저 정보 */}
            <StUser>
                <FaUserCircle className='user' size='24' fill='#dddddd' />
                <h4>노마드차박1004</h4>
            </StUser>

            {/* 차박명소 정보 */}
            <StLink to={`/spot/${spotId}`}>
                <StThumnail>
                    <img src={spotThumnail} alt='명소 썸네일 이미지' />
                </StThumnail>
                <StSpotInpo>
                    <p>{selectedSpot.location}</p>
                    <h3>차박명소 - {selectedSpot.name}</h3>
                </StSpotInpo>
                <StTag>{selectedSpot.view}</StTag>
                <SlArrowRight fill='#5eb470' size='18' />
            </StLink>

            {/* 로그 내용 */}
            <StLog>
                <h2>{targetLog?.title}</h2>
                <p>{targetLog?.content}</p>
                {targetLog.images &&
                    targetLog.images.map((image, index) => (
                        <img key={index} src={image.url} alt={`로그 이미지 ${index + 1}`} />
                    ))}
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
        border-radius: 8px;
    }
`;
const StLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 20px 10px;
    margin: 20px 0;
    /* border-bottom: 1px solid #efefef; */
    border-radius: 8px;
    border: 1px solid #d3e9d8;
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
        white-space: pre-line;
    }
    & img {
        width: 100%;
        object-fit: cover;
        margin: 40px 0;
    }
`;

export default Log;
