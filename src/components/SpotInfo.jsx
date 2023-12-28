import React from "react";
import styled from "styled-components";
import { PiToilet } from "react-icons/pi";
import { PiShower } from "react-icons/pi";
import { AiOutlineShop } from "react-icons/ai";
import { PiSignpost } from "react-icons/pi";
import { PiDog } from "react-icons/pi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { PiWechatLogoFill } from "react-icons/pi";
import Tag from "components/common/Tag";

const SpotInfo = () => {
  return (
    <>
      <StSpotInfoContainer>
        <StTitle>
          <Tag tagName="마운틴뷰" />
          <h2>안반데기</h2>
          <div>
            <span>
              <StLogIcon />
              <p>차박로그(56)</p>
            </span>
            <span>
              <StSpotIcon />
              <p>경북 고령군 덕곡면 덕운로 34</p>
            </span>
          </div>
        </StTitle>
        <StDetailInfo>
          <h3>기본정보</h3>
          <StHorizontalLine />
          <StInfoWrapper>
            <div>
              <h4>뷰</h4>
              <h4>한줄소개</h4>
              <h4>추천계절</h4>
              <h4>시설정보</h4>
            </div>
            <div>
              <p>마운틴뷰</p>
              <p>고지대 캠핑장! 자연뷰 맛집 캠핑장</p>
              <p>봄/여름/가을/겨울</p>
              <StIconContainer>
                <div>
                  <StIconWrapper>
                    <PiToilet />
                  </StIconWrapper>
                  <p>화장실</p>
                </div>
                <div>
                  <StIconWrapper>
                    <PiShower />
                  </StIconWrapper>
                  <p>샤워실</p>
                </div>
                <div>
                  <StIconWrapper>
                    <AiOutlineShop />
                  </StIconWrapper>
                  <p>매점</p>
                </div>
                <div>
                  <StIconWrapper>
                    <PiSignpost />
                  </StIconWrapper>
                  <p>산책로</p>
                </div>
                <div>
                  <StIconWrapper>
                    <PiDog />
                  </StIconWrapper>
                  <p>반려동물</p>
                </div>
              </StIconContainer>
            </div>
          </StInfoWrapper>
        </StDetailInfo>
        <StDetailInfo>
          <h3>소개글</h3>
          <StHorizontalLine />
          <p>
            고지대 명소! 자연뷰 차박 맛집 :-)
            <br />
            고지대에 위치한 깨끗하고 뷰 좋은 차박 장소입니다.
            <br />
            대구 및 주변 지역에서 접근성이 좋습니다.
            <br />
            찾아주시는 모든분들이 안락한 휴식과
            <br />
            아름다운 추억을 가져가실 수 있는 공간입니다.
          </p>
        </StDetailInfo>
        <StMapWrapper>지도</StMapWrapper>
      </StSpotInfoContainer>
    </>
  );
};

export default SpotInfo;

const StHorizontalLine = styled.div`
  width: 80%;
  border-bottom: 1px solid gray;
`;

const StSpotInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 40px;
`;

const StTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & h2 {
    font-size: 30px;
  }
  & div {
    line-height: 1.5;
  }
  & span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
`;

const StSpotIcon = styled(FaMapMarkedAlt)`
  color: #11998e;
`;

const StLogIcon = styled(PiWechatLogoFill)`
  color: #11998e;
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

const StInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  line-height: 2.5;
`;

const StIconContainer = styled.p`
  display: flex;
  justify-content: center;
  gap: 1.7rem;
  padding: 0.5rem;
  & p {
    font-size: 13px;
  }
`;

const StIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  gap: 1px;
`;

const StMapWrapper = styled.div`
  width: 80%;
  height: 300px;
  background-color: lightgray;
`;
