import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { db } from "shared/firebase";
// import { updateCoordinates } from "../../redux/modules/homeSlice";
const fetchData = async (documentId) => {
  const documentRef = db.collection("spot").doc(documentId);
  try {
    const doc = await documentRef.get();
    console.log("doc", doc);
    if (doc.exists) {
      return doc.data({ latitude: 37.5666102, longitude: 126.9783881 });
    } else {
      throw new Error("문서가 존재하지 않습니다.");
    }
  } catch (error) {
    throw new Error(
      `Firestore에서 문서를 가져오는 중 에러 발생: ${error.message}`
    );
  }
};

export const Map = ({ documentId }) => {
  // Naver 지도 컨테이너에 대한 참조
  const mapContainerRef = useRef(null);
  // Firestore에서 가져온 위치 정보 상태 변수

  useEffect(() => {
    const { naver } = window;

    // Geolocation API를 이용하여 현재 위치를 가져옵니다.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = new naver.maps.LatLng({
          lat: latitude,
          lng: longitude,
        });

        // Naver 지도의 초기 위치를 현재 위치로 설정합니다.
        const mapOptions = {
          center: currentLocation,
          zoom: 17,
        };

        const map = new naver.maps.Map(mapContainerRef.current, mapOptions);

        // 인증 실패 콜백
        window.navermap_authFailure = function (error) {
          console.error("인증 실패:", error);
        };

        // 마커 위치를 현재 위치로 설정합니다.
        const marker = new naver.maps.Marker({
          position: currentLocation,
          map,
        });
      },
      (error) => {
        console.error("현재 위치를 가져오는 데 실패했습니다:", error);
      }
    );
  }, []);

  return <StyledMapContainer ref={mapContainerRef}></StyledMapContainer>;
};

const StyledMapContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 1000px;
  height: 1000px;
  margin: 0 auto;
`;

export default Map;
