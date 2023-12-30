// 차박명소 등록페이지(AddSpot)
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
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
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import useInput from "hooks/useInput";
import useClickedState from "hooks/useClickedState";
import Swal from "sweetalert2";
import FacilitiesIcons from "components/addSpot/FacilitiesIcons";
import { FACILITIES_DATA, SEASONS, VIEWS } from "constants/spotOptions";
import TagSelection from "components/addSpot/TagSelection";
import useImageUploader from "hooks/useImageUploader";

const AddSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { location, view, seasons, facilities, images } = useSelector(
    (state) => state.spot
  );

  const { uploadImageURL } = useImageUploader();

  const fileRef = useRef(null);

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

      const selectedFiles = filesArray.map((file, index) => ({
        id: uuid(),
        url: URL.createObjectURL(file),
        key: `${uuid()}_${index}`,
      }));
      // const selectedFiles = filesArray.map((file) => URL.createObjectURL(file));
      // const updatedImages = images.concat(selectedFiles);
      console.log("업데이트이미지", selectedFiles);
      dispatch(setImages(selectedFiles));
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
        // 스토리지에 먼저 사진 업로드
        const docID = uuid();
        const imageUrls = await uploadImageURL(docID, images);

        if (imageUrls) {
          // 차박명소 업로드
          const newSpot = {
            id: docID,
            name,
            location,
            view,
            seasons,
            facilities,
            sum,
            content,
            images: imageUrls,
          };
          console.log("New Spot:", newSpot);
          dispatch(__addSpot(newSpot));
          dispatch(addSpot(newSpot));
          navigate("/");
        }
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
          <GeocoderMap location={location} setLocation={setLocation} />
        </StBox>
        <StBox>
          <StInfoWrapper>
            <p>뷰</p>
            <StTag>
              {VIEWS.map((view, index) => (
                <TagSelection
                  key={uuid()}
                  tagName={view}
                  category="view"
                  uid={uuid()}
                  onClick={(tagName, category) =>
                    handleTagClick(tagName, category)
                  }
                  clicked={clickedView[view]}
                />
              ))}
            </StTag>
          </StInfoWrapper>
        </StBox>
        <StBox>
          <StInfoWrapper>
            <p>추천계절</p>
            <StTag>
              {SEASONS.map((season, index) => (
                <TagSelection
                  key={index}
                  tagName={season}
                  category="seasons"
                  onClick={(tagName, category) =>
                    handleTagClick(tagName, category)
                  }
                  clicked={clickedSeasons[season]}
                  uid={uuid()}
                />
              ))}
            </StTag>
          </StInfoWrapper>
        </StBox>
        <StIconContainer>
          <p>편의시설</p>
          {FACILITIES_DATA.map(({ icon, label, index }) => (
            <FacilitiesIcons
              key={index}
              clicked={clickedFacilities[label]}
              onClick={() => handleFacilityClick(label)}
              icon={icon}
              label={label}
              uid={uuid()}
            />
          ))}
        </StIconContainer>
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
  max-width: 620px;
  padding: 40px;

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

const StIconContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  & p {
    font-size: 13px;
  }
`;

const StTag = styled.div`
  display: flex;
  gap: 0.5rem;
`;
