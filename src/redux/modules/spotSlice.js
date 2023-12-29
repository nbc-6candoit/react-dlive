import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  location: "",
  view: "",
  seasons: [],
  facilities: [],
  sum: "",
  content: "",
  images: [],
};

const spotSlice = createSlice({
  name: "spot",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setSeasons: (state, action) => {
      const tagName = action.payload;
      state.seasons = state.seasons.includes(tagName)
        ? state.seasons.filter((season) => season !== tagName)
        : [...state.seasons, tagName];
    },
    setFacilities: (state, action) => {
      console.log("페이로드 :", action.payload);
      const tagName = action.payload;
      state.facilities = state.facilities.includes(tagName)
        ? state.facilities.filter((facility) => facility !== tagName)
        : [...state.facilities, tagName];
      console.log("Updated facilities state:", state.facilities);
    },
    setSum: (state, action) => {
      state.sum = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const {
  setName,
  setLocation,
  setView,
  setSeasons,
  setFacilities,
  setSum,
  setContent,
  setImages,
} = spotSlice.actions;
export default spotSlice.reducer;
