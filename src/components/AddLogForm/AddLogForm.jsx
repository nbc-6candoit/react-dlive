import { ko } from 'date-fns/locale';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';
import { db, storage } from 'shared/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

const AddLogForm = () => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [thumnailImages, setThumnailImages] = useState([]);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const fileRef = useRef(null);

    const handleImageClick = () => {
        fileRef.current?.click();
    };

    const handleAddImages = (e) => {
        const files = e.target.files;
        // 최대 4개까지만 선택할 수 있도록 설정
        if (files.length > 4 || files.length + thumnailImages.length > 4) {
            alert('최대 파일 4개만 선택해주세요');
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
                const docID = uuid();
                const imageID = `${image}`;
                const imagePath = `log_images/${docID}/${imageID}`;

                console.log('image는 무슨 주소', image);

                const imageRef = ref(storage, imagePath);

                await uploadBytes(imageRef, image);

                const imageUrl = await getDownloadURL(imageRef);

                // 이미지 경로와 URL을 배열에 추가
                imageUrls.push({
                    path: imagePath,
                    url: imageUrl,
                });
            }

            // 모든 이미지가 업로드되면 로그 업로드
            const docRef = await addDoc(collection(db, 'log'), {
                id: uuid(),
                title,
                content,
                date: selectedDate,
                images: imageUrls,
            });
            console.log('Document written with ID: ', docRef.id);

            // 데이터 업로드 이후 초기화
            setTitle('');
            setContent('');
            setThumnailImages([]);
            setSelectedDate(today);
        } catch (error) {
            console.error('데이터 추가 에러', error.message);
        }
    };

    return (
        <StForm onSubmit={handleSubmmit}>
            <h2>차박로그 등록하기</h2>
            <StBox>
                <label htmlFor='log_title'>차박로그 제목*</label>
                <input type='text' id='log_title' value={title} onChange={handleTitle} />
            </StBox>
            <StBox>
                <label>방문 일시*</label>
                <StDate>
                    <StDatePicker
                        locale={ko}
                        dateFormat='yyyy년 MM월 dd일' // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        maxDate={today} // 현재 날짜 이후의 날짜를 선택할 수 없도록 설정
                        selected={selectedDate}
                        onChange={setSelectedDate}
                    />
                </StDate>
            </StBox>
            <StBox>
                <label>차박로그 내용*</label>
                <StTextarea value={content} onChange={handleContent} placeholder='차박 장소를 소개해주세요!' />
            </StBox>
            <StBox>
                <label htmlFor='file'>
                    사진 <span>이미지를 선택해주세요 (최대 4개)</span>
                </label>
                <StImgWrap>
                    <StImgSelect onClick={handleImageClick}>
                        <FaPlus size={18} fill='#999' />
                    </StImgSelect>
                    {[...Array(4)].map((_, index) => (
                        <StImgBox key={index}>
                            {thumnailImages[index] && (
                                <img src={thumnailImages[index]} alt={`image${index} 썸네일 이미지`} />
                            )}
                        </StImgBox>
                    ))}
                </StImgWrap>
                <input
                    ref={fileRef}
                    name='file'
                    type='file'
                    accept='image/jpeg, image/jpg, image/png, image/webp'
                    multiple
                    onChange={handleAddImages}
                />
            </StBox>
            <StBox>
                <label>차박 장소*</label>
                <input type='text' placeholder='차박 장소 리스트 중에서 선택?' />
            </StBox>
            <StButton type='submit'>차박로그 등록하기</StButton>
        </StForm>
    );
};

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
        height: 48px;
        margin-top: 12px;
        padding: 20px;
        border-radius: 5px;
        background: #f1f1f1;
    }
    & input[type='file'] {
        display: none;
    }
`;
const StDate = styled.div`
    display: flex;
    gap: 10px;
`;
const StDatePicker = styled(DatePicker)`
    display: flex;
    align-items: center;
    height: 46px;
    text-align: center;
    background: #f1f1f1;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    &:active,
    &:focus {
        background-color: lightgray;
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

const StButton = styled.button`
    width: 100%;
    height: 48px;
    font-size: 16px;
    color: #5eb470;
    border-radius: 5px;
    border: 1px solid #5eb470;
    cursor: pointer;
    transition: background 200ms;
    &:hover {
        color: #fff;
        background: #5eb470;
    }
`;

export default AddLogForm;
