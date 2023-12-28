import { configureStore } from "@reduxjs/toolkit";
import logs from "../modules/logsSlice";
import authSlice from "../modules/authSlice";

const store = configureStore({
  reducer: { logs, authSlice },
});

export default store;
