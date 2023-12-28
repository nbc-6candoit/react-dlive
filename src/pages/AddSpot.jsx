// 차박명소 등록페이지(AddSpot)
import Tag from "components/common/Tag";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "shared/firebase";
import { v4 as uuid } from "uuid";
import { PiToilet } from "react-icons/pi";
import { PiShower } from "react-icons/pi";
import { AiOutlineShop } from "react-icons/ai";
import { PiSignpost } from "react-icons/pi";
import { PiDog } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Button from "components/common/Button";

const AddSpot = () => {
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [location, setLocation] = useState();
  const [sum, setSum] = useState("");
  const [thumnailImages, setThumnailImages] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);

  const fileRef = useRef(null);

  const handleChangeSpotName = (e) => {
    setName(e.target.value);
  };

  const handleChangeSpotLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleChangeSpotSum = (e) => {
    setSum(e.target.value);
  };

  window.google.maps.event.addDomListener(window, "load", () => {});

  const handleLocationSeacrchButton = async (e) => {
    e.preventDefault();

    // Google Maps API를 이용한 주소 검색
    const autoComplete = new window.google.maps.places.Autocomplete(
      document.getElementById("spot_location")
    );

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      if (!place.geomety) {
        console.error("위치를 찾을 수 없습니다.");
        return;
      }
      setLocation(place.formatted_address);

      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMapCenter(newCenter);
    });
  };

  const handleAddContent = (e) => {
    setContent(e.target.value);
  };

  const handleAddImageClick = () => {
    fileRef.current?.click();
  };

  const handleAddImages = (e) => {
    const files = e.target.files;
    // 최대 4개까지만 선택할 수 있도록 설정
    if (files.length > 4 || files.length + thumnailImages.length > 4) {
      alert("최대 파일 4개만 선택해주세요");
    } else {
      const filesArray = Array.from(files);
      const selectedFiles = filesArray.map((file) => URL.createObjectURL(file));
      setThumnailImages((prev) => prev.concat(selectedFiles));
    }
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();
    try {
      // 스토리지에 먼저 사진 업로드
      const imageUrls = [];
      for (const image of thumnailImages) {
        console.log("image는 무슨 주소", image);
        const imageRef = ref(storage, `log_images/${image}`);
        await uploadBytes(imageRef, image);

        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }

      // 차박로그 업로드
      const docRef = await addDoc(collection(db, "log"), {
        id: uuid(),
        name,
        content,
        images: imageUrls,
      });
      console.log("Document written with ID: ", docRef.id);

      setName("");
      setContent("");
      setThumnailImages("");
    } catch (error) {
      console.error("데이터 추가 에러", error.message);
    }
  };

  return (
    <>
      <StForm onSubmit={handleSubmmit}>
        <h2>차박명소 등록하기</h2>
        <StBox>
          <label htmlFor="spot_name">차박명소 이름*</label>
          <input
            type="text"
            id="spot_name"
            value={name}
            onChange={handleChangeSpotName}
          />
        </StBox>
        <StBox>
          <label htmlFor="spot_location">차박명소 주소*</label>
          <div>
            <input
              type="text"
              id="spot_location"
              value={location}
              onChange={handleChangeSpotLocation}
            />
            <button onClick={handleLocationSeacrchButton}>검색</button>
          </div>
          <StMapWrapper>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}>
              <GoogleMap center={mapCenter} zoom={3}></GoogleMap>
            </LoadScript>
          </StMapWrapper>
        </StBox>
        <StBox>
          <StInfoWrapper>
            <label>뷰</label>
            <StTag>
              <Tag tagName="마운틴뷰" />
              <Tag tagName="리버뷰" />
              <Tag tagName="오션뷰" />
              <Tag tagName="신설" />
            </StTag>
          </StInfoWrapper>
        </StBox>
        <StBox>
          <StInfoWrapper>
            <label>추천계절</label>
            <StTag>
              <Tag tagName="봄" />
              <Tag tagName="여름" />
              <Tag tagName="가을" />
              <Tag tagName="겨울" />
            </StTag>
          </StInfoWrapper>
        </StBox>
        <StInfoWrapper>
          <label>편의시설</label>
          <StIconContainer>
            <div>
              <StIconWrapper>
                <PiToilet />
                <p>화장실</p>
              </StIconWrapper>
            </div>
            <div>
              <StIconWrapper>
                <PiShower />
                <p>샤워실</p>
              </StIconWrapper>
            </div>
            <div>
              <StIconWrapper>
                <AiOutlineShop />
                <p>매점</p>
              </StIconWrapper>
            </div>
            <div>
              <StIconWrapper>
                <PiSignpost />
                <p>산책로</p>
              </StIconWrapper>
            </div>
            <div>
              <StIconWrapper>
                <PiDog />
                <p>반려동물</p>
              </StIconWrapper>
            </div>
          </StIconContainer>
        </StInfoWrapper>
        <StBox>
          <label htmlFor="spot_sum">차박명소 한줄소개*</label>
          <input
            type="text"
            id="spot_sum"
            value={sum}
            onChange={handleChangeSpotSum}
          />
        </StBox>
        <StBox>
          <label>차박명소 상세소개*</label>
          <StTextarea
            value={content}
            onChange={handleAddContent}
            placeholder="차박 명소를 소개해주세요!"
          />
        </StBox>
        <StBox>
          <label htmlFor="file">
            사진 <span>이미지를 선택해주세요 (최대 4개)</span>
          </label>
          <StImgWrap>
            <StImgSelect onClick={handleAddImageClick}>
              <FaPlus size={18} fill="#999" />
            </StImgSelect>
            {[...Array(4)].map((_, index) => (
              <StImgBox key={index}>
                {/* {thumnailImages[index] && (
                  <img
                    src={thumnailImages[index]}
                    alt={`image${index} 썸네일 이미지`}
                  />
                )} */}
              </StImgBox>
            ))}
          </StImgWrap>
          <input
            ref={fileRef}
            name="file"
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            multiple
            onChange={handleAddImages}
          />
        </StBox>

        <Button type="submit" text="차박명소 등록하기" />
        {/* <StButton type="submit">차박명소 등록하기</StButton> */}
      </StForm>
    </>
  );
};

