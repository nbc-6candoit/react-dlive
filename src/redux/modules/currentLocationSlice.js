import { createSlice } from "@reduxjs/toolkit";

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: { lat: 0, lng: 0 },
  reducers: {
    setCurrentLocation: (state, action) => {
      return { lat: action.payload.lat, lng: action.payload.lng };
    },
  },
});

export const { setCurrentLocation } = currentLocationSlice.actions;
export const selectCurrentLocation = (state) => state.currentLocation;

export default currentLocationSlice.reducer;
