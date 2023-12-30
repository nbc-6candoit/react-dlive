import styled from "styled-components";
import Slider from "react-slick";
import { useEffect, useState } from "react";
// firestore의 메서드 import
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";

export const Slide = () => {
  const [slideimage, setSlideImage] = useState([]);
  const storage = getStorage();
  const id = uuidv4();

  const imageListRef = ref(
    storage,
    "gs://d-live-b6b1e.appspot.com/log_images/f4ebac4c-bbaa-4e6f-a83f-c7c6a85ea83b"
  );
  useEffect(() => {
    list(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setSlideImage((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const settings = {
    dots: false,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    focusOnSelect: true,
    pauseOnDotsHover: true,
  };

  return (
    <StyledSlider>
      <Slider {...settings}>
        {slideimage.map((url, index) => (
          <Stbox key={index} src={url} alt={`${index + 1}`} />
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
  width: 100%;
  height: 100%;
`;
const Stbox = styled.img`
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-right: 20px;
  width: 100%;
  height: 350px;
  border-radius: 40px;
`;
