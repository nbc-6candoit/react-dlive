import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import mountains from "assets/img/산.png";
import { db } from "shared/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateCoordinates,
  setCoordinatesError,
} from "../../../redux/modules/homeSlice";

const __getSpots = createAsyncThunk("getSpots", async (payload, thunkAPI) => {
  try {
    const querySnapshot = await getDocs(collection(db, "spot"));
    const spotsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return spotsData;
  } catch (error) {
    console.log("error:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const Map = ({ documentId }) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth); //마커 지도
  const mapContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { spot } = useSelector((state) => state.spotData);

  // 지도 마커
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(__getSpots([]));
    const { naver } = window;

    const handleGeoLocationSuccess = (position) => {
      var HOME_PATH = window.HOME_PATH || ".";
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

        const marker = new naver.maps.Marker({
          position: currentLocation,
          map,
          title: "마운틴뷰",
          icon: {
            url: HOME_PATH + `/assets/img/산.png`,
            size: new naver.maps.Size(50, 52),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(25, 26),
          },
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
  }, []);
  const viewSpots = spot.filter((spot) => spot.view === "리버뷰") ?? [];

  return <StyledMapContainer ref={mapContainerRef}></StyledMapContainer>;
};

const StyledMapContainer = styled.div`
  margin: 0 auto;
`;

export default Map;
