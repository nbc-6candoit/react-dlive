import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dlivelogo from "assets/img/logo.png";

export const Slide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    focusOnSelect: true,
    pauseOnDotsHover: true, // 마우스 드래그 기능
  };

  return (
    <>
      <StyledSlider>
        <Slider {...settings}>
          <div>
            <Stbox src={dlivelogo}></Stbox>
          </div>
          <div>
            <Stbox src={dlivelogo}></Stbox>
          </div>
          <div>
            <Stbox src={dlivelogo}></Stbox>
          </div>
          <div>
            <Stbox src={dlivelogo}></Stbox>
          </div>
          <div>
            <Stbox src={dlivelogo}></Stbox>
          </div>
          <div>
            <Stbox src={dlivelogo}></Stbox>
          </div>
          <div>
            <Stbox src={dlivelogo}></Stbox>
          </div>
        </Slider>
      </StyledSlider>
    </>
  );
};

const StyledSlider = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
  background-color: #d9d9d9;
  width: 100%;
  height: 100%;
`;
const Stbox = styled.img`
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 13px;
  background: #d9d9d9;
  cursor: pointer;
`;
