import { configureStore } from "@reduxjs/toolkit";
import logSlice from "../modules/logSlice";
import authSlice from "../modules/authSlice";
import currentLocationSlice from "../modules/currentLocationSlice";
import spot from "../modules/spotSlice";
import spotData from "../modules/spotDataSlice";
import homeSlice from "../modules/homeSlice";

const store = configureStore({
  reducer: {
    logSlice,
    authSlice,
    currentLocation: currentLocationSlice,
    spot,
    spotData,
    homeSlice,
  },
});

export default store;
