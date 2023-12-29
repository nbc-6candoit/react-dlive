import React, { useEffect, useRef } from "react";
import { NaverMap, Marker } from "react-naver-maps";
import styled from "styled-components";

export const Map = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const { naver } = window;

    const location = new naver.maps.LatLng({
      lat: 37.5666102,
      lng: 126.9783881,
    });

    const options = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map(mapContainer.current, options);
    window.navermap_authFailure = function (error) {
      return console.log("error :", error);
    };

    const markerPosition = new naver.maps.LatLng({
      lat: 37.5666102,
      lng: 126.9783881,
    }); // 마커 위치

    new naver.maps.Marker({
      position: markerPosition,
      map,
    });
  }, []);

  return (
    <StMapContainer ref={mapContainer}>
      {/* <NaverMap></NaverMap> */}
    </StMapContainer>
  );
};

const StMapContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 1000px;
  height: 1000px;
  margin: 0 auto;
`;

export default Map;
