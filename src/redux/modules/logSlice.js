import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snapshotLogs: [],
    targetLog: [],
};

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        addLog(state, action) {
            state.snapshotLogs.push(action.payload);
        },
        fetchLog(state, action) {
            state.targetLog = action.payload;
        },
        getQueryLogs(state, action) {
            state.snapshotLogs = action.payload;
        },
    },
});

export const { addLog, fetchLog, getQueryLogs } = logSlice.actions;
export default logSlice.reducer;
