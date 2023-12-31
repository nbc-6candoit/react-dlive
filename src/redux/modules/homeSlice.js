import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coordinates: {
    latitude: 37.5666102,
    longitude: 126.9783881,
  },
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updateCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
});

export const { updateCoordinates } = homeSlice.actions;
export default homeSlice.reducer;
