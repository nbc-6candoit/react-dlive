import { configureStore } from '@reduxjs/toolkit';
import logSlice from '../modules/logSlice';
import authSlice from '../modules/authSlice';
import currentLocationSlice from '../modules/currentLocationSlice';

const store = configureStore({
    reducer: { logSlice, authSlice, currentLocationSlice },
});

export default store;
