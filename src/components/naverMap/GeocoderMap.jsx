import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const GeocoderMap = ({ location, setLocation }) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const { naver } = window;

  // 현재 위치 버튼 클릭 시 현재 위치 표시 함수
  const showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (map.current) {
            // 현재 위치를 지도 중심으로 설정
            map.current.setCenter(new naver.maps.LatLng(latitude, longitude));

            // 현재 위치의 좌표값을 이용하여 주소 불러오기
            naver.maps.Service.reverseGeocode(
              {
                coords: new naver.maps.LatLng(latitude, longitude),
              },
              function (status, response) {
                if (status !== naver.maps.Service.Status.OK) {
                  return alert("Something wrong!");
                }

                var result = response.v2, // 검색 결과의 컨테이너
                  address = result.address.jibunAddress; // 검색 결과로 만든 주소
                setLocation(address);
              }
            );

            // 현재 위치를 지도에 마커로 표시
            const marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(latitude, longitude),
              map: map.current,
            });
          } else {
            console.error("현재 위치를 표시할 수 없습니다.");
          }
        },
        (error) => {
          console.error("현재 위치 로딩 에러 :", error.message);
        }
      );
    } else {
      console.error("지도를 표시할 수 없습니다.");
    }
  };

  // 주소로 좌표 검색
  const searchAddressToCoordinate = (address) => {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("Something Wrong!");
        }

        if (response.v2.meta.totalCount === 0) {
          return alert("totalCount" + response.v2.meta.totalCount);
        }

        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(item.x, item.y);

        map.current.setCenter(point);

        const marker = new naver.maps.Marker({
          position: point,
          map: map.current,
        });
      }
    );
  };

  // 좌표로 주소 검색
  function searchCoordinateToAddress(latlng) {
    console.log("Clicked coordinates:", latlng.getLat(), latlng.getLng());
    alert(`Clicked coordinates: ${latlng.getLat()}, ${latlng.getLng()}`);
  }

  useEffect(() => {
    const mapInstance = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.5666103, 126.9783882),
      zoom: 15,
      mapTypeControl: true,
    });

    map.current = mapInstance;

    showCurrentLocation();

    // 엔터키로 검색
    document
      .getElementById("address")
      .addEventListener("keydown", function (e) {
        var keyCode = e.which;
        if (keyCode === 13) {
          searchAddressToCoordinate(document.getElementById("address").value);
        }
      });

    // 검색 버튼으로 검색
    document.getElementById("submit").addEventListener("click", function (e) {
      e.preventDefault();
      searchAddressToCoordinate(document.getElementById("address").value);
    });
  }, []);

  const handleChangeSpotLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <StBox>
      <input
        type="text"
        id="address"
        value={location}
        onChange={handleChangeSpotLocation}
        placeholder="주소를 입력하세요"
      />
      <button id="here" onClick={showCurrentLocation}>
        현재위치
      </button>
      <button id="submit">검색</button>
      {/* <div id="map" style={{ width: "100%", height: "300px" }}></div> */}
    </StBox>
  );
};

export default GeocoderMap;

const StBox = styled.div`
  display: flex;
  margin: 10px 0;
  & button {
    font-size: 14px;
    width: 150px;
  }
`;
