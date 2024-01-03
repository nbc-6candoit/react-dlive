import styled from "styled-components";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { __getSpots } from "../../../redux/modules/spotDataSlice";
import { IoIosArrowForward } from "react-icons/io";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { IoIosArrowBack } from "react-icons/io";

export const Slide = () => {
  const dispatch = useDispatch();
  const { spot } = useSelector((state) => state.spotData);

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <SlArrowRight
        className={className}
        onClick={onClick}
        style={{
          ...style,
          width: "40px",
          height: "40px",
          top: "calc(50% - 20px)",
          display: "block",
          right: "5%",
        }}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <SlArrowLeft
        className={className}
        onClick={onClick}
        style={{
          ...style,
          width: "40px",
          height: "40px",
          top: "calc(50% - 20px)",
          display: "block",
          left: "5%",
        }}
      />
    );
  }

  useEffect(() => {
    dispatch(__getSpots([]));
  }, []);
  const recentSpots = spot.slice(0, 4);
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <StyledSlider>
      <StSlider {...settings}>
        {recentSpots.map((spot, index) => (
          <Link to={`/spot/${spot.id}`} key={spot.id}>
            <Stbox src={spot.images[0].url} alt={spot.name} />
            <StTitle>
              <span>{spot.view}</span>
              <h5>{spot.name}</h5>
              <StBorder></StBorder>
              <span>{index + 1} / 4</span>
            </StTitle>
          </Link>
        ))}
      </StSlider>
    </StyledSlider>
  );
};

const StSlider = styled(Slider)`
  width: 100%;
  height: 100%;
  .slick-slide {
    height: 300px;
    & div {
      height: 100%;
      & a {
        position: relative;
        height: 100%;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
  .silck-list {
    margin: 0 auto;
    overflow-x: hidden;
  }
  .slick-dots {
    margin-bottom: 40px;
    .slick-active {
      button::before {
        color: #ffffff;
      }
    }
    button::before {
      color: #a2a2a2;
    }
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 45px;
    opacity: 0.5;
  }

  .slick-prev,
  .slick-next {
    font-size: 0;
    position: absolute;
    bottom: 20px;
    color: #fff;
    border: 0;
    background: none;
    z-index: 1;
    top: 20px;
    cursor: pointer;
  }
  .slick-dots li button:before {
    color: unset;
    border: 1px solid #fff;
    opacity: 0.7;
    font-family: inherit;
    width: 8px;
    height: 8px;
    background: unset;
    border-radius: 8px;
    content: "";
  }
  .slick-dots li.slick-active button:before {
    opacity: 1;
    background: white;
  }
`;

const StyledSlider = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;
const Stbox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StTitle = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 100px;
  height: auto !important;
  color: #fff;

  & span {
    font-size: 13px;
  }
  & h5 {
    margin: 20px 0;
    font-size: 24px;
  }
  & span:last-child {
    padding-top: 20px;
    font-size: 12px;
  }
`;

const StBorder = styled.div`
  width: 16px;
  height: 1px !important;
  margin-bottom: 15px;
  background-color: #ddd;
`;
