import styled from "styled-components";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { __getSpots } from "../../../redux/modules/spotDataSlice";

export const Slide = () => {
  const dispatch = useDispatch();
  const { spot } = useSelector((state) => state.spotData);

  useEffect(() => {
    dispatch(__getSpots([]));
  }, []);
  const recentSpots = spot.slice([0, 4]);
  // console.log("recentSpots Array : ", recentSpots);
  const settings = {
    dots: true,
    speed: 1500,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    focusOnSelect: true,
    pauseOnDotsHover: true,
    arrow: true,
  };
  return (
    <StyledSlider>
      <Slider {...settings}>
        {recentSpots.map((spot) => (
          <Stbox src={spot.images[0].url} alt={spot.name} />
        ))}
      </Slider>
    </StyledSlider>
  );
};

const StyledSlider = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  max-width: 620px;
  height: 300px;
  margin: 17px;
`;
const Stbox = styled.img`
  max-width: 620px;
  display: grid;
  width: 100%;
  height: 350px;
`;
