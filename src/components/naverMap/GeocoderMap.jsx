import React, { useEffect, useRef } from "react";

const GeocoderMap = () => {
  const mapRef = useRef(null);
  const infoWindow = useRef(null);

  useEffect(() => {
    const { naver } = window;

    // 지도 초기화
    const map = new naver.maps.Map("map", {
      center: new window.naver.maps.LatLng(37.5666103, 126.9783882),
      zoom: 15,
      mapTypeControl: true,
    });

    // 정보창 초기화
    const infoWindowInstance = new naver.maps.InfoWindow({
      anchorSkew: true,
    });

    // 맵 커서 포인터로 설정
    map.setCursor("pointer");

    mapRef.current = map;
    infoWindow.current = infoWindowInstance;

    // 주소로 좌표 검색
    function searchAddressToCoordinate(address) {
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

          var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);

          infoWindow.current.setContent(
            [
              '<div style="padding:10px;min-width:200px;line-height:150%;">',
              '<h4 style="margin-top:5px;">' + address + "</h4><br />",
              htmlAddresses.join("<br />"),
              "</div>",
            ].join("\n")
          );

          map.setCenter(point);
          infoWindow.current.open(map, point);
        }
      );
    }

    // 좌표로 주소 검색
    function searchCoordinateToAddress(latlng) {
      alert(`Clicked coordinates: ${latlng.getLat()}, ${latlng.getLng()}`);
    }

    document
      .getElementById("address")
      .addEventListener("keydown", function (e) {
        var keyCode = e.which;

        if (keyCode === 13) {
          // Enter Key
          searchAddressToCoordinate(document.getElementById("address").value);
        }
      });

    document.getElementById("submit").addEventListener("click", function (e) {
      e.preventDefault();
      searchAddressToCoordinate(document.getElementById("address").value);
    });
  }, []);

  return <div></div>;
};

export default GeocoderMap;
