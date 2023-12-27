import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logs: [],
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
  },
});

export const { addLog } = logsSlice.actions;
export default logsSlice.reducer;
