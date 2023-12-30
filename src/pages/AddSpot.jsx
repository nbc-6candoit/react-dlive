// 차박명소 등록페이지(AddSpot)
import Tag from "components/common/Tag";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "components/common/Button";
import GeocoderMap from "components/naverMap/GeocoderMap";
import {
  setLocation,
  setView,
  setSeasons,
  setFacilities,
  setImages,
} from "../redux/modules/spotSlice";
import { __addSpot, addSpot } from "../redux/modules/spotDataSlice";

import { FaToilet } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { BsFillSignpost2Fill } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaSink } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useInput from "hooks/useInput";
import useClickedState from "hooks/useClickedState";
import Swal from "sweetalert2";

const AddSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { location, view, seasons, facilities, images } = useSelector(
    (state) => state.spot
  );

  const fileRef = useRef(null);
  const mapElement = useRef(null);

  // 커스텀훅 사용
  const [name, handleChangeSpotName] = useInput();
  const [sum, handleChangeSpotSum] = useInput();
  const [content, handleAddContent] = useInput();

  const [clickedView, toggleView] = useClickedState({
    마운틴뷰: false,
    리버뷰: false,
    오션뷰: false,
  });

  const [clickedSeasons, toggleSeasons] = useClickedState({
    봄: false,
    여름: false,
    가을: false,
    겨울: false,
  });

  const [clickedFacilities, toggleFacilities] = useClickedState({
    화장실: false,
    샤워실: false,
    싱크대: false,
    매점: false,
    산책로: false,
    반려동물: false,
  });

  const handleFacilityClick = (tagName) => {
    dispatch(setFacilities(tagName));
    toggleFacilities(tagName);
  };

  const handleTagClick = (tagName, category) => {
    switch (category) {
      case "view":
        dispatch(setView(tagName));
        toggleView(tagName, category);
        break;
      case "seasons":
        dispatch(setSeasons(tagName));
        toggleSeasons(tagName);
        break;
      default:
        break;
    }
  };

  const handleAddImageClick = () => {
    fileRef.current?.click();
  };

  const handleAddImages = (e) => {
    const files = e.target.files;
    // 최대 4개까지만 선택할 수 있도록 설정
    if (files.length > 4 || files.length + images.length > 4) {
      alert("최대 파일 4개만 선택해주세요");
    } else {
      const filesArray = Array.from(files);
      const selectedFiles = filesArray.map((file) => URL.createObjectURL(file));
      const updatedImages = images.concat(selectedFiles);
      dispatch(setImages(updatedImages));
    }
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();
    //  유효성 검사
    if (
      name !== "" &&
      location !== "" &&
      view !== "" &&
      sum !== "" &&
      content !== "" &&
      seasons.length > 0 &&
      facilities.length > 0
    ) {
      try {
        // 차박명소 업로드
        const newSpot = {
          name,
          location,
          view,
          seasons,
          facilities,
          sum,
          content,
          images,
        };
        dispatch(__addSpot(newSpot));
        dispatch(addSpot(newSpot));
        console.log("데이터추가 성공 :", newSpot);
        navigate("/spot");
      } catch (error) {
        console.error("데이터 추가 에러", error.message);
      }
    } else {
      Swal.fire({
        text: "모든 항목을 입력하세요",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#5eb470",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  console.log(name);
  console.log(location);
  console.log(view);
  console.log(seasons);
  console.log(facilities);
  console.log(sum);
  console.log(content);

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
            onKeyDown={handleKeyDown}
          />
        </StBox>
        <StBox>
          <label htmlFor="address">차박명소 주소*</label>
          <StMapWrapper id="map" ref={mapElement} />
          <GeocoderMap location={location} setLocation={setLocation} />
        </StBox>
        <StBox>
          <StInfoWrapper>
            <p>뷰</p>
            <StTag>
              <Tag
                tagName="마운틴뷰"
                category="view"
                onClick={(tagName, category) =>
                  handleTagClick(tagName, category)
                }
                clicked={clickedView["마운틴뷰"]}
              />
              <Tag
                tagName="리버뷰"
                category="view"
                onClick={(tagName, category) =>
                  handleTagClick(tagName, category)
                }
                clicked={clickedView["리버뷰"]}
              />
              <Tag
                tagName="오션뷰"
                category="view"
                onClick={(tagName, category) =>
                  handleTagClick(tagName, category)
                }
                clicked={clickedView["오션뷰"]}
              />
            </StTag>
          </StInfoWrapper>
        </StBox>
        <StBox>
          <StInfoWrapper>
            <p>추천계절</p>
            <StTag>
              <Tag
                tagName="봄"
                category="seasons"
                onClick={(tagName, category) =>
                  handleTagClick(tagName, category)
                }
                clicked={clickedSeasons["봄"]}
              />
              <Tag
                tagName="여름"
                category="seasons"
                onClick={(tagName, category) =>
                  handleTagClick(tagName, category)
                }
                clicked={clickedSeasons["여름"]}
              />
              <Tag
                tagName="가을"
                category="seasons"
                onClick={(tagName, category) =>
                  handleTagClick(tagName, category)
                }
                clicked={clickedSeasons["가을"]}
              />
              <Tag
                tagName="겨울"
                category="seasons"
                onClick={(tagName, category) =>
                  handleTagClick(tagName, category)
                }
                clicked={clickedSeasons["겨울"]}
              />
            </StTag>
          </StInfoWrapper>
        </StBox>
        <StInfoWrapper>
          <p>편의시설</p>
          <StIconContainer>
            <StIconWrapper
              clicked={clickedFacilities["화장실"]}
              onClick={() => handleFacilityClick("화장실")}
            >
              <FaToilet />
              <p>화장실</p>
            </StIconWrapper>

            <StIconWrapper
              clicked={clickedFacilities["샤워실"]}
              onClick={() => handleFacilityClick("샤워실")}
            >
              <FaShower />
              <p>샤워실</p>
            </StIconWrapper>

            <StIconWrapper
              clicked={clickedFacilities["싱크대"]}
              onClick={() => handleFacilityClick("싱크대")}
            >
              <FaSink />
              <p>싱크대</p>
            </StIconWrapper>

            <StIconWrapper
              clicked={clickedFacilities["매점"]}
              onClick={() => handleFacilityClick("매점")}
            >
              <AiFillShop />
              <p>매점</p>
            </StIconWrapper>
            <StIconWrapper
              clicked={clickedFacilities["산책로"]}
              onClick={() => handleFacilityClick("산책로")}
            >
              <BsFillSignpost2Fill />
              <p>산책로</p>
            </StIconWrapper>

            <StIconWrapper
              clicked={clickedFacilities["반려동물"]}
              onClick={() => handleFacilityClick("반려동물")}
            >
              <MdOutlinePets />
              <p>반려동물</p>
            </StIconWrapper>
          </StIconContainer>
        </StInfoWrapper>
        <StBox>
          <label htmlFor="spot_sum">차박명소 한줄소개*</label>
          <input
            type="text"
            id="spot_sum"
            value={sum}
            onChange={handleChangeSpotSum}
            onKeyDown={handleKeyDown}
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
                {images[index] && <img src={images[index]} alt="차박명소" />}
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
    width: 120px;
    height: 48px;
    border-radius: 5px;
    margin-left: 10px;
    margin-top: 12px;
    background-color: lightgray;
    cursor: pointer;
    transition: background 200ms;
    &:hover {
      color: #fff;
      background: #5eb470;
    }
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
`;

const StTag = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StIconContainer = styled.div`
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
  gap: 0.7rem;
  cursor: pointer;
  color: ${(props) =>
    props.clicked === true || props.clicked === "true" ? "#5eb470" : "#999"};
`;
