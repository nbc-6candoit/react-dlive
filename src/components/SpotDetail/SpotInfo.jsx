import React, { useEffect } from "react";
import styled from "styled-components";
import { PiToilet } from "react-icons/pi";
import { PiShower } from "react-icons/pi";
import { AiOutlineShop } from "react-icons/ai";
import { PiSignpost } from "react-icons/pi";
import { PiDog } from "react-icons/pi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { PiWechatLogoFill } from "react-icons/pi";
import Tag from "components/common/Tag";
import { useDispatch, useSelector } from "react-redux";
import { __getSpots } from "../../redux/modules/spotDataSlice";
import { useParams } from "react-router-dom";
import { FACILITIES_DATA } from "constants/spotOptions";
import FacilitiesIcons from "components/addSpot/FacilitiesIcons";

const SpotInfo = () => {
  const dispatch = useDispatch();
  const { spot, isLoading, isError } = useSelector((state) => state.spotData);
  const { spotId } = useParams();

  console.log(spot);

  useEffect(() => {
    dispatch(__getSpots());
  }, [dispatch]);

  const selectedSpot = spot.find((spot) => spot.id === spotId);
  if (!selectedSpot) {
    return <div>일치하는 차박 명소가 없습니다.</div>;
  }

  const seasonsString = selectedSpot.seasons.join("/");

  return (
    <>
      <StImageWrapper>
        <img src={spot?.images?.[0]} alt={selectedSpot.name} />
      </StImageWrapper>
      <StSpotInfoContainer>
        <StTitle>
          <Tag
            tagName={`${selectedSpot.view}`}
            clicked="true"
            disableCursor={true}
          />
          <h2>{selectedSpot.name}</h2>
          <div>
            <StSpotIcon />
            <p>{selectedSpot.location}</p>
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
              <p>{selectedSpot.view}</p>
              <p>{selectedSpot.sum}</p>
              <p>{seasonsString}</p>
              <StIconContainer>
                {FACILITIES_DATA.map(({ icon, label, index }) => (
                  <FacilitiesIcons
                    key={index}
                    clicked={selectedSpot.facilities.includes(label)}
                    icon={icon}
                    label={label}
                    disableCursor={true}
                  />
                ))}
              </StIconContainer>
            </div>
          </StInfoWrapper>
        </StDetailInfo>
        <StDetailInfo>
          <h3>소개글</h3>
          <StHorizontalLine />
          {selectedSpot.content}
        </StDetailInfo>
        <StMapWrapper>지도</StMapWrapper>
      </StSpotInfoContainer>
    </>
  );
};

export default SpotInfo;

const StHorizontalLine = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
`;

const StImageWrapper = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  & p {
    font-size: 15px;
  }
`;

const StSpotIcon = styled(FaMapMarkedAlt)`
  color: #5eb470;
`;

const StLogIcon = styled(PiWechatLogoFill)`
  color: #5eb470;
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
  width: 100%;
  height: 300px;
  background-color: lightgray;
`;