export default AddSpot;

const StForm = styled.form`
  max-width: 530px;
  padding: 40px 20px;

  & h2 {
    margin-bottom: 30px;
  }
`;
const StBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  & label {
    & span {
      font-size: 12px;
      color: #999;
    }
  }
  & input {
    width: 100%;
    height: 48px;
    margin-top: 12px;
    padding: 20px;
    border-radius: 5px;
    background: #f1f1f1;
  }
  & input[type="file"] {
    display: none;
  }
  & div {
    display: flex;
    align-items: center;
  }
  & button {
    width: 80px;
    height: 48px;
    border-radius: 5px;
    margin-left: 10px;
    margin-top: 12px;
    background-color: lightgray;
  }
`;

const StMapWrapper = styled.div`
  width: 100%;
  height: 270px;
  margin-top: 30px;
  border-radius: 5px;
  background-color: lightgray;
`;

const StTextarea = styled.textarea`
  min-height: 200px;
  margin-top: 12px;
  padding: 20px;
  background: #f1f1f1;
  border-radius: 5px;
  white-space: pre-wrap;
  resize: none;
`;

const StImgWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
`;

const StImgSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  background: #f1f1f1;
  border-radius: 5px;
  cursor: pointer;
`;
const StImgBox = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 5px;
  background: #f1f1f1;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StInfoWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  & div {
    display: flex;
    gap: 0.5rem;
  }
`;

const StTag = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StIconContainer = styled.p`
  display: flex;
  gap: 1.5rem;
  & p {
    font-size: 13px;
  }
`;

const StIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  gap: 1px;
`;
