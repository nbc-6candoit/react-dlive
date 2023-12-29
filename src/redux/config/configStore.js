import { configureStore } from "@reduxjs/toolkit";
import logsSlice from "../modules/logsSlice";
import authSlice from "../modules/authSlice";
import currentLocationSlice from "../modules/currentLocationSlice";
import spot from "../modules/spotSlice";

const store = configureStore({
  reducer: {
    logsSlice,
    authSlice,
    currentLocation: currentLocationSlice,
    spot,
  },
});

export default store;
