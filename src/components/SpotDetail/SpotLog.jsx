import { React } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { Timestamp, collection, getDocs } from "@firebase/firestore";
import { db } from "shared/firebase";
import Button from "components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getQueryLogs } from "../../redux/modules/logSlice";
import LogCard from "components/common/LogCard";
import { Link } from "react-router-dom";

const SpotLog = () => {
  const dispatch = useDispatch();
  const handleMoreLogClick = () => {
    alert("더보기");
  };

  const logList = useSelector((state) => {
    return state.logSlice.snapshotLogs;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "log"));
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
        console.error("Error fetching data:", error);
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
      <Button
        type="button"
        text="차박로그 더보기"
        onClick={handleMoreLogClick}
      />
    </StSpotInfoContainer>
  );
};

export default SpotLog;

export const StHorizontalLine = styled.div`
  border-bottom: 1px solid gray;
`;

const StSpotInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  line-height: 1.7;
  margin: 0 20px;
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
  margin: 0 20px;
`;
