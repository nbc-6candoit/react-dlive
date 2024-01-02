import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getSpots } from "../../../redux/modules/spotDataSlice";
import { FACILITIES_DATA } from "constants/spotOptions";
import { useParams } from "react-router-dom";

export const Map = () => {
  // 마커 지도
  const spotMap = useRef(null);
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const { spot } = useSelector((state) => state.spotData);
  const { naver } = window; // Naver 지도 API 객체

  // 파이어베이스 연결
  useEffect(() => {
    dispatch(__getSpots([]));
  }, [dispatch]);

  useEffect(() => {
    // 초기화: spotMap이 없다면 새로운 Naver 지도 객체를 생성
    if (!spotMap.current) {
      spotMap.current = new naver.maps.Map("map", {
        mapTypeControl: true,
      });
    }
  }, []);

  const selectedSpot = spot.find((spot) => spot.id === spotId);
  if (!selectedSpot) {
    return <div>일치하는 차박 명소가 없습니다.</div>;
  }

  // Naver 지도 API의 geocode 메서드를 호출하여 주소를 지리적 좌표로 변환
  naver.maps.Service.geocode(
    {
      query: selectedSpot.location, // 선택된 차박 명소의 주소를 쿼리로 전달
    },
    function (status, response) {
      // geocode 메서드의 콜백 함수
      // 변환 상태가 "OK"가 아닌 경우 에러 메시지를 표시하고 함수 종료
      if (status !== naver.maps.Service.Status.OK) {
        return alert("Something wrong!");
      }

      // 변환 결과에서 주소 정보가 포함된 배열을 가져옴
      const items = response.v2.addresses;
      // 주소 정보 배열에서 첫 번째 항목의 위도(x)와 경도(y)를 가져옴
      const lat = items[0].x;
      const lng = items[0].y;
      // 위도와 경도를 사용하여 Naver 지도에서 사용되는 Point 객체를 생성
      const point = new naver.maps.Point(lat, lng);
      // 지도의 중심을 새로운 좌표로 이동시킴
      spotMap.current.setCenter(point);
      // 새로운 마커를 생성하여 해당 위치에 표시
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: spotMap.current, // 마커를 표시할 지도 설정
      });
    }
  );

  const viewSpots = spot.filter((spot) => spot.view === "리버뷰") ?? [];

  // 지도를 표시하는 div 컨테이너
  return <StSpotInfoContainer ref={spotMap}></StSpotInfoContainer>;
};

const StSpotInfoContainer = styled.div`
  margin: 0 auto;
`;

export default Map;
