import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../redux/modules/spotSlice";
import styled from "styled-components";

const GeocoderMap = () => {
  const dispatch = useDispatch();
  const { location } = useSelector((state) => state.spot);
  const map = useRef(null);
  const { naver } = window;

  // 현재 위치 버튼 클릭 시 현재 위치 및 주소 표시 함수
  const handleCurrentLocationClick = useCallback(() => {
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

                const result = response.v2; // 검색 결과의 컨테이너
                const address = result.address.jibunAddress; // 검색 결과로 만든 주소
                dispatch(setLocation(address));
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
  }, [naver, map, dispatch]);

  const handleSearchAddressClick = (e) => {
    e.preventDefault();
    // 작성된 주소를 좌표로 반환
    naver.maps.Service.geocode(
      {
        query: location,
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something wrong!");
        }

        const items = response.v2.addresses; // 검색 결과의 배열
        const newAddress = items[0].jibunAddress;
        const lat = items[0].x;
        const lng = items[0].y;

        const point = new naver.maps.Point(lat, lng);

        map.current.setCenter(point);

        const marker = new naver.maps.Marker({
          position: point,
          map: map.current,
        });

        dispatch(setLocation(newAddress));
      }
    );
  };

  useEffect(() => {
    if (!map.current) {
      map.current = new naver.maps.Map("map", {
        mapTypeControl: true,
      });
      handleCurrentLocationClick();
    }
  }, []);

  const handleChangeSpotLocation = (e) => {
    e.preventDefault();
    dispatch(setLocation(e.target.value));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <StBox>
      <input
        type="text"
        id="address"
        value={location}
        onChange={handleChangeSpotLocation}
        placeholder="주소를 입력하세요"
        onKeyDown={handleInputKeyDown}
      />
      <button type="button" onClick={handleCurrentLocationClick}>
        현재위치
      </button>
      <button type="button" onClick={handleSearchAddressClick}>
        검색
      </button>
    </StBox>
  );
};

export default GeocoderMap;

const StBox = styled.div`
  display: flex;
  margin: 10px 0;
`;
