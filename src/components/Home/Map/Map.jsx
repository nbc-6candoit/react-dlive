import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "shared/firebase";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCoordinates,
  setCoordinatesLoading,
  setCoordinatesError,
} from "../../../redux/modules/homeSlice";
import _ from "lodash";
export const Map = ({ documentId }) => {
  const mapContainerRef = useRef(null);
  const dispatch = useDispatch();

  // 좌표를 불러오는 React Query 훅 사용
  // React Query를 사용하여 spot 데이터 가져오기

  const {
    data: spotData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchSpotData", documentId],
    queryFn: async () => {
      try {
        const documentRef = db.collection("spot").doc(documentId);
        const doc = await documentRef.get();
        if (doc.exists) {
          return doc.data();
        } else {
          throw new Error("문서가 존재하지 않습니다.");
        }
      } catch (error) {
        throw new Error(
          `Firestore에서 문서를 가져오는 중 에러 발생: ${error.message}`
        );
      }
    },
  });

  useEffect(() => {
    const { naver } = window;

    const handleGeoLocationSuccess = (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const currentLocation = new naver.maps.LatLng({
          lat: latitude,
          lng: longitude,
        });

        const mapOptions = {
          center: currentLocation,
          zoom: 17,
        };

        const map = new naver.maps.Map(mapContainerRef.current, mapOptions);

        // spotData가 있는지 확인
        if (spotData) {
          // spotData를 사용하여 좌표 업데이트 또는 다른 작업 수행
          dispatch(updateCoordinates(spotData));
        }

        const marker = new naver.maps.Marker({
          position: currentLocation,
          map,
        });
      } catch (error) {
        console.error("현재 위치를 설정하는 중에 오류가 발생했습니다:", error);
        dispatch(
          setCoordinatesError("현재 위치를 설정하는 중에 오류가 발생했습니다.")
        );
      }
    };

    const handleGeoLocationError = (error) => {
      console.error("현재 위치를 가져오는 데 실패했습니다:", error);
      dispatch(setCoordinatesError("현재 위치를 가져오는 데 실패했습니다."));
    };

    navigator.geolocation.getCurrentPosition(
      handleGeoLocationSuccess,
      handleGeoLocationError
    );
  }, [dispatch, documentId, spotData]);

  return <StyledMapContainer ref={mapContainerRef}></StyledMapContainer>;
};

const StyledMapContainer = styled.div`
  position: fixed;

  width: 1000px;
  height: 1000px;
  margin: 0 auto;
`;

export default Map;
