import { ko } from 'date-fns/locale';
import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';

const AddLogForm = () => {
    const Today = new Date();
    const [selectedDate, setSelectedDate] = useState(Today);

    const fileRef = useRef(null);

    const handleImageClick = () => {
        fileRef.current?.click();
    };

    const handleImageChange = () => {};

    return (
        <StForm>
            <h2>차박로그 등록하기</h2>
            <StBox>
                <label htmlFor='log_title'>차박로그 제목*</label>
                <input type='text' id='log_title' />
            </StBox>
            <StBox>
                <label>방문 일시*</label>
                <StDate>
                    <StDatePicker
                        locale={ko}
                        dateFormat='yyyy년 MM월 dd일' // 날짜 형태
                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                        minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                        selected={selectedDate}
                        onChange={setSelectedDate}
                    />
                    <StDatePicker />
                </StDate>
            </StBox>
            <StBox>
                <label>차박로그 내용*</label>
                <StTextarea placeholder='차박 장소를 소개해주세요!' />
            </StBox>
            <StBox>
                <label htmlFor='file'>
                    사진 <span>이미지를 선택해주세요 (최대 4개)</span>
                </label>
                <StImgWrap>
                    <StImgSelect onClick={handleImageClick}>
                        <FaPlus size={18} fill='#999' />
                    </StImgSelect>
                    <StImgBox></StImgBox>
                    <StImgBox></StImgBox>
                    <StImgBox></StImgBox>
                    <StImgBox></StImgBox>
                </StImgWrap>
                <input
                    ref={fileRef}
                    name='file'
                    type='file'
                    accept='image/jpeg, image/jpg, image/png, image/webp'
                    multiple
                    onChange={handleImageChange}
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
    cursor: pointer;
`;
const StImgBox = styled.div`
    width: 90px;
    height: 90px;
    background: #f1f1f1;
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
