import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getSpots } from "../../../redux/modules/spotDataSlice";
import { useParams } from "react-router-dom";

export const Map = () => {
  const dispatch = useDispatch();
  const { spot } = useSelector((state) => state.spotData);
  const { spotId } = useParams();
  const spotMap = useRef(null);
  const { naver } = window;

  useEffect(() => {
    // Initialize the map when the component mounts
    if (!spotMap.current) {
      spotMap.current = new naver.maps.Map("map", {
        mapTypeControl: true,
      });
    }
  }, []);

  useEffect(() => {
    // Fetch spot data when the component mounts
    dispatch(__getSpots());
  }, [dispatch]);

  useEffect(() => {
    // Perform geocoding and marker creation when selectedSpot changes
    const selectedSpot = spot.find((spot) => spot.id === spotId);

    if (selectedSpot) {
      naver.maps.Service.geocode(
        {
          query: selectedSpot.location,
        },
        function (status, response) {
          if (status !== naver.maps.Service.Status.OK) {
            return alert("Something wrong!");
          }

          const items = response.v2.addresses;
          const lat = items[0].x;
          const lng = items[0].y;

          const point = new naver.maps.Point(lat, lng);
          spotMap.current.setCenter(point);

          // Remove existing markers before adding a new one
          spotMap.current.markers &&
            spotMap.current.markers.forEach((marker) => marker.setMap(null));

          // Create a new marker for the selected spot
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map: spotMap.current,
          });

          // Save the markers on the map for future reference
          spotMap.current.markers = [marker];
        }
      );
    }
  }, [spotId, spot, naver]);

  // 지도를 표시하는 div 컨테이너
  return <StMapWrapper id="map" />;
};

const StMapWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: lightgray;
`;
