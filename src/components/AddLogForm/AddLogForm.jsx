import { ko } from 'date-fns/locale';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';
import { db, storage } from 'shared/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addLog } from '../../redux/modules/logSlice';
import { Controller, useForm } from 'react-hook-form';
import { TextField, createTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { setLocation } from '../../redux/modules/spotSlice';
import { __getSpots } from '../../redux/modules/spotDataSlice';

const AddLogForm = () => {
    const { handleSubmit, control, register, reset } = useForm({
        mode: 'onChange',
    });

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [thumbnailImages, setThumbnailImages] = useState([]);
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const { id } = useParams();
    const { location } = useSelector((state) => state.spot);
    const { spot } = useSelector((state) => state.spotData);
    const navigate = useNavigate();

    console.log(location);

    useEffect(() => {
        dispatch(__getSpots());
    }, [dispatch]);

    const selectedSpot = spot.find((spot) => spot.id === spotId);
    const selectedSpotName = selectedSpot ? selectedSpot.name : null;
    console.log(selectedSpotName);

    const handleImageClick = () => {
        fileRef.current?.click();
    };

    const handleAddImages = (files) => {
        if (files.length > 4 || files.length + thumbnailImages.length > 4) {
            alert('최대 파일 4개만 선택해주세요');
        } else {
            const filesArray = Array.from(files);
            const selectedFiles = filesArray.map((file) => URL.createObjectURL(file));
            setThumbnailImages([...thumbnailImages, ...selectedFiles]);
        }
    };

    const uploadImages = async (docID, images) => {
        const imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const imageID = `image_${i + 1}`;
            const imagePath = `log_images/${docID}/${imageID}`;
            const imageRef = ref(storage, imagePath);
            const file = await fetch(image).then((res) => res.blob());
            await uploadBytes(imageRef, file);
            const imageUrl = await getDownloadURL(imageRef);
            imageUrls.push({
                path: imagePath,
                url: imageUrl,
            });
        }
        return imageUrls;
    };

    const onSubmit = async (data) => {
        const docID = uuid();
        try {
            // 스토리지에 먼저 사진 업로드
            const imageUrls = await uploadImages(docID, thumbnailImages);

            const newLog = {
                id: uuid(),
                title: data.title,
                content: data.content,
                date: selectedDate.toISOString(),
                images: imageUrls,
                spotId,
                spotName: selectedSpotName,
            };

            // 모든 이미지가 업로드되면 로그 업로드
            const docRef = await addDoc(collection(db, 'log'), newLog);

            dispatch(
                addLog({
                    title: data.title,
                    content: data.content,
                    date: selectedDate.toISOString(), // Convert Date to string
                    images: imageUrls,
                    spotId,
                    spotName: selectedSpotName,
                })
            );

            reset();

            setThumbnailImages([]);
            setSelectedDate(today);
            navigate(`/spot/${spotId}`);

            // console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('데이터 추가 에러', error.message);
        }
    };

    const handleSpotLocationChange = (e) => {
        e.preventDefault();
        dispatch(setLocation(e.target.value));
    };

    return (
        <StForm onSubmit={handleSubmit(onSubmit)}>
            <h2>차박로그 등록하기</h2>
            <StBox>
                <label htmlFor='log_title'>차박로그 제목</label>

                <Controller
                    name='title'
                    control={control}
                    defaultValue={''}
                    rules={{ required: '차박로그 제목을 입력해주세요' }}
                    render={({ field, fieldState }) => (
                        <StyledTextField
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error !== undefined}
                            helperText={fieldState.error && fieldState.error.message}
                            InputLabelProps={{ shrink: false }}
                            InputProps={{
                                placeholder: '차박로그 제목을 입력해주세요',
                            }}
                        />
                    )}
                />
            </StBox>
            <StBox>
                <label>방문 일시</label>
                <StDate>
                    <Controller
                        name='date'
                        control={control}
                        defaultValue={today}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <StDatePicker
                                locale={ko}
                                dateFormat='yyyy년 MM월 dd일'
                                shouldCloseOnSelect
                                maxDate={today}
                                selected={field.value}
                                onChange={(date) => {
                                    field.onChange(date);
                                    setSelectedDate(date);
                                }}
                            />
                        )}
                    />
                </StDate>
            </StBox>
            <StBox>
                <label>차박로그 내용</label>

                <Controller
                    name='content'
                    control={control}
                    defaultValue={''}
                    rules={{ required: '차박로그 내용을 입력해주세요' }}
                    render={({ field, fieldState }) => (
                        <StyledTextAreaField
                            value={field.value}
                            multiline
                            onChange={field.onChange}
                            error={fieldState.error !== undefined}
                            helperText={fieldState.error && fieldState.error.message}
                            InputLabelProps={{ shrink: false }}
                            InputProps={{
                                placeholder: '차박로그 내용을 입력해주세요',
                            }}
                            maxHeight='200px'
                        />
                    )}
                />
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
                            {thumbnailImages[index] && (
                                <img src={thumbnailImages[index]} alt={`image${index} 썸네일 이미지`} />
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
                    onChange={(e) => handleAddImages(e.target.files)}
                />
            </StBox>
            <StBox>
                <label>차박 장소</label>
                <input
                    type='text'
                    //   {...register("location")}
                    value={selectedSpotName || ''}
                    onChange={handleSpotLocationChange}
                />
            </StBox>
            <StButton type='submit'>차박로그 등록하기</StButton>
        </StForm>
    );
};

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderColor: '#5eb470',

        maxHeight: '48px',
        marginTop: '12px',
        padding: '13px 20px',
        background: '#f1f1f1',
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        resize: 'none',
        alignItems: 'baseline',
    },
    '& input': {
        padding: '0 !important',
        height: 'unset !important',
        marginTop: 'unset !important',
    },
});

const StForm = styled.form`
    max-width: 620px;
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
        padding: 13px 20px;
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

const StyledTextAreaField = styled(TextField)({
    textarea: {
        height: '174px',
        maxHeight: '174px',
        overflowY: 'auto',
    },
    '& .MuiOutlinedInput-root': {
        borderColor: '#5eb470',
        height: '200px',
        maxHeight: '200px',
        marginTop: '12px',
        padding: '13px 20px',
        background: '#f1f1f1',
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        resize: 'none',
        alignItems: 'baseline',
    },
});

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
    width: 100px;
    height: 100px;
    background: #f1f1f1;
    border-radius: 5px;
    cursor: pointer;
`;
const StImgBox = styled.div`
    width: 100px;
    height: 100px;
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
