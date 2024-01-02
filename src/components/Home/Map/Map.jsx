import React, { useEffect, useRef, useState } from "react";
import { useNavermaps } from "react-naver-maps";
import { useSelector, useDispatch } from "react-redux";
import { __getSpots } from "../../../redux/modules/spotDataSlice";

export const Map = () => {
  const navermaps = useNavermaps();
  const { location } = useSelector((state) => state.spot);
  const dispatch = useDispatch();
  const [userMarker, setUserMarker] = useState(null);
  const [otherMarkers, setOtherMarkers] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(15);
  const spotMap = useRef(null);

  useEffect(() => {
    if (!spotMap.current) {
      initializeMap();
    }

    if (navigator.geolocation) {
      getUserLocation();
    }
  }, []);

  useEffect(() => {
    dispatch(__getSpots([]));
  }, []);
  const initializeMap = () => {
    spotMap.current = new navermaps.Map("map", {
      center: new navermaps.LatLng(location.latitude, location.longitude),
      zoom: zoomLevel,
    });
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = new navermaps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        const userMarker = new navermaps.Marker({
          position: userLocation,
          map: spotMap.current,
          title: "Your Location",
          draggable: false,
          animation: navermaps.Animation.NONE,
        });

        setUserMarker(userMarker);

        spotMap.current.setCenter(userLocation);
        spotMap.current.setZoom(zoomLevel);

        createOtherMarkers(userLocation);
      },
      (error) => {
        console.error("Error getting user's location:", error);
      }
    );
  };

  const createOtherMarkers = (userLocation) => {
    const otherMarkersArray = [];
    const radius = 0.01;

    for (let i = 0; i < 10; i++) {
      const angle = (i * 360) / 10;
      const markerPosition = new navermaps.LatLng(
        userLocation.lat() + radius * Math.cos(angle),
        userLocation.lng() + radius * Math.sin(angle)
      );

      const otherMarker = new navermaps.Marker({
        position: markerPosition,
        map: spotMap.current,
        title: `Marker ${i + 1}`,
        animation: navermaps.Animation.NONE,
      });

      addInfoWindowToMarker(otherMarker);

      otherMarkersArray.push(otherMarker);
    }

    setOtherMarkers(otherMarkersArray);
  };

  const addInfoWindowToMarker = (marker) => {
    const contentString = `<div style="text-align: center;"><b>차박위치 제목</b></div>`;
    const infowindow = new navermaps.InfoWindow({
      content: contentString,
      maxWidth: 200,
    });

    navermaps.Event.addListener(marker, "click", () => {
      infowindow.open(spotMap.current, marker);
    });
  };

  const handleZoomChange = () => {
    setZoomLevel(spotMap.current.getZoom());
  };

  useEffect(() => {
    const map = spotMap.current;

    if (map) {
      navermaps.Event.addListener(map, "zoom_changed", handleZoomChange);
    }

    return () => {
      if (map) {
        navermaps.Event.removeListener(map, "zoom_changed", handleZoomChange);
      }
    };
  }, [navermaps.Event, spotMap]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};
