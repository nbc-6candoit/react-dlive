import { configureStore } from "@reduxjs/toolkit";
import logsSlice from "../modules/logsSlice";
import authSlice from "../modules/authSlice";
import currentLocationSlice from "../modules/currentLocationSlice";

const store = configureStore({
  reducer: { logsSlice, authSlice, currentLocationSlice },
});

export default store;
