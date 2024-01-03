import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coordinates: {
    latitude: 37.5666102,
    longitude: 126.9783881,
    loading: false,
    error: null,
  },
};

// 리덕스 슬라이스 생성
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // 좌표 업데이트 액션
    updateCoordinates: (state, action) => {
      state.coordinates = action.payload;
      state.coordinates.loading = false;
      state.coordinates.error = null;
    },
    // 좌표 로딩 상태 업데이트 액션
    setCoordinatesLoading: (state) => {
      state.coordinates.loading = true;
    },
    // 좌표 에러 상태 업데이트 액션
    setCoordinatesError: (state, action) => {
      state.coordinates.error = action.payload;
      state.coordinates.loading = false;
    },
  },
});

// 액션 및 리듀서 내보내기
export const { updateCoordinates, setCoordinatesLoading, setCoordinatesError } =
  homeSlice.actions;
export default homeSlice.reducer;
