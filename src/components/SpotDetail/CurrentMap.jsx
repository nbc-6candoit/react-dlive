import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLocation,
  setCurrentLocation,
} from "../../redux/modules/currentLocationSlice";

const CurrentMap = () => {
  const dispatch = useDispatch();
  const currentLocation = useSelector(selectCurrentLocation);

  const mapRef = useRef(null);

  useEffect(() => {
    const success = (location) => {
      dispatch(
        setCurrentLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
      );
    };
    // 내 현재 위치 값 반환 실패 시 실행 함수 -> 지도 중심을 서울시청 위치로 설정
    const error = () => {
      dispatch(setCurrentLocation({ lat: 37.5666103, lng: 126.9783882 }));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    const { naver } = window;

    // 현재 내 위치를 중심으로 하는 지도 생성
    if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
      mapRef.current = new naver.maps.Map("map", {
        // 지도 초기 중심 좌표
        center: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
        // 지도 초기 줌 레벨
        zoom: 15,
        // 지도 최소 줌 레벨
        minZoom: 10,
        // 줌 컨트롤 표시 여부
        zoomControl: true,
        // 지도 유형 컨트롤 표시 여부
        mapTypeControl: true,
        // 줌 컨트롤의 옵션
        zoomControlOptions: {
          // 줌 컨트롤의 위치를 우측 상단으로 배치함
          position: naver.maps.Position.TOP_RIGHT,
        },
        // 지도 데이터 저작권 컨트롤 표시 여부
        mapDataControl: false,
      });
      // 현재 내 위치 마커 표시
      new naver.maps.Marker({
        // 생성될 마커의 위치
        position: new naver.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        ),
        // 마커를 표시할 Map 객체
        map: mapRef.current,
        // 마커의 모양
        // icon: {
        //   url: `${myMarker}`,
        //   size: new naver.maps.Size(43, 43),
        //   scaledSize: new naver.maps.Size(43, 43),
        // },
        // 마커의 쌓임 순서
        zIndex: 999,
      });
    }
  }, [currentLocation, dispatch]);

  // // 마커들이 담겨있는 배열
  // const markers = [];

  // // 내 현재 위치에서 가장 가까운 화장실 100개만 마커 생성
  // for (let i = 1; i < 100; i++) {
  //   const marker = new naver.maps.Marker({
  //     map: mapRef.current,
  //     position: new naver.maps.LatLng(
  //       sortedToiletData[i].Y_WGS84,
  //       sortedToiletData[i].X_WGS84
  //     ),
  //     icon: {
  //       url: `${aroundToilet}`,
  //       size: new naver.maps.Size(35, 35),
  //       scaledSize: new naver.maps.Size(35, 35),
  //     },
  //   });

  //   markers.push(marker);
  // }

  return (
    <>
      <div id="map" ref={mapRef}></div>
    </>
  );
};

export default CurrentMap;
