import { configureStore } from "@reduxjs/toolkit";
import logs from "../modules/logsSlice";

const store = configureStore({
  reducer: { logs },
});

export default store;
