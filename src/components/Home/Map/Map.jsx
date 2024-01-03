import React, { useEffect, useRef, useState } from "react";
import { NaverMap, Marker, useNavermaps } from "react-naver-maps";
import { useSelector } from "react-redux";

export const Map = () => {
  const navermaps = useNavermaps();
  const { location } = useSelector((state) => state.spot);
  const [userMarker, setUserMarker] = useState(null);
  const [otherMarkers, setOtherMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const spotMap = useRef(null);

  useEffect(() => {
    if (!spotMap.current) {
      spotMap.current = new navermaps.Map("map", {
        center: new navermaps.LatLng(location.latitude, location.longitude),
        zoom: 15,
      });
    }

    if (navigator.geolocation) {
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
          spotMap.current.setZoom(15);

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

            navermaps.Event.addListener(otherMarker, "click", () => {
              setSelectedMarker(otherMarker);
            });

            otherMarkersArray.push(otherMarker);
          }

          setOtherMarkers(otherMarkersArray);
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [navermaps, location]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }}>
        {selectedMarker && (
          <div
            style={{
              position: "absolute",
              zIndex: 1,
              background: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            <p>{selectedMarker.getTitle()}</p>
          </div>
        )}
      </div>
    </div>
  );
};
