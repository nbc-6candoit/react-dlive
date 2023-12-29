// import React, { useEffect, useRef, useState } from "react";

// const CurrentMap = () => {
//   const [currentLocation, setCurrentLocation] = useState({
//     lat: 0,
//     lng: 0,
//   });
//   // const mapRef = useRef(null);

//   useEffect(() => {
//     const success = (location) => {
//       setCurrentLocation({
//         lat: location.coords.latitude,
//         lng: location.coords.longitude,
//       });
//     };

//     const error = () => {
//       setCurrentLocation({ lat: 37.5666103, lng: 126.9783882 });
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error);
//     }
//   }, []);

//   // useEffect(() => {
//   //   const { naver } = window;

//   //   if (currentLocation.lat !== 0 && currentLocation.lng !== 0) {
//   //     mapRef.current = new naver.maps.Map("map", {
//   //       center: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
//   //       zoom: 15,
//   //       minZoom: 10,
//   //       zoomControl: true,
//   //       mapTypeControl: true,
//   //       zoomControlOptions: {
//   //         position: naver.maps.Position.TOP_RIGHT,
//   //       },
//   //       mapDataControl: false,
//   //     });

//   //     new naver.maps.Marker({
//   //       position: new naver.maps.LatLng(
//   //         currentLocation.lat,
//   //         currentLocation.lng
//   //       ),
//   //       map: mapRef.current,
//   //       zIndex: 999,
//   //     });
//   //   }
//   // }, [currentLocation]);

//   return <>{/* <div id="map" ref={mapRef}></div> */}</>;
// };

// export default CurrentMap;
