import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../modules/authSlice';
import logSlice from '../modules/logSlice';

const store = configureStore({
    reducer: { logSlice, authSlice },
});

export default store;
